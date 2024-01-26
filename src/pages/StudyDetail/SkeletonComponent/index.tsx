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
import gravatar from 'gravatar';

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
          <ProfileImage
            size={40}
            url={gravatar.url('default-profile', {
              s: `65px`,
              d: 'mm',
            })}
          />
        </MemberInfoDiv>
      </StudyOutlineDiv>
      <DescriptionDiv />
    </div>
  );
}

export default SkeletonComponent;
