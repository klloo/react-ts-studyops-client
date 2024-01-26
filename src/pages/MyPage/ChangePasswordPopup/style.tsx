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
  gap: 3rem;
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
