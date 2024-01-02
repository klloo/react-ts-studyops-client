import React from 'react';
import { ProfileWrapper, CostWrapper, Container, SettleButton } from './style';
import ProfileImage from 'components/ProfileImage';
import { costFormatter } from 'utils/formatter';

function BatchMemberItem({
  penaltyMember,
  cost,
  settle,
}: {
  penaltyMember: { name: string; url: string | null };
  cost: number;
  settle: () => void;
}) {
  return (
    <Container>
      <ProfileWrapper>
        <ProfileImage width="35" height="35" />
        <div>{penaltyMember.name}</div>
      </ProfileWrapper>
      <CostWrapper>
        {costFormatter(cost)} 원
        <SettleButton onClick={settle}>정산</SettleButton>
      </CostWrapper>
    </Container>
  );
}

export default BatchMemberItem;
