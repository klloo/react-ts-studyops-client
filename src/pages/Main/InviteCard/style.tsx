import styled from '@emotion/styled';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  position: relative;
  font-size: 1.1rem;
  text-align: center;
  font-weight: bold;
`;

export const Button = styled.button`
  width: 50%;
  padding: 10px 0 10px 0;
  border: none;
  border-radius: 7px;
  font-weight: bold;
  color: white;
  background-color: var(--color-primary);
  cursor: pointer;
`;
