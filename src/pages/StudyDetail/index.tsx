import React, { useCallback, useRef, useState, MutableRefObject } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Title,
  StudySummary,
  Tag,
  ProfileWrapper,
  Profile,
  ExitButton,
  AddUserButton,
  AttendanceCard,
  AttendanceButton,
  StudyDetailContainer,
  Tab,
  TabWrapper,
  TabContent,
  BoldText,
} from './style';
import Layout from 'components/Layout';
import dayjs from 'dayjs';
import { AiOutlinePlus } from 'react-icons/ai';
import StudySchedule from './SutdySchedule';
import { getDay } from 'utils/schedule';
import ProfileImage from 'components/ProfileImage';

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
  // const { groupId } = useParams();
  const today = dayjs();
  // 탭 정보 설정
  const tabs: Record<string, Tab> = {
    info: { label: '정보', component: null },
    schedule: { label: '일정', component: <StudySchedule /> },
    attendance: { label: '출결', component: null },
    document: { label: '자료', component: null },
  };
  const [currentTab, setCurrentTab] = useState(tabs.info);
  // 탭 클릭시 탭 내용 요소로 스크롤 이동하도록 설정
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const onClickTabButton = useCallback((tab: React.SetStateAction<Tab>) => {
    setCurrentTab(tab);
    // contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Layout>
      <StudySummary>
        <Title>
          <div>알고리즘 스터디</div>
          <ExitButton>스터디 나가기</ExitButton>
        </Title>
        <Tag>
          2023.08.23 <span>D+12</span>
        </Tag>
        <div>
          알고리즘 실력 향상을 위한 스터디 입니다. 하루에 한 문제씩 풀도록
          합시다.
        </div>
        <ProfileWrapper>
          <Profile>
            <ProfileImage
              width="48"
              height="48"
              url="https://static.solved.ac/misc/360x360/default_profile.png"
            />
            <div>이찬희</div>
          </Profile>
          <Profile>
            <ProfileImage
              width="48"
              height="48"
              url="https://static.solved.ac/misc/360x360/default_profile.png"
            />
            <div>이찬희</div>
          </Profile>
          <Profile>
            <ProfileImage
              width="48"
              height="48"
              url="https://static.solved.ac/misc/360x360/default_profile.png"
            />
            <div>이찬희</div>
          </Profile>
          <AddUserButton>
            <AiOutlinePlus />
          </AddUserButton>
        </ProfileWrapper>
        <BoldText>
          {today.format('YYYY년 M월 D일')} ({getDay(today)})
        </BoldText>
        <AttendanceCard>
          <div>
            오늘의 스터디
            <span>14 : 00</span>
            {/* (12분 지각) */}
          </div>
          <AttendanceButton>출석</AttendanceButton>
        </AttendanceCard>
      </StudySummary>
      <StudyDetailContainer ref={contentRef}>
        <TabWrapper>
          {Object.keys(tabs).map((key: string) => (
            <Tab
              key={key}
              selected={currentTab.label == tabs[key].label}
              onClick={() => {
                onClickTabButton(tabs[key]);
              }}
            >
              {tabs[key].label}
            </Tab>
          ))}
        </TabWrapper>
        <TabContent>{currentTab.component}</TabContent>
      </StudyDetailContainer>
    </Layout>
  );
}

export default StudyDetail;
