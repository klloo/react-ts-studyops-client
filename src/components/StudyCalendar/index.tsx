import React, { useState, FC, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { isEmpty, isEqual } from 'lodash';
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
    curSchedule = curSchedule?.filter((schedule) => {
      if (!schedule.finishDate) {
        return (
          dayjs(schedule.startDate).isBefore(dayjs()) ||
          dayjs(schedule.startDate).isSame(dayjs())
        );
      }
      return (
        (dayjs(schedule.startDate).isBefore(dayjs()) ||
          dayjs(schedule.startDate).isSame(dayjs())) &&
        (dayjs(schedule.finishDate).isAfter(dayjs(dayjs())) ||
          dayjs(schedule.finishDate).isSame(dayjs()))
      );
    });
    if (!isEqual(curSchedule, schedules)) {
      setSelectSchedules?.(curSchedule);
    }
  }, [schedulesInfo, schedules]);

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  // 요일
  const weekDays = useMemo(
    () => ['일', '월', '화', '수', '목', '금', '토'],
    [],
  );
  // 보여질 날짜
  const [viewDate, setViewDate] = useState(dayjs().startOf('month'));
  const startWeek = viewDate.startOf('month').week();
  const endWeek =
    viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();

  const changeMonth = (date: unknown, changeString: string) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'));
      case 'subtract':
        return setViewDate(viewDate.subtract(1, 'month'));
      case 'today':
        return setViewDate(dayjs().startOf('month'));
      default:
        return date;
    }
  };

  return (
    <Container>
      <CalendarHeaderDiv>
        <button onClick={() => changeMonth(viewDate, 'subtract')}>
          <MdArrowBackIos />
        </button>
        <span onClick={() => changeMonth(viewDate, 'today')}>
          {viewDate.format('M')}월
        </span>
        <button onClick={() => changeMonth(viewDate, 'add')}>
          <MdArrowForwardIos />
        </button>
      </CalendarHeaderDiv>
      <CalendarContentDiv>
        <WeekDiv>
          {weekDays.map((day, i) => (
            <div key={i}>
              <DayNumberDiv sun={i === 0}>{day}</DayNumberDiv>
            </div>
          ))}
        </WeekDiv>
        <CalendarContentDiv>
          {Array.from(
            { length: endWeek - startWeek + 1 },
            (_, index) => startWeek + index,
          ).map((week) => (
            <WeekDiv key={week}>
              {Array(7)
                .fill(0)
                .map((n, i) => {
                  const current = viewDate
                    .week(week)
                    .startOf('week')
                    .add(n + i, 'day');
                  // 현재 날짜
                  const isSelected =
                    selectDate.format('YYYYMMDD') === current.format('YYYYMMDD')
                      ? 'selected'
                      : '';
                  const isToday =
                    dayjs().format('YYYYMMDD') === current.format('YYYYMMDD')
                      ? 'today'
                      : '';
                  const isNone =
                    current.format('MM') === viewDate.format('MM')
                      ? ''
                      : 'none';
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
                              curSchedule = curSchedule?.filter((schedule) => {
                                if (!schedule.finishDate) {
                                  return (
                                    dayjs(schedule.startDate).isBefore(
                                      current,
                                    ) ||
                                    dayjs(schedule.startDate).isSame(current)
                                  );
                                }
                                return (
                                  (dayjs(schedule.startDate).isBefore(
                                    current,
                                  ) ||
                                    dayjs(schedule.startDate).isSame(
                                      current,
                                    )) &&
                                  (dayjs(schedule.finishDate).isAfter(
                                    dayjs(current),
                                  ) ||
                                    dayjs(schedule.finishDate).isSame(dayjs()))
                                );
                              });
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
                                    if (
                                      dayjs(item.startDate).isBefore(current) ||
                                      dayjs(item.startDate).isSame(current)
                                    ) {
                                      // 종료일이 있다면 종료일 이전의 일정만 표시
                                      if (item.finishDate) {
                                        if (
                                          dayjs(current).isBefore(
                                            item.finishDate,
                                          ) ||
                                          dayjs(item.finishDate).isSame(current)
                                        )
                                          return (
                                            <ScheduleDot
                                              key={i}
                                              color={item.color}
                                            />
                                          );
                                      } else {
                                        return (
                                          <ScheduleDot
                                            key={i}
                                            color={item.color}
                                          />
                                        );
                                      }
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
            </WeekDiv>
          ))}
        </CalendarContentDiv>
      </CalendarContentDiv>
    </Container>
  );
};

export default StudyCalendar;
