import styled from '@emotion/styled';
import theme from 'styles/theme';

const FormItem = styled.div<{
  emptyLabel?: boolean;
  error?: boolean;
  textareaHeight?: string;
  flexDirection?: string;
}>`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  position: relative;
  ${(props) => props.flexDirection && `flex-direction:${props.flexDirection};`}
  @media ${theme.device.tablet}, ${theme.device.phone} {
    flex-direction: column;
  }
  > label {
    width: 8rem;
    color: var(--color-gray1);
    font-size: 0.875rem;
    font-weight: 700;
    padding: 0.87rem 0;
    text-align: start;
    @media ${theme.device.tablet}, ${theme.device.phone} {
      ${(props) => props.emptyLabel && 'display:none;'}
    }
  }
  & input {
    flex-grow: 1;
    background-color: #fff;
    border: solid 1px
      ${(props) => (props.error ? 'var(--color-red)' : 'var(--color-gray3)')};
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    &::placeholder {
      color: var(--color-gray2);
      font-size: 0.875rem;
    }
  }
  > textarea {
    flex-grow: 1;
    background-color: #fff;
    border: solid 1px
      ${(props) => (props.error ? '#f33535' : 'var(--color-gray3)')};
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    &::placeholder {
      color: var(--color-gray2);
      font-size: 0.875rem;
    }
    resize: none;
    min-height: ${(props) =>
      props.textareaHeight && `${props.textareaHeight}rem`};
  }
`;

export default FormItem;
