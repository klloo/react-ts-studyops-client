import styled from '@emotion/styled';

export const Card = styled.div`
  width: 25%;
  height: 350px;
  /* border: 1px solid var(--color-border); */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  position: relative;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
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
