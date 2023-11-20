import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  max-width: 90%;
  border-radius: 0.1875rem;
  background: #fff;
  box-sizing: border-box;
  width: 30rem;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
  > div {
    color: var(--color-gray2);
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const ContentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > input {
    background-color: #fff;
    border: solid 1px var(--color-gray3);
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    &::placeholder {
      color: var(--color-gray2);
      font-size: 0.875rem;
    }
    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  > button {
    display: inline-flex;
    padding: 0.8rem 1.2rem;
    justify-content: center;
    font-size: 0.875rem;
    align-items: center;
    border: none;
    border-radius: 0.1875rem;
    font-weight: 500;
    cursor: pointer;
    background-color: var(--color-primary);
    color: #fff;
    align-self: end;
    margin-top: 1rem;
  }
`;
