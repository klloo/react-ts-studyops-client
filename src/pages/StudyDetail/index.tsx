/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Container,
  StudyOutlineDiv,
  DdayTag,
  StudyTitle,
  MemberInfoDiv,
  DescriptionDiv,
  StartDateDiv,
} from './style';
import Layout from 'components/Layout';
import dayjs from 'dayjs';
import StudySchedule from './SutdySchedule';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { calcDiffDays } from 'utils/schedule';
import { IStudy } from 'types/db';
import ProfileImage from 'components/ProfileImage';
import TodaySchedule from './TodaySchedule';

/**
 * 탭 정보 타입
 */
interface Tab {
  label: string;
  component: React.ReactNode | null;
}

/**
 * 스터디 상세 페이지
 */
function StudyDetail() {
  const { groupId } = useParams();
  // 스터디 기본 정보
  const { data: studyInfo } = useSWR<IStudy>(`/info/${groupId}`, fetcher);

  // 탭 정보 설정
  const tabs: Record<string, Tab> = {
    info: { label: '정보', component: null },
    schedule: { label: '일정', component: <StudySchedule /> },
    attendance: { label: '출결', component: null },
    document: { label: '자료', component: null },
  };

  if (!studyInfo) {
    return null;
  }

  return (
    <Layout>
      <Container>
        <div>
          <StudyOutlineDiv>
            <DdayTag>{calcDiffDays(studyInfo.startDate)}</DdayTag>
            <StudyTitle>{studyInfo.name}</StudyTitle>
            <MemberInfoDiv>
              <ProfileImage
                url="https://static.solved.ac/misc/360x360/default_profile.png"
                width="40"
                height="40"
              />
              <span>
                <span>{studyInfo.hostName}</span>님 외{' '}
                <span>{(studyInfo.members?.length || 1) - 1}명</span>
              </span>
            </MemberInfoDiv>
            <StartDateDiv>
              {dayjs(studyInfo.startDate).format('YYYY.MM.DD')}
            </StartDateDiv>
          </StudyOutlineDiv>
          <DescriptionDiv>{studyInfo.intro}</DescriptionDiv>
        </div>
        <TodaySchedule />
      </Container>
    </Layout>
  );
}

export default StudyDetail;
