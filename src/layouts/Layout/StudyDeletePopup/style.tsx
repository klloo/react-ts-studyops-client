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
  width: 25rem;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 70vh;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1.15rem;
  font-weight: 500;
  > div {
    color: var(--color-gray2);
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const ContentDiv = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1.2;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  > div {
    flex-grow: 1;
  }
`;
