import styled from '@emotion/styled';

export const Container = styled.div<{
  width?: string;
}>`
  ${(props) => (props.width ? `width:${props.width};` : 'flex-grow: 1;')}
`;
