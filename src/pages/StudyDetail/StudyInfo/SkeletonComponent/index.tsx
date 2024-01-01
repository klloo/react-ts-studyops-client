import React from 'react';
import { Container, ContentDiv, ContentTitle } from './style';
import { IoMenuOutline } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';
import { MdCreditCard } from 'react-icons/md';

function StudyInfo() {
  return (
    <Container>
      <div>
        <ContentTitle>
          <span>
            <IoMenuOutline size="22" />
          </span>
          스터디 규칙
        </ContentTitle>
        <ContentDiv>
          <div />
          <div />
          <div />
          <div />
          <div />
        </ContentDiv>
      </div>
      <div>
        <ContentTitle>
          <span>
            <FaRegClock size="18" />
          </span>
          스터디 시간
        </ContentTitle>
        <ContentDiv>
          <div />
          <div />
          <div />
        </ContentDiv>
      </div>
      <div>
        <ContentTitle>
          <span>
            <MdCreditCard size="20" />
          </span>
          벌금 정책
        </ContentTitle>
        <ContentDiv>
          <div />
          <div />
        </ContentDiv>
      </div>
    </Container>
  );
}

export default StudyInfo;
