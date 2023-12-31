import CalendarBlock from 'components/CalendarBlock';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { IStudySchedule } from 'types/calendar';
import { FaRegCalendar } from 'react-icons/fa';
import {
  Container,
  TitleDiv,
  NoSchedule,
  VoteWrapper,
  AttendanceList,
} from './style';
import { ContentTitle } from '../style';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import { IAttendance, IStudyScheduleInfo } from 'types/db';
import { getDay, getDayNum, getScheduleColor } from 'utils/schedule';
import { isEmpty } from 'lodash';
import Schedule from 'components/Schedule';
import CustomSwitch from 'components/CustomSwitch';
import useRequest from 'hooks/useRequest';
import { attendanceVoteGroup } from 'api/schedule';
import ProfileImage from 'components/ProfileImage';
import { toast } from 'react-toastify';

/**
 * 스터디 상세화면의 일정 탭 내용
 */
function StudySchedule({ groupId }: { groupId: number }) {
  // 임시
  const [selectDate, setSelectDate] = useState(dayjs());
  const [schedule, setSchedules] = useState<IStudySchedule[]>([]);
  // 스터디 스케줄 로드
  const { data: scheduleInfo } = useSWR<IStudyScheduleInfo>(
    `/schedules/${groupId}`,
    fetcher,
  );
  // 선택한 날짜의 스터디 참석 여부 조회
  const { data: attendanceInfo, mutate: mutateAttendance } =
    useSWR<IAttendance>(
      `/schedules/attendances/${groupId}?date=${dayjs(selectDate).format(
        'YYYY-MM-DD',
      )}`,
      fetcher,
    );

  // 참여중인 스터디 일정 설정 (스터디 스케줄로 가공)
  const [studySchedules, setStudySchedules] = useState<IStudySchedule[]>([]);
  useEffect(() => {
    if (!scheduleInfo || !groupId) return;
    const scheduleList: IStudySchedule[] = scheduleInfo.schedules.map(
      (schedule) => ({
        day: getDayNum(schedule.dayWeek).toString(),
        time: schedule.startTime,
        title: '시작',
        studyId: groupId,
        attendance: true,
        startDate: scheduleInfo.startDate,
        color: getScheduleColor(groupId),
        studyIdx: groupId,
      }),
    );
    setStudySchedules(scheduleList);
  }, [scheduleInfo]);

  // 출석 여부 스위치 버튼 핸들러
  const requestAttendanceVote = useRequest<boolean>(attendanceVoteGroup);
  const toggleAttendance = useCallback(() => {
    if (
      dayjs().format('YYYY-MM-DD') === dayjs(selectDate).format('YYYY-MM-DD')
    ) {
      toast.error('당일 일정은 변경할 수 없습니다.');
      return;
    }
    if (dayjs().isAfter(dayjs(selectDate))) {
      toast.error('지난 일정은 변경할 수 없습니다.');
      return;
    }
    requestAttendanceVote(
      groupId,
      dayjs(selectDate).format('YYYY-MM-DD'),
      !attendanceInfo?.isAttended,
    )
      .then(() => {
        mutateAttendance();
      })
      .catch((e) => {
        console.error(e);
      });
  }, [attendanceInfo, groupId]);

  return (
    <div>
      <ContentTitle>
        <span>
          <FaRegCalendar size="21" />
        </span>
        스터디 일정
      </ContentTitle>
      <CalendarBlock
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        setSelectSchedules={setSchedules}
        schedules={studySchedules}
      >
        <Container>
          <TitleDiv>
            {dayjs(selectDate).format('M월 D일')} ({getDay(dayjs(selectDate))})
            스터디 일정
          </TitleDiv>
          {!isEmpty(schedule) && schedule.length > 0 ? (
            <>
              <Schedule
                time={schedule[0].time}
                studyId={groupId}
                title={schedule[0].title}
              />
              {attendanceInfo && (
                <>
                  <VoteWrapper>
                    나의 참석 여부
                    <CustomSwitch
                      checked={attendanceInfo.isAttended}
                      onChange={toggleAttendance}
                    />
                  </VoteWrapper>
                  <AttendanceList>
                    참석인원
                    <div>
                      {attendanceInfo.attendMemberList.length > 0 ? (
                        attendanceInfo.attendMemberList.map((user, i) => (
                          <div key={i}>
                            <ProfileImage width="30" height="30" />
                            <div>{user}</div>
                          </div>
                        ))
                      ) : (
                        <span>참석 인원이 없습니다.</span>
                      )}
                    </div>
                  </AttendanceList>
                  <AttendanceList>
                    불참인원
                    <div>
                      {attendanceInfo.absenceMemberList.length > 0 ? (
                        attendanceInfo.absenceMemberList.map((user, i) => (
                          <div key={i}>
                            <ProfileImage width="30" height="30" />
                            <div>{user}</div>
                          </div>
                        ))
                      ) : (
                        <span>불참 인원이 없습니다.</span>
                      )}
                    </div>
                  </AttendanceList>
                </>
              )}
            </>
          ) : (
            <NoSchedule>
              <div>스터디 일정이 없습니다.</div>
            </NoSchedule>
          )}
        </Container>
      </CalendarBlock>
    </div>
  );
}

export default StudySchedule;
