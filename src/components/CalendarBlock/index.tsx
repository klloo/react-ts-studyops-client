import React, { ReactNode } from 'react';
import { Card, Container, CalendarWrapper } from './style';
import StudyCalendar from 'components/StudyCalendar';
import { IStudyCalendarProps } from 'types/calendar';

interface CalendarBlockProps extends IStudyCalendarProps {
  children: ReactNode;
}

function CalendarBlock({
  selectDate,
  setSelectDate,
  setSelectSchedules,
  schedules,
  children,
}: CalendarBlockProps) {
  return (
    <Container>
      <CalendarWrapper>
        <StudyCalendar
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          setSelectSchedules={setSelectSchedules}
          schedules={schedules}
        />
      </CalendarWrapper>
      <Card>{children}</Card>
    </Container>
  );
}

export default CalendarBlock;
