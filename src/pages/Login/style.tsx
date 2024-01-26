import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  > div {
    gap: 3rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 90%;
    width: 24rem;
  }
`;

export const Logo = styled.img`
  height: 2.8rem;
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

export const LoginButton = styled.button`
  width: 100%;
  border: none;
  height: 3.375rem;
  color: #fff;
  text-align: center;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.1875rem;
  cursor: pointer;
`;

export const JoinButton = styled.div`
  color: #333;
  font-size: 0.8125rem;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  width: 100%;
  > span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const HrSection = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #bebebe;
  font-size: 0.8rem;
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: #bebebe;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin-left: 5px;
  }
  &::before {
    margin-right: 5px;
  }
`;

export const SnsButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  > div {
    color: var(--gray1, #333);
    font-size: 0.75rem;
    font-weight: 400;
  }
`;

export const KakaoButton = styled.button`
  background-color: #f7e600;
  color: #3a1d1d;
  border: none;
  width: 100%;
  height: 3.375rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.1875rem;
  font-weight: 500;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  color: var(--color-red);
  font-size: 0.875rem;
  position: absolute;
  bottom: -30px;
  left: 7px;
`;
