import React from 'react';
import useSWR from 'swr';
import { IStudy } from 'types/db';
import fetcher from 'utils/fetcher';
import { Container, ContentDiv } from './style';
import { costFormatter } from 'utils/formatter';
import { IoMenuOutline } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';
import { MdCreditCard } from 'react-icons/md';
import { ContentTitle } from '../style';
import SkeletonComponent from './SkeletonComponent';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StudyInfo({ groupId, isHost }: { groupId: number; isHost: boolean }) {
  // 스터디 기본 정보
  const { data: studyInfo } = useSWR<IStudy>(`/info/${groupId}`, fetcher);
  if (studyInfo === undefined) {
    return <SkeletonComponent />;
  }
  return (
    <Container>
      <div>
        <ContentTitle>
          <span>
            <IoMenuOutline size="22" />
          </span>
          스터디 규칙
        </ContentTitle>
        <ContentDiv>{studyInfo.rule}</ContentDiv>
      </div>
      <div>
        <ContentTitle>
          <span>
            <FaRegClock size="18" />
          </span>
          스터디 시간
        </ContentTitle>
        <ContentDiv>
          {studyInfo.schedules.map((sch) => (
            <div key={sch.dayWeek}>
              {sch.dayWeek}&nbsp;&nbsp;&nbsp;
              {sch.startTime} ~ {sch.finishTime}
            </div>
          ))}
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
          {studyInfo.lateCost === 0 ? (
            <div>지각 벌금 없음</div>
          ) : (
            <div>
              <span>{studyInfo.allowedTime}분 </span>
              지각부터 {costFormatter(studyInfo.lateCost)}원
            </div>
          )}
          {studyInfo.absenceCost === 0 ? (
            <div>결석 벌금 없음</div>
          ) : (
            <div>
              <span>결석 시 {costFormatter(studyInfo.absenceCost)}원</span>
            </div>
          )}
        </ContentDiv>
      </div>
    </Container>
  );
}

export default StudyInfo;
