import React from 'react';
import Layout from 'layouts/Layout';
import { Title, CalendarWrapper, CardWrapper } from './style';
import Calendar from 'components/Calendar';
import StudyCard from './StudyCard';
import InviteCard from './InviteCard';

/**
 * 메인 페이지
 */
const Main = () => {
  return (
    <Layout>
      <Title>나의 스터디 일정</Title>
      <CalendarWrapper>
        <Calendar />
      </CalendarWrapper>
      <Title>참여중인 스터디</Title>
      <CardWrapper>
        <StudyCard />
        <StudyCard />
        <StudyCard />
        <InviteCard />
      </CardWrapper>
      <Title>초대받은 스터디가 있어요!</Title>
      <CardWrapper>
        <StudyCard isInvite={true} />
        <StudyCard isInvite={true} />
      </CardWrapper>
    </Layout>
  );
};

export default Main;
