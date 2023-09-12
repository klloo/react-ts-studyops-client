import styled from '@emotion/styled';

export const Card = styled.div<{ isInvite?: boolean }>`
  width: calc(27%);
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  cursor: ${(props) => (props.isInvite ? '' : 'pointer')};
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  :hover {
    transform: ${(props) =>
      props.isInvite ? '' : 'scale3d(1.01, 1.01, 1.01)'};
    box-shadow: ${(props) =>
      props.isInvite ? '' : '2px 4px 16px rgba(0, 0, 0, 0.16);'};
  }
`;
