import React, { useEffect, useState } from 'react';
import { Title, Content, NoSchedule } from './style';
import dayjs from 'dayjs';
import { IStudySchedule } from 'types/calendar';
import { isEmpty } from 'lodash';
import { compareTime, getDay } from 'utils/schedule';
import Schedule from 'components/Schedule';

/**
 * 선택한 날짜의 일정 컴포넌트
 */
function ScheduleInfo({
  sheduleDate,
  schedules,
}: {
  sheduleDate: dayjs.Dayjs;
  schedules: IStudySchedule[];
}) {
  const [sortedSchedules, setSortedSchedules] = useState<IStudySchedule[]>([]);

  useEffect(() => {
    setSortedSchedules(schedules?.sort((a, b) => compareTime(a.time, b.time)));
  }, [schedules]);

  return (
    <>
      <Title>
        {dayjs(sheduleDate).format('M월 D일')} ({getDay(dayjs(sheduleDate))})
        스터디 일정
      </Title>
      <Content>
        {isEmpty(schedules) && (
          <NoSchedule>
            <div>스터디 일정이 없습니다.</div>
          </NoSchedule>
        )}
        {!isEmpty(sortedSchedules) &&
          sortedSchedules.map((item) => (
            <Schedule
              key={item.studyId}
              time={item.time}
              studyId={item.studyIdx}
              title={item.title}
            />
          ))}
      </Content>
    </>
  );
}

export default ScheduleInfo;
