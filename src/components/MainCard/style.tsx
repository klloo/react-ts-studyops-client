import styled from '@emotion/styled';

export const Card = styled.div<{ clickable?: boolean }>`
  width: calc(25% - 1.5rem);
  padding: 2.3rem 1.6rem;
  border-radius: 0.625rem;
  box-sizing: border-box;
  border: 1px solid var(--gray2, #8c8c8c);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  cursor: ${(props) => (props.clickable ? 'pointer' : '')};
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  :hover {
    transform: ${(props) =>
      props.clickable ? 'scale3d(1.01, 1.01, 1.01)' : ''};
  }
`;
