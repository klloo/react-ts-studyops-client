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

function SkeletonComponent() {
  return (
    <Layout>
      <Container>
        <TitleDiv>내 정보</TitleDiv>
        <UserProfileInfo>
          <ProfileImage size={65} />
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
