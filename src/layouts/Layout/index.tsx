import React, { ReactNode, useCallback, useState } from 'react';
import {
  Header,
  Content,
  HeaderContent,
  Logo,
  Container,
  HeaderSide,
  UserInfoBox,
} from './style';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/Button';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import StudyDeletePopup from './StudyDeletePopup';
import ProfileImage from 'components/ProfileImage';
import { ILoginUser } from 'types/db';

interface LayoutProps {
  children: ReactNode;
}

/**
 * 레이아웃 컴포넌트
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [showUserInfoBox, setShowUserInfoBox] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { data: loginUser } = useSWR<ILoginUser>('/users/me', fetcher);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <Logo src="/logo.svg" alt="logo" />
          </Link>
          <HeaderSide>
            {groupId ? (
              <Button
                onClick={() => {
                  setShowDeletePopup(true);
                }}
                yesButton
              >
                스터디 나가기
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate('/create');
                }}
                yesButton
              >
                스터디 생성
              </Button>
            )}
            <ProfileImage
              onClick={() => {
                setShowUserInfoBox(true);
              }}
              size={40}
              cursor="pointer"
              nickName={loginUser?.nickName}
              url={loginUser?.profileImageUrl}
            />
          </HeaderSide>
          {showUserInfoBox && (
            <UserInfoBox
              onClick={() => {
                setShowUserInfoBox(false);
              }}
            >
              <div>
                <div
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  마이페이지
                </div>
                <div onClick={logout}>로그아웃</div>
              </div>
            </UserInfoBox>
          )}
        </HeaderContent>
      </Header>
      <Content>{children}</Content>
      {groupId && (
        <StudyDeletePopup
          show={showDeletePopup}
          onClose={() => {
            setShowDeletePopup(false);
          }}
          groupId={parseInt(groupId)}
        />
      )}
    </Container>
  );
};

export default Layout;
