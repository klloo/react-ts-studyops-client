import Modal from 'layouts/Modal';
import React, { useCallback, useState } from 'react';
import { Container, TitleDiv } from './style';
import {
  ErrorMsg,
  FormDiv,
  FormItemDescDiv,
  JoinButton,
} from 'pages/Join/style';
import FormItem from 'components/FormItem';
import useInput from 'hooks/useInput';
import useRequest from 'hooks/useRequest';
import { updatePassword } from 'api/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ChangePasswordPopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [oldPassword, onChangeOldPassword, setOldPassword] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [passwordRe, onChangePasswordRe, setPasswordRe] = useInput('');
  const [oldpwErrorMsg, setOldpwErrorMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const validate = useCallback(() => {
    let valid = true;
    console.log(oldPassword);
    if (!oldPassword.trim()) {
      valid = false;
      setOldpwErrorMsg('비밀번호를 입력해주세요.');
    } else setOldpwErrorMsg(null);
    if (!password.trim() || !passwordRe.trim()) {
      valid = false;
      setErrorMsg('비밀번호를 입력해주세요.');
    } else {
      const regexPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
      if (password.trim() !== passwordRe.trim()) {
        valid = false;
        setErrorMsg('비밀번호가 다릅니다.');
      } else if (!regexPw.test(password.trim())) {
        valid = false;
        setErrorMsg('영문, 숫자를 포함한 8~20자의 비밀번호를 입력해주세요.');
      } else {
        setErrorMsg(null);
      }
    }
    return valid;
  }, [oldPassword, password, passwordRe]);

  const requestUpdatePassword = useRequest<boolean>(updatePassword);
  const onClickConfirmButton = useCallback(() => {
    if (!validate()) return;
    const passwordInfo = { oldPassword, newPassword: password };
    requestUpdatePassword(passwordInfo)
      .then(() => {
        toast.success('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        navigate('/login');
      })
      .catch((e) => {
        if (e.status === 400) {
          setOldpwErrorMsg('기존 비밀번호가 일치하지 않습니다.');
        } else {
          setOldpwErrorMsg(null);
        }
      });
  }, [oldPassword, password, passwordRe]);

  const closeModal = useCallback(() => {
    setOldPassword('');
    setPassword('');
    setPasswordRe('');
    setOldpwErrorMsg(null);
    setErrorMsg(null);
    onClose();
  }, []);

  return (
    <Modal show={show} onCloseModal={closeModal}>
      <Container>
        <TitleDiv>
          비밀번호 변경 <div onClick={closeModal}>&times;</div>
        </TitleDiv>
        <FormDiv>
          <FormItem flexDirection="column" error={oldpwErrorMsg !== null}>
            <label>기존 비밀번호</label>
            <input
              placeholder="비밀번호"
              type="password"
              value={oldPassword}
              onChange={onChangeOldPassword}
            />
            {oldpwErrorMsg && <ErrorMsg>{oldpwErrorMsg}</ErrorMsg>}
          </FormItem>
          <FormItem flexDirection="column" error={errorMsg !== null}>
            <label>새로운 비밀번호</label>
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
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </FormItem>
        </FormDiv>
        <JoinButton onClick={onClickConfirmButton}>비밀번호 변경</JoinButton>
      </Container>
    </Modal>
  );
}

export default ChangePasswordPopup;
