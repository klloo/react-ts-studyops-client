import React from 'react';

import {
  ProfileWrapper,
  CostWrapper,
  Container,
  CheckedIcon,
  UnCheckedIcon,
  ExemptButton,
} from './style';
import ProfileImage from 'components/ProfileImage';
import { costFormatter } from 'utils/formatter';
import CustomSwitch from 'components/CustomSwitch';
import { IPenaltyMemberInfo } from 'types/db';

function MemberItem({
  isHost = true,
  penaltyMember,
  cost,
  info,
  noPenalty = false,
  settle,
  exempt,
}: {
  isHost?: boolean;
  penaltyMember: IPenaltyMemberInfo | Omit<IPenaltyMemberInfo, 'lateTime'>;
  cost: number;
  info: string;
  noPenalty?: boolean;
  settle: () => void;
  exempt?: () => void;
}) {
  return (
    <Container>
      <ProfileWrapper>
        <ProfileImage
          url="https://static.solved.ac/misc/360x360/default_profile.png"
          width="35"
          height="35"
        />
        <div>{penaltyMember.name}</div>
        <span>{info}</span>
      </ProfileWrapper>
      {!noPenalty && (
        <CostWrapper>
          {costFormatter(cost)} 원
          {isHost ? (
            <>
              <CustomSwitch
                checked={penaltyMember.isSettled}
                onChange={settle}
              />
              {exempt && <ExemptButton onClick={exempt}>면제</ExemptButton>}
            </>
          ) : penaltyMember.isSettled ? (
            <CheckedIcon size="18" />
          ) : (
            <UnCheckedIcon size="18" />
          )}
        </CostWrapper>
      )}
    </Container>
  );
}

export default MemberItem;
