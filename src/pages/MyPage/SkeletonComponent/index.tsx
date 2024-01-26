/* eslint-disable @typescript-eslint/no-unused-vars */
import ProfileImage from 'components/ProfileImage';
import {
  Container,
  TitleDiv,
  ContentDiv,
  UserProfileInfo,
  UserDetailInfo,
  RowWrapper,
  Layout,
} from './style';
import gravatar from 'gravatar';

function SkeletonComponent() {
  return (
    <Layout>
      <Container>
        <TitleDiv>내 정보</TitleDiv>
        <UserProfileInfo>
          <ProfileImage
            size={65}
            url={gravatar.url('default-profile', {
              s: `65px`,
              d: 'mm',
            })}
          />
          <RowWrapper />
        </UserProfileInfo>
        <ContentDiv>
          <UserDetailInfo>
            <div>
              <div /> <span />
            </div>
            <div>
              <div /> <span />
            </div>
            <div>
              <div /> <span />
            </div>
          </UserDetailInfo>
        </ContentDiv>
      </Container>
    </Layout>
  );
}

export default SkeletonComponent;
