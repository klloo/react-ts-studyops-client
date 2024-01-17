import React, { useMemo, useState } from 'react';
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
  EditButton,
} from './style';
import dayjs from 'dayjs';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { calcDiffDays } from 'utils/schedule';
import { IStudy } from 'types/db';
import ProfileImage from 'components/ProfileImage';
import TodaySchedule from './TodaySchedule';
import StudyInfo from './StudyInfo';
import StudySchedule from './StudySchedule';
import AttendanceInfo from './AttendanceInfo';
import StudyMemberPopup from './StudyMemberPopup';
import SkeletonComponent from './SkeletonComponent';
import Board from './Board';

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
  const { data: studyInfo, error } = useSWR<IStudy>(
    `/info/${groupId}`,
    fetcher,
  );

  const [showMemberPopup, setShowMemberPopup] = useState(false);

  const isHost = useMemo(() => {
    if (!studyInfo) return false;
    return studyInfo.host;
  }, [studyInfo]);

  // 탭 정보 설정
  const tabs: Record<string, Tab> = {
    schedule: {
      label: '일정',
      component: <StudySchedule groupId={parseInt(groupId)} />,
    },
    attendance: {
      label: '출결',
      component: <AttendanceInfo groupId={parseInt(groupId)} isHost={isHost} />,
    },
    document: {
      label: '자료',
      component: <Board groupId={parseInt(groupId)} />,
    },
    info: {
      label: '정보',
      component: <StudyInfo groupId={parseInt(groupId)} isHost={isHost} />,
    },
  };
  const [curTab, setCurTab] = useState<Tab>(tabs.schedule);

  const navigate = useNavigate();

  if (error && error.response.status === 401) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container>
        {studyInfo === undefined ? (
          <SkeletonComponent />
        ) : (
          <div>
            <StudyOutlineDiv>
              <DdayTag>{calcDiffDays(studyInfo.startDate)}</DdayTag>
              <StudyTitle>{studyInfo.name}</StudyTitle>
              <MemberInfoDiv>
                <ProfileImage
                  size={40}
                  nickName={studyInfo.hostName}
                  url={studyInfo.hostProfileImageUrl}
                />
                <span
                  onClick={() => {
                    setShowMemberPopup(true);
                  }}
                >
                  <span>{studyInfo.hostName}</span>님 외{' '}
                  <span>{(studyInfo.members?.length || 1) - 1}명</span>
                </span>
              </MemberInfoDiv>
              <StartDateDiv>
                {dayjs(studyInfo.startDate).format('YYYY.MM.DD')}
              </StartDateDiv>
            </StudyOutlineDiv>
            <DescriptionDiv>
              {studyInfo.intro}
              {isHost && (
                <EditButton
                  onClick={() => {
                    navigate(`/update/${groupId}`);
                  }}
                >
                  정보 수정
                </EditButton>
              )}
            </DescriptionDiv>
          </div>
        )}
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
      <StudyMemberPopup
        show={showMemberPopup}
        onClose={() => {
          setShowMemberPopup(false);
        }}
        groupId={parseInt(groupId)}
        isHost={isHost}
      />
    </>
  );
}

export default StudyDetail;
