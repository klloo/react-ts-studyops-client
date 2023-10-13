import React from 'react';
import { Title, Content, NoSchedule, Schedule } from './style';
import dayjs from 'dayjs';
import { StudySchedule } from 'types/study';
import { isEmpty } from 'lodash';
import ScheduleDot from 'components/ScheduleDot';
import { getScheduleColor } from 'utils/schedule';

/**
 * 선택한 날짜의 일정 컴포넌트
 */
function ScheduleInfo({
  sheduleDate,
  schedules,
}: {
  sheduleDate: dayjs.Dayjs;
  schedules: StudySchedule[];
}) {
  return (
    <>
      <Title>
        <h2>{dayjs(sheduleDate).format('M월 D일')} 스터디 일정</h2>
      </Title>
      <Content>
        {isEmpty(schedules) && (
          <NoSchedule>
            <div>스터디 일정이 없습니다.</div>
          </NoSchedule>
        )}
        {!isEmpty(schedules) &&
          schedules.map((item) => (
            <Schedule key={item.studyId}>
              <div className="time">
                <ScheduleDot color={getScheduleColor(item.studyId)} />
                <div>{item.time}</div>
              </div>
              <div className="title">{item.title}</div>
            </Schedule>
          ))}
      </Content>
    </>
  );
}

export default ScheduleInfo;
