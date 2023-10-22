import React, { ReactNode } from 'react';
import {
  Header,
  Content,
  HeaderContent,
  Logo,
  Container,
  HeaderSide,
} from './style';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/ProfileImage';
import { Button } from 'components/Button';

interface LayoutProps {
  children: ReactNode;
}

/**
 * 레이아웃 컴포넌트
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <Logo src="/logo.svg" alt="logo" />
          </Link>
          <HeaderSide>
            <Button yesButton>스터디 생성</Button>
            <ProfileImage
              width="35"
              height="35"
              url="https://static.solved.ac/misc/360x360/default_profile.png"
            />
          </HeaderSide>
        </HeaderContent>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
