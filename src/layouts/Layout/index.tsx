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
import { Link, useNavigate } from 'react-router-dom';
import ProfileImage from 'components/ProfileImage';
import { Button } from 'components/Button';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

interface LayoutProps {
  children: ReactNode;
}

/**
 * 레이아웃 컴포넌트
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [showUserInfoBox, setShowUserInfoBox] = useState(false);

  const { data: loginUser } = useSWR<{
    email: string;
    profileImageUrl: string | null;
  }>('/users/me', fetcher);

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
            <Button
              onClick={() => {
                navigate('/create');
              }}
              yesButton
            >
              스터디 생성
            </Button>
            <ProfileImage
              onClick={() => {
                setShowUserInfoBox(true);
              }}
              width="35"
              height="35"
              cursor="pointer"
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
    </Container>
  );
};

export default Layout;
