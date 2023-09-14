import React, { ReactNode } from 'react';
import { Card, Container, CalendarWrapper } from './style';
import MiniCalendar from 'components/MiniCalendar';
import { MiniCalendarProps } from 'types/calendar';

interface CalendarBlockProps extends MiniCalendarProps {
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
        <MiniCalendar
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
