import React from 'react';
import { Content, Button } from './style';
import MainCard from 'components/MainCard';

/**
 * 스터디 초대 카드
 */
function InviteCard() {
  return (
    <MainCard>
      <Content>
        새로운 스터디를
        <br />
        직접 만들어보세요!
        <Button>생성하기</Button>
      </Content>
    </MainCard>
  );
}

export default InviteCard;
