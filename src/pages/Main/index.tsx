import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { Container, Title, CardWrapper, ContentItem } from './style';
import StudyCard from './StudyCard';
import InviteCard from './InviteCard';
import dayjs from 'dayjs';
import ScheduleInfo from './ScheduleInfo';
import { IStudySchedule } from 'types/calendar';
import CalendarBlock from 'components/CalendarBlock';
import { IStudy } from 'types/db';
import useRequest from 'hooks/useRequest';
import { getGroupList } from 'api/group';
import { getAskGroupList } from 'api/ask';

/**
 * 메인 페이지
 */
const Main = () => {
  const [selectDate, setSelectDate] = useState(dayjs());
  const [schedules, setSchedules] = useState<IStudySchedule[]>([]);
  const tmpSchedules = [
    {
      day: '0',
      time: '14:00',
      title: '알고리즘 스터디',
      studyId: 3,
      attendance: true,
    },
    {
      day: '3',
      time: '14:00',
      title: '알고리즘 스터디',
      studyId: 3,
      attendance: true,
    },
    {
      day: '3',
      time: '15:00',
      title: '리액트 스터디',
      studyId: 4,
      attendance: true,
    },
  ];

  // 참여중인 스터디 목록
  const [studyList, setStudyList] = useState<IStudy[]>([]);
  const requestStudyList = useRequest<IStudy[]>(getGroupList);
  useEffect(() => {
    requestStudyList(1).then((data) => {
      setStudyList(data as IStudy[]);
    });
  }, []);

  // 초대받은 스터디 목록
  const [askStudyList, setAskStudyList] = useState<IStudy[]>([]);
  const requestAskStudyList = useRequest<IStudy[]>(getAskGroupList);
  useEffect(() => {
    requestAskStudyList(4).then((data) => {
      setAskStudyList(data as IStudy[]);
    });
  }, []);

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
            {studyList.map((study) => (
              <StudyCard study={study} />
            ))}
            <InviteCard />
          </CardWrapper>
        </ContentItem>
        <ContentItem>
          <Title>초대받은 스터디 목록이에요 💜</Title>
          <CardWrapper>
            {askStudyList.map((study) => (
              <StudyCard study={study} isInvite />
            ))}
          </CardWrapper>
        </ContentItem>
      </Container>
    </Layout>
  );
};

export default Main;
