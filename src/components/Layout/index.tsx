import React, { ReactNode } from 'react';
import { Header, Content, HeaderContent, Logo, Profile } from './style';

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
          <Logo src="/logo.svg" alt="logo" />
          <Profile />
        </HeaderContent>
      </Header>
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
