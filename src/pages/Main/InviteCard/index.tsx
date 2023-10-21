import React from 'react';
import { Content, PlusButton } from './style';
import MainCard from 'components/MainCard';

/**
 * 스터디 초대 카드
 */
function InviteCard() {
  return (
    <MainCard clickable={false}>
      <Content>
        새로운 스터디를
        <br />
        추가해보세요!
        <PlusButton size="60" />
      </Content>
    </MainCard>
  );
}

export default InviteCard;
