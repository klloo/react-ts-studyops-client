import styled from '@emotion/styled';

export const Button = styled.button<{
  yesButton?: boolean;
  width?: string;
  padding?: string;
}>`
  ${(props) => props.width && `width: ${props.width}`};
  display: inline-flex;
  padding: ${(props) => (props.padding ? props.padding : '0.5rem 1rem')};
  justify-content: center;
  font-size: 0.875rem;
  align-items: center;
  border: none;
  border-radius: 0.1875rem;
  font-weight: ${(props) => (props.yesButton ? '600' : '400')};
  cursor: pointer;
  background-color: ${(props) =>
    props.yesButton ? 'var(--color-primary)' : '#fff'};
  color: ${(props) => (props.yesButton ? 'white' : 'var(--color-gray1)')};
  ${(props) => !props.yesButton && 'border: 1px solid var(--color-gray3);'}
`;
