import styled from '@emotion/styled';

export const ProfileImageDiv = styled.div<{
  url?: string | null;
  height: string;
  width: string;
  cursor?: string;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: 50px;
  background-image: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) => props.cursor && `cursor:${props.cursor}`}
`;
