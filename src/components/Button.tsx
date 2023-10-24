import styled from '@emotion/styled';

export const Button = styled.button<{ yesButton?: boolean; width?: string }>`
  ${(props) => props.width && `width: ${props.width}`};
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  font-size: 0.875rem;
  align-items: center;
  border: none;
  border-radius: 0.1875rem;
  font-weight: ${(props) => (props.yesButton ? '700' : '500')};
  cursor: pointer;
  background-color: ${(props) =>
    props.yesButton ? 'var(--color-primary)' : 'var(--color-gray3)'};
  color: ${(props) => (props.yesButton ? 'white' : 'var(--color-gray1)')};
`;
