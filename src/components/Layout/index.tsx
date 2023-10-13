import React, { ReactNode } from 'react';
import { Header, Content, HeaderContent, Logo } from './style';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/ProfileImage';

interface LayoutProps {
  children: ReactNode;
}

/**
 * 레이아웃 컴포넌트
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header>
        <HeaderContent>
          <Link to="/">
            <Logo src="/logo.svg" alt="logo" />
          </Link>
          <ProfileImage
            width="35"
            height="35"
            url="https://static.solved.ac/misc/360x360/default_profile.png"
          />
        </HeaderContent>
      </Header>
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
