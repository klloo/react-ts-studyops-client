/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  StudyOutlineDiv,
  DdayTag,
  StudyTitle,
  MemberInfoDiv,
  DescriptionDiv,
} from './style';
import ProfileImage from 'components/ProfileImage';

/**
 * 스터디 상세 페이지
 */
function SkeletonComponent() {
  return (
    <div>
      <StudyOutlineDiv>
        <DdayTag />
        <StudyTitle />
        <MemberInfoDiv>
          <ProfileImage width="40" height="40" />
        </MemberInfoDiv>
      </StudyOutlineDiv>
      <DescriptionDiv />
    </div>
  );
}

export default SkeletonComponent;
