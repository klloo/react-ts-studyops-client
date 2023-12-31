import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  TodayDate,
  TodayStudy,
  CancelIcon,
  CheckIcon,
  LateIcon,
  AttendacneInfo,
} from './style';
import dayjs from 'dayjs';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { getDay, calcDiffMinutes } from 'utils/schedule';
import { ITodayStudy } from 'types/db';
import useRequest from 'hooks/useRequest';
import { attendanceGroup } from 'api/schedule';
import { toast } from 'react-toastify';
import { timeStringFormatter } from 'utils/formatter';

/**
 * 스터디 상세 페이지 오늘의 스터디 일정 컴포넌트
 */
function TodaySchedule({ groupId }: { groupId: number }) {
  // 오늘의 스터디 일정 정보
  const { data: todaySchedule, mutate: mutateTodaySchedule } =
    useSWR<ITodayStudy>(`/schedules/today/${groupId}`, fetcher);

  const [showLateInfo, setShowLateInfo] = useState(false);
  const [showAttendInfo, setShowAttendInfo] = useState(false);
  const [overtime, setOvertime] = useState(0);
  const [absent, setAbsent] = useState(false);

  // 스터디 시간을 문자열로 받아서 dayjs형식으로 반환한다.
  const getStudyStart = useCallback((studyStartTime: string) => {
    const [sh, sm] = studyStartTime.split(':');
    const studyStart = dayjs()
      .hour(parseInt(sh))
      .minute(parseInt(sm))
      .second(0)
      .millisecond(0);
    return studyStart;
  }, []);

  // 출석 정보를 보여줄 지 여부를 설정한다.
  // 1. 오늘 스터디가 있고, 현재 시간이 스터디 시작 시간 이후일 경우 보여준다.
  useEffect(() => {
    if (!todaySchedule || !todaySchedule.startTime) return;
    // 현재 시간이 스터디 시작 시간 이후인 경우
    const cur = dayjs();
    const studyStart = getStudyStart(todaySchedule.startTime);
    // 현재 시간이 스터디 시작 시간 이후인 경우
    if (cur.isAfter(studyStart)) {
      setShowAttendInfo(true);
    } else {
      setShowAttendInfo(false);
    }
  }, [todaySchedule]);

  // 현재 시간이 스터디 시작 시간 이후라면 showLateInfo값을 true로 하여 출석 정보를 보여줘야 한다..
  useEffect(() => {
    // 예외 경우
    // 1. 데이터를 못받아온 경우
    // 2. 오늘이 스터디 날이 아니거나 시작시간이 없는 경우
    // 3. 지각이 아니고 출석한 경우 (정상 출석)
    if (!todaySchedule) {
      setShowLateInfo(false);
      return;
    }
    if (!todaySchedule.isStudyDay || !todaySchedule.startTime) {
      setShowLateInfo(false);
      return;
    }
    if (!todaySchedule.isLate && todaySchedule.isAttendant) {
      setShowLateInfo(false);
      return;
    }
    const cur = dayjs();
    const studyStart = getStudyStart(todaySchedule.startTime);
    // 현재 시간이 스터디 시작 시간 이후인 경우
    if (cur.isAfter(studyStart)) {
      setShowLateInfo(true);
    } else {
      setShowLateInfo(false);
    }
    // 출석한 경우는 경과시간 계산 안해도 된다.
    if (todaySchedule.isAttendant || !todaySchedule.finishTime) return;
    // 경과 시간을 계산한다.
    const calcRes = calcDiffMinutes(todaySchedule.startTime);
    setOvertime(calcRes);
    // 경과 시간이 스터디 시간보다 길어지면 결석 처리
    const [fh, fm] = todaySchedule.finishTime.split(':');
    const studyEnd = dayjs()
      .hour(parseInt(fh))
      .minute(parseInt(fm))
      .second(0)
      .millisecond(0);
    const studyTime = studyEnd.diff(studyStart, 'minutes');
    if (studyTime <= calcRes) {
      setAbsent(true);
      return;
    }
    // 경과 시간을 보여줘야 하는 경우 타이머를 생성한다. 1분마다 경과시간을 1분씩 증가시킨다.
    const interval = setInterval(() => {
      if (!todaySchedule.startTime) {
        clearInterval(interval);
        return;
      }
      // overtime이 스터디 시간보다 길어지면 데이터 결석 처리하고 타이머 제거
      const curOvertime = calcDiffMinutes(todaySchedule.startTime);
      if (studyTime <= curOvertime - 1) {
        setAbsent(true);
        clearInterval(interval);
      }
      setOvertime(curOvertime);
    }, 1000);
    return () => clearInterval(interval);
  }, [todaySchedule, overtime]);

  const requestAttendance = useRequest<boolean>(attendanceGroup);
  const onClickAttendance = useCallback(() => {
    requestAttendance(groupId)
      .then(() => {
        toast.success('출석을 완료하였습니다.');
        mutateTodaySchedule();
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container>
      <TodayDate>
        {`${dayjs().format('YYYY년 M월 D일')} (${getDay(dayjs())})`}
      </TodayDate>
      {todaySchedule && (
        <TodayStudy>
          {!todaySchedule.isStudyDay || !todaySchedule.startTime ? (
            '오늘은 스터디가 없습니다 :)'
          ) : (
            <div>
              오늘의 스터디 {todaySchedule.startTime}{' '}
              {showLateInfo && (
                <span>
                  {!absent
                    ? todaySchedule.isLate
                      ? `(${timeStringFormatter(
                          todaySchedule.lateTime || 0,
                        )} 지각)`
                      : `(${timeStringFormatter(
                          calcDiffMinutes(todaySchedule.startTime),
                        )} 경과)`
                    : '결석'}
                </span>
              )}
            </div>
          )}
          {/* 1. 출석할 수 있는 경우 - 출석 버튼
              2. 결석인 경우 - 엑스표시
              3. 출석 했는데 지각인 경우 - 출석 시간이랑 엑스 표시
              4. 정상 출석한 경우 - 출석 시간이랑 출석 표시 */}
          {showAttendInfo &&
            (absent ? (
              <CancelIcon size="38" />
            ) : todaySchedule.isAttendant ? (
              <AttendacneInfo>
                {todaySchedule.attendanceTime}
                {todaySchedule.isLate ? (
                  <LateIcon size="36" />
                ) : (
                  <CheckIcon size="38" />
                )}
              </AttendacneInfo>
            ) : (
              <button onClick={onClickAttendance}>출석</button>
            ))}
        </TodayStudy>
      )}
    </Container>
  );
}

export default TodaySchedule;
