import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Container, CalendarHeaderDiv } from './style';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import dayjs from 'dayjs';

const DatePicker = ({
  selectedDate,
  onChange,
  error,
}: {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  error?: boolean;
}) => {
  const dayMap: { [key: string]: string } = {
    Sunday: '일',
    Monday: '월',
    Tuesday: '화',
    Wednesday: '수',
    Thursday: '목',
    Friday: '금',
    Saturday: '토',
  };

  return (
    <Container error={error}>
      <ReactDatePicker
        formatWeekDay={(nameOfDay) => dayMap[nameOfDay]}
        dateFormat="yyyy/MM/dd"
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date: Date | null) => {
          onChange(date);
        }}
        className="datePicker"
        calendarClassName="calenderWrapper"
        placeholderText="YYYY / MM / DD"
        dayClassName={(d) => {
          if (selectedDate) {
            if (
              dayjs(d).format('YYYYMMDD') ==
              dayjs(selectedDate).format('YYYYMMDD')
            )
              return 'selectedDay';
            return dayjs(d).format('YYYYMMDD') == dayjs().format('YYYYMMDD')
              ? 'today'
              : 'unselectedDay';
          }
          return dayjs(d).format('YYYYMMDD') == dayjs().format('YYYYMMDD')
            ? 'today'
            : 'unselectedDay';
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CalendarHeaderDiv>
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <MdArrowBackIos />
            </button>
            <span>{dayjs(date).format('M월')}</span>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <MdArrowForwardIos />
            </button>
          </CalendarHeaderDiv>
        )}
      />
    </Container>
  );
};

export default DatePicker;
