import React, { ReactNode } from 'react';
import { Header, Content } from './style';

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
        <div>StudyOps</div>
        <div>Profile</div>
      </Header>
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
