import React, { useState, FC, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { isEmpty } from 'lodash';
import {
  Container,
  CalendarHeaderDiv,
  CalendarContentDiv,
  WeekDiv,
  ScheduleWrapper,
  DateBoxDiv,
  DayNumberDiv,
} from './style';
import ScheduleDot from 'components/ScheduleDot';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { getScheduleColor } from 'utils/schedule';
import { IStudyCalendarProps, IStudySchedule } from 'types/calendar';

/**
 * 스터디 달력 컴포넌트
 */
export const StudyCalendar: FC<IStudyCalendarProps> = ({
  selectDate, // 선택된 날짜
  setSelectDate, // 날짜 설정
  setSelectSchedules, // 스케줄 목록 설정
  schedules, // 선택된 날짜의 스케줄 목록
}) => {
  // 일정 정보 가공 {요일 : 스케줄 정보 } 형태의 객체로 가공
  const schedulesInfo = useMemo(() => {
    return schedules.reduce(
      (result, item) => {
        if (isEmpty(result[item.day])) {
          result[item.day] = [];
        }
        result[item.day].push(item);
        return result;
      },
      {} as Record<string, IStudySchedule[]>,
    );
  }, [schedules]);

  useEffect(() => {
    const currentDay = dayjs().format('d');
    let curSchedule = schedulesInfo[currentDay];
    curSchedule = curSchedule?.filter(
      (schedule) => dayjs(schedule.startDate) <= dayjs(),
    );
    setSelectSchedules?.(curSchedule);
  }, [schedulesInfo]);

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);
  const today = dayjs();

  // 보여질 날짜
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
        <WeekDiv key={week}>
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
                <div key={`${week}_${i}`}>
                  <DayNumberDiv sun={currentDay == '0'} num>
                    <div
                      className={`${isSelected} ${isToday} ${isNone}`}
                      onClick={() => {
                        setSelectDate(current);
                        if (setSelectSchedules) {
                          let curSchedule = schedulesInfo[currentDay];
                          curSchedule = curSchedule?.filter(
                            (schedule) => dayjs(schedule.startDate) <= dayjs(),
                          );
                          setSelectSchedules(curSchedule);
                        }
                      }}
                    >
                      <DateBoxDiv>
                        {current.format('D')}
                        <ScheduleWrapper>
                          {!isEmpty(schedulesInfo[currentDay]) &&
                            schedulesInfo[currentDay].map(
                              (
                                item: IStudySchedule,
                                i: React.Key | null | undefined,
                              ) => {
                                // 시작일 이후의 일정만 표시
                                if (dayjs(item.startDate) <= current) {
                                  return (
                                    <ScheduleDot
                                      key={i}
                                      color={getScheduleColor(item.studyId)}
                                    />
                                  );
                                }
                              },
                            )}
                        </ScheduleWrapper>
                      </DateBoxDiv>
                    </div>
                  </DayNumberDiv>
                </div>
              );
            })}
        </WeekDiv>,
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
      <CalendarHeaderDiv>
        <button onClick={() => changegeMonth(viewDate, 'subtract')}>
          <MdArrowBackIos />
        </button>
        <span>{viewDate.format('M')}월</span>
        <button onClick={() => changegeMonth(viewDate, 'add')}>
          <MdArrowForwardIos />
        </button>
      </CalendarHeaderDiv>
      <CalendarContentDiv>
        <WeekDiv>
          <div>
            <DayNumberDiv sun>일</DayNumberDiv>
          </div>
          <div>
            <DayNumberDiv day>월</DayNumberDiv>
          </div>
          <div>
            <DayNumberDiv day>화</DayNumberDiv>
          </div>
          <div>
            <DayNumberDiv day>수</DayNumberDiv>
          </div>
          <div>
            <DayNumberDiv day>목</DayNumberDiv>
          </div>
          <div>
            <DayNumberDiv day>금</DayNumberDiv>
          </div>
          <div>
            <DayNumberDiv day>토</DayNumberDiv>
          </div>
        </WeekDiv>
        <CalendarContentDiv>{createCalendar()}</CalendarContentDiv>
      </CalendarContentDiv>
    </Container>
  );
};

export default StudyCalendar;
