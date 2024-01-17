import React, { useEffect, useState } from 'react';

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
  const [checked, setChecked] = useState(penaltyMember.isSettled);
  useEffect(() => {
    setChecked(penaltyMember.isSettled);
  }, [penaltyMember]);

  return (
    <Container>
      <ProfileWrapper>
        <ProfileImage
          size={40}
          nickName={penaltyMember.nickName}
          url={penaltyMember.profileImageUrl}
        />
        <div>{penaltyMember.nickName}</div>
        <span>{info}</span>
      </ProfileWrapper>
      {!noPenalty && (
        <CostWrapper>
          {costFormatter(cost)} 원
          {isHost ? (
            <>
              <CustomSwitch
                checked={checked}
                onChange={() => {
                  settle();
                  setChecked((prev) => !prev);
                }}
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
