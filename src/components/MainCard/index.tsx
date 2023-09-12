import React, { ReactNode } from 'react';
import { Card } from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 메인화면 카드 컴포넌트
 */
function MainCard({
  isInvite,
  link,
  children,
}: {
  isInvite?: boolean;
  link?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        if (link) navigate(link);
      }}
      isInvite={isInvite}
    >
      {children}
    </Card>
  );
}

export default MainCard;
