import styled from '@emotion/styled';
import gravatar from 'gravatar';

const defaultUrl = (width: string) =>
  gravatar.url('default-profile', {
    s: `${width}px`,
    d: 'mm',
  });

const ProfileImage = styled.div<{
  url?: string | null;
  height: string;
  width: string;
  cursor?: string;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: 50px;
  background-image: url(${(props) =>
    props.url ? props.url : defaultUrl(props.width)});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) => props.cursor && `cursor:${props.cursor}`}
`;

export default ProfileImage;
