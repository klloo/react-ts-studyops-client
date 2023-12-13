import React, { useCallback, useState } from 'react';
import {
  Container,
  Logo,
  FormDiv,
  LoginButton,
  ButtonWrapper,
  JoinButton,
  HrSection,
  SnsButtonWrapper,
  KakaoButton,
  ErrorMsg,
} from './style';
import FormItem from 'components/FormItem';
import useInput from 'hooks/useInput';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const tmpPw = '1234';

  const onClickLoginButton = useCallback(() => {
    if (!id.trim()) {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }
    setErrorMsg(null);
    // 로그인 성공
    if (tmpPw === password) {
      navigate('/');
      setErrorMsg(null);
    } else {
      // 로그인 실패
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [id, password]);

  return (
    <Container>
      <div>
        <Logo src="/logo.svg" alt="logo" />
        <FormDiv>
          <FormItem>
            <input placeholder="아이디" value={id} onChange={onChangeId} />
          </FormItem>
          <FormItem>
            <input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </FormItem>
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </FormDiv>
        <ButtonWrapper>
          <LoginButton onClick={onClickLoginButton}>로그인</LoginButton>
          <JoinButton>
            <div>아직 회원이 아니신가요?</div>{' '}
            <span
              onClick={() => {
                navigate('/join');
              }}
            >
              회원가입
            </span>
          </JoinButton>
        </ButtonWrapper>
        <HrSection>또는</HrSection>
        <SnsButtonWrapper>
          <div>SNS계정으로 간편하게 시작하기</div>
          <KakaoButton>
            <RiKakaoTalkFill size="21" />
            카카오로 시작하기
          </KakaoButton>
        </SnsButtonWrapper>
      </div>
    </Container>
  );
}

export default Login;
