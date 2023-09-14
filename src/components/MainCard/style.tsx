import styled from '@emotion/styled';

export const Card = styled.div<{ clickable?: boolean }>`
  width: calc(27%);
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  cursor: ${(props) => (props.clickable ? 'pointer' : '')};
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  :hover {
    transform: ${(props) =>
      props.clickable ? 'scale3d(1.01, 1.01, 1.01)' : ''};
    box-shadow: ${(props) =>
      props.clickable ? '2px 4px 16px rgba(0, 0, 0, 0.16)' : ''};
  }
`;
