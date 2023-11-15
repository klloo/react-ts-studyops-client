/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  StudyOutlineDiv,
  DdayTag,
  StudyTitle,
  MemberInfoDiv,
  DescriptionDiv,
  StartDateDiv,
  TabWrapper,
  TabDiv,
  TabContentWrapper,
} from './style';
import Layout from 'components/Layout';
import dayjs from 'dayjs';
import { Navigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { calcDiffDays } from 'utils/schedule';
import { IStudy } from 'types/db';
import ProfileImage from 'components/ProfileImage';
import TodaySchedule from './TodaySchedule';
import StudyInfo from './StudyInfo';
import StudySchedule from './SutdySchedule';

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
  if (!groupId) {
    return <Navigate to="/" />;
  }
  const { data: studyInfo } = useSWR<IStudy>(`/info/${groupId}`, fetcher);

  // 탭 정보 설정
  const tabs: Record<string, Tab> = {
    schedule: {
      label: '일정',
      component: <StudySchedule groupId={parseInt(groupId)} />,
    },
    attendance: { label: '출결', component: null },
    document: { label: '자료', component: null },
    info: {
      label: '정보',
      component: <StudyInfo groupId={parseInt(groupId)} />,
    },
  };
  const [curTab, setCurTab] = useState<Tab>(tabs.schedule);

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
        <TodaySchedule groupId={parseInt(groupId)} />
        <TabWrapper>
          {Object.keys(tabs).map((key) => (
            <TabDiv
              key={key}
              onClick={() => {
                setCurTab(tabs[key]);
              }}
              selected={curTab.label === tabs[key].label}
            >
              {tabs[key].label}
            </TabDiv>
          ))}
        </TabWrapper>
        <TabContentWrapper>{curTab.component}</TabContentWrapper>
      </Container>
    </Layout>
  );
}

export default StudyDetail;
