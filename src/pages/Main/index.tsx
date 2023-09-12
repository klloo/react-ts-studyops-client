import React from 'react';
import Layout from 'components/Layout';
import { Title, CalendarWrapper, CardWrapper, ScheduleWrapper } from './style';
import Calendar from 'components/Calendar';
import StudyCard from './StudyCard';
import InviteCard from './InviteCard';

/**
 * 메인 페이지
 */
const Main = () => {
  return (
    <Layout>
      <Title>스터디 일정</Title>
      <ScheduleWrapper>
        <CalendarWrapper>
          <Calendar />
        </CalendarWrapper>
      </ScheduleWrapper>
      <Title>참여중인 스터디</Title>
      <CardWrapper>
        <StudyCard />
        <StudyCard />
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
