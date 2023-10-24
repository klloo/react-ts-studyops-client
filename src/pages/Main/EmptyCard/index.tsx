import React from 'react';
import { Content } from './style';
import MainCard from 'components/MainCard';

/**
 * 비어있는 카드
 */
function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <MainCard clickable={false}>
      <Content>{children}</Content>
    </MainCard>
  );
}

export default EmptyCard;
