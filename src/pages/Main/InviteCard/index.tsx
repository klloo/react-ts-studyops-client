import React from 'react';
import { Card, Button } from './style';

/**
 * 스터디 초대 카드
 */
function InviteCard() {
  return (
    <Card>
      새로운 스터디를
      <br />
      직접 만들어보세요!
      <Button>생성하기</Button>
    </Card>
  );
}

export default InviteCard;
