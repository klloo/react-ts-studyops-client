import React from 'react';
import 'styles/calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import { TodayCell } from './style';

const Calendar = () => {
  const daysKo: string[] = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date(); // 현재 날짜 가져오기
  // 오늘 날짜 스타일링을 처리하는 컴포넌트
  const renderTodayCell = ({ date }: { date: Date }) => {
    if (date.toDateString() === today.toDateString()) {
      return (
        <TodayCell>
          <span>{date.getDate()}</span>
        </TodayCell>
      );
    }
    return (
      <div>
        <span>{date.getDate()}</span>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        titleFormat={(date) => {
          const year = date.date.year;
          const month = date.date.month + 1;
          return year + '년 ' + month + '월';
        }}
        buttonText={{
          today: '오늘',
        }}
        dayHeaderContent={(arg) => {
          return daysKo[parseInt(moment(arg.date).format('d'))];
        }}
        height={650}
        fixedWeekCount={false}
        dayCellContent={renderTodayCell}
      />
    </div>
  );
};

export default Calendar;
