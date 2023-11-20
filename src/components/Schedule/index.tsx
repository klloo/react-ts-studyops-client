import ScheduleDot from 'components/ScheduleDot';
import React from 'react';
import { getScheduleColor } from 'utils/schedule';
import { Container } from './style';

function Schedule({
  studyId,
  time,
  title,
}: {
  studyId: number;
  time: string;
  title: string;
}) {
  return (
    <Container>
      <div className="time">
        <ScheduleDot color={getScheduleColor(studyId)} />
        <div>{time}</div>
      </div>
      <div className="title">{title}</div>
    </Container>
  );
}

export default Schedule;
