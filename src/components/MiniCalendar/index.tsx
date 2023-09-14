import React, { useState, FC } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { isEmpty } from 'lodash';
import {
  CalendarContent,
  CalendarHeader,
  Container,
  ScheduleDot,
  ScheduleWrapper,
} from './style';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { StudySchedule } from 'types/study';
import { getScheduleColor } from 'utils/schedule';
import { MiniCalendarProps } from 'types/calendar';

export const MiniCalendar: FC<MiniCalendarProps> = ({
  selectDate,
  setSelectDate,
  setSelectSchedules,
  schedules,
}) => {
  const schedulesInfo = schedules.reduce(
    (result, item) => {
      if (isEmpty(result[item.day])) {
        result[item.day] = [];
      }
      result[item.day].push(item);
      return result;
    },
    {} as Record<string, StudySchedule[]>,
  );

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());

  const createCalendar = () => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek =
      viewDate.endOf('month').week() === 1
        ? 53
        : viewDate.endOf('month').week();
    const calender = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = viewDate
                .startOf('week')
                .week(week)
                .add(n + i, 'day');
              if (viewDate.format('MM') === '12') {
                current = viewDate
                  .startOf('week')
                  .week(week - 52)
                  .add(n + i, 'day');
              }
              // 현재 날짜 (기준)
              const isSelected =
                selectDate.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'selected'
                  : '';
              const isToday =
                today.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'today'
                  : '';
              const isNone =
                current.format('MM') === viewDate.format('MM') ? '' : 'none';
              const currentDay = current.format('d');
              return (
                <>
                  <div
                    className={`box ${currentDay == '0' ? 'sun' : ''}`}
                    key={`${week}_${i}`}
                  >
                    <div
                      className={`text ${isSelected} ${isToday} ${isNone}`}
                      onClick={() => {
                        setSelectDate(current);
                        if (setSelectSchedules)
                          setSelectSchedules(schedulesInfo[currentDay]);
                      }}
                    >
                      <span className={`day`}>{current.format('D')}</span>
                      <span
                        className={
                          isToday ? 'isToday' : isSelected ? 'isSelected' : ''
                        }
                      >
                        <ScheduleWrapper>
                          {!isEmpty(schedulesInfo[currentDay]) &&
                            schedulesInfo[currentDay].map(
                              (
                                item: StudySchedule,
                                i: React.Key | null | undefined,
                              ) => (
                                <ScheduleDot
                                  key={i}
                                  color={getScheduleColor(item.studyId)}
                                />
                              ),
                            )}
                        </ScheduleWrapper>
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
        </div>,
      );
    }
    return calender;
  };

  const changegeMonth = (date: unknown, changeString: string) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'));
      case 'subtract':
        return setViewDate(viewDate.subtract(1, 'month'));
      default:
        return date;
    }
  };

  return (
    <Container>
      <CalendarHeader>
        <button onClick={() => changegeMonth(viewDate, 'subtract')}>
          <MdArrowBackIos />
        </button>
        <span className="thisMonth">{viewDate.format('M')}월</span>
        <button onClick={() => changegeMonth(viewDate, 'add')}>
          <MdArrowForwardIos />
        </button>
      </CalendarHeader>
      <CalendarContent>
        <div className="row week">
          <div className="box">
            <span className="text sun">일</span>
          </div>
          <div className="box">
            <span className="text">월</span>
          </div>
          <div className="box">
            <span className="text">화</span>
          </div>
          <div className="box">
            <span className="text">수</span>
          </div>
          <div className="box">
            <span className="text">목</span>
          </div>
          <div className="box">
            <span className="text">금</span>
          </div>
          <div className="box">
            <span className="text">토</span>
          </div>
        </div>
        <div>{createCalendar()}</div>
      </CalendarContent>
    </Container>
  );
};

export default MiniCalendar;
