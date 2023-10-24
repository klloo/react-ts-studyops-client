import styled from '@emotion/styled';

export const Card = styled.div<{ clickable?: boolean }>`
  width: calc(25% - 1.5rem);
  padding: 2.3rem 1.6rem;
  border-radius: 0.625rem;
  box-sizing: border-box;
  border: 1px solid var(--color-gray2);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  cursor: ${(props) => (props.clickable ? 'pointer' : '')};
  :hover {
    transform: ${(props) =>
      props.clickable ? 'scale3d(1.01, 1.01, 1.01)' : ''};
  }
  @media (min-width: 800px) and (max-width: 1100px) {
    width: calc(33% - 1.5rem);
  }
  @media (min-width: 540px) and (max-width: 800px) {
    width: calc(50% - 1.5rem);
  }
  @media (max-width: 540px) {
    width: calc(100%);
  }
`;
