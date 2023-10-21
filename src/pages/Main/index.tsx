import React, { useState } from 'react';
import Layout from 'components/Layout';
import { Container, Title, CardWrapper, ContentItem } from './style';
import StudyCard from './StudyCard';
import InviteCard from './InviteCard';
import dayjs from 'dayjs';
import ScheduleInfo from './ScheduleInfo';
import { StudySchedule } from 'types/study';
import CalendarBlock from 'components/CalendarBlock';

/**
 * 메인 페이지
 */
const Main = () => {
  const [selectDate, setSelectDate] = useState(dayjs());
  const [schedules, setSchedules] = useState<StudySchedule[]>([]);
  const tmpSchedules = [
    { day: '0', time: '14:00', title: '알고리즘 스터디', studyId: 3 },
    { day: '3', time: '14:00', title: '알고리즘 스터디', studyId: 3 },
    { day: '3', time: '15:00', title: '리액트 스터디', studyId: 4 },
  ];

  return (
    <Layout>
      <Container>
        <ContentItem>
          <Title>11월 스터디 일정이에요 🗓️</Title>
          <div>
            <CalendarBlock
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              setSelectSchedules={setSchedules}
              schedules={tmpSchedules}
            >
              <ScheduleInfo sheduleDate={selectDate} schedules={schedules} />
            </CalendarBlock>
          </div>
        </ContentItem>
        <ContentItem>
          <Title>참여 중인 스터디에요 ✨</Title>
          <CardWrapper>
            <StudyCard />
            <StudyCard />
            <StudyCard />
            <InviteCard />
          </CardWrapper>
        </ContentItem>
        <ContentItem>
          <Title>초대받은 스터디 목록이에요 💜</Title>
          <CardWrapper>
            <StudyCard isInvite={true} />
            <StudyCard isInvite={true} />
          </CardWrapper>
        </ContentItem>
      </Container>
    </Layout>
  );
};

export default Main;
