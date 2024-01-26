import React, { useCallback, useState } from 'react';
import {
  Container,
  TitleDiv,
  FormDiv,
  JoinButton,
  FormItemDescDiv,
  ErrorMsg,
} from './style';
import FormItem from 'components/FormItem';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';
import useRequest from 'hooks/useRequest';
import { signup } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import BackIcon from 'components/BackIcon';

function Join() {
  const [id, onChangeId] = useInput('');
  const [nickName, onChangeNickName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordRe, onChangePasswordRe] = useInput('');
  const [idErrorMsg, setIdErrorMsg] = useState<string | null>(null);
  const [nickNameErrorMsg, setNickNameErrorMsg] = useState<string | null>(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const validate = useCallback(() => {
    let valid = true;
    if (!id.trim()) {
      valid = false;
      setIdErrorMsg('이메일을 입력해주세요.');
    } else {
      const regexEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!regexEmail.test(id.trim())) {
        valid = false;
        setIdErrorMsg('유효하지 않은 이메일 형식 입니다.');
      } else {
        setIdErrorMsg(null);
      }
    }
    if (!nickName.trim()) {
      valid = false;
      setNickNameErrorMsg('닉네임을 입력해주세요.');
    } else {
      const nicknamePw = /^user/;
      if (nicknamePw.test(nickName.trim())) {
        valid = false;
        setNickNameErrorMsg('사용할 수 없는 닉네임입니다.');
      } else {
        setNickNameErrorMsg(null);
      }
    }
    if (!password.trim() || !passwordRe.trim()) {
      valid = false;
      setPasswordErrorMsg('비밀번호를 입력해주세요.');
    } else {
      const regexPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
      if (password.trim() !== passwordRe.trim()) {
        valid = false;
        setPasswordErrorMsg('비밀번호가 다릅니다.');
      } else if (!regexPw.test(password.trim())) {
        valid = false;
        setPasswordErrorMsg(
          '영문, 숫자를 포함한 8~20자의 비밀번호를 입력해주세요.',
        );
      } else {
        setPasswordErrorMsg(null);
      }
    }
    return valid;
  }, [id, password, passwordRe, nickName]);

  const requestJoin = useRequest(signup);
  const onClickJoinButton = useCallback(() => {
    if (!validate()) return;
    const userInfo = {
      email: id,
      password,
      nickName,
    };
    requestJoin(userInfo)
      .then(() => {
        toast.success('회원가입에 성공하였습니다.');
        navigate('/login');
      })
      .catch((e) => {
        if (e.status === 409) {
          setNickNameErrorMsg(e.message);
        } else if (e.status === 400) {
          setIdErrorMsg(e.message);
        } else {
          setNickNameErrorMsg(null);
          setIdErrorMsg(null);
          toast.error('회원가입에 실패하였습니다.');
        }
      });
  }, [id, password, passwordRe, nickName]);

  return (
    <Container>
      <BackIcon />
      <TitleDiv>회원가입</TitleDiv>
      <FormDiv>
        <FormItem flexDirection="column" error={idErrorMsg !== null}>
          <label>이메일</label>
          <input
            placeholder="이메일을 입력해주세요"
            value={id}
            onChange={onChangeId}
          />
          {idErrorMsg && <ErrorMsg>{idErrorMsg}</ErrorMsg>}
        </FormItem>
        <FormItem flexDirection="column" error={nickNameErrorMsg !== null}>
          <label>닉네임</label>
          <FormItemDescDiv>
            다른 유저와 겹치지 않도록 입력해주세요.
          </FormItemDescDiv>
          <input
            placeholder="닉네임"
            value={nickName}
            onChange={onChangeNickName}
          />
          {nickNameErrorMsg && <ErrorMsg>{nickNameErrorMsg}</ErrorMsg>}
        </FormItem>
        <FormItem flexDirection="column" error={passwordErrorMsg !== null}>
          <label>비밀번호</label>
          <FormItemDescDiv>
            영문, 숫자를 포함한 8~20자의 비밀번호를 입력해주세요
          </FormItemDescDiv>
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <input
            placeholder="비밀번호 재입력"
            type="password"
            value={passwordRe}
            onChange={onChangePasswordRe}
          />
          {passwordErrorMsg && <ErrorMsg>{passwordErrorMsg}</ErrorMsg>}
        </FormItem>
      </FormDiv>
      <JoinButton onClick={onClickJoinButton}>회원가입</JoinButton>
    </Container>
  );
}

export default Join;
