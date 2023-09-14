import React, { ReactNode } from 'react';
import { Card } from './style';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

/**
 * 메인화면 카드 컴포넌트
 */
function MainCard({
  clickable,
  link,
  children,
}: {
  clickable?: boolean;
  link?: string | null;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        if (link && !isEmpty(link)) navigate(link);
      }}
      clickable={clickable}
    >
      {children}
    </Card>
  );
}

export default MainCard;
