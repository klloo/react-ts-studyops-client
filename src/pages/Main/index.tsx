import React, { useState } from 'react';
import Layout from 'components/Layout';
import { Title, CardWrapper, ScheduleWrapper } from './style';
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
      <ScheduleWrapper>
        <CalendarBlock
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          setSelectSchedules={setSchedules}
          schedules={tmpSchedules}
        >
          <ScheduleInfo sheduleDate={selectDate} schedules={schedules} />
        </CalendarBlock>
      </ScheduleWrapper>
      <Title>참여중인 스터디</Title>
      <CardWrapper>
        <StudyCard />
        <StudyCard />
        <InviteCard />
      </CardWrapper>
      <Title>
        <div>초대받은 스터디가 있어요!</div>
      </Title>
      <CardWrapper>
        <StudyCard isInvite={true} />
        <StudyCard isInvite={true} />
      </CardWrapper>
    </Layout>
  );
};

export default Main;
