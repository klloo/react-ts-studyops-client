import CalendarBlock from 'components/CalendarBlock';
import ScheduleDot from 'components/ScheduleDot';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { IStudySchedule } from 'types/calendar';
import { IPenaltyInfo, IPenaltyTotal, IStudyScheduleInfo } from 'types/db';
import fetcher from 'utils/fetcher';
import { getDay, getDayNum, settledColor } from 'utils/schedule';
import {
  LegendInfo,
  NoSchedule,
  TitleDiv,
  ContentDiv,
  SettledNotSettledTotalDiv,
  TotalCostDiv,
  TopWrapper,
  SettleButton,
} from './style';
import { isEmpty } from 'lodash';
import { costFormatter, timeStringFormatter } from 'utils/formatter';
import MemberItem from '../MemberItem';
import useRequest from 'hooks/useRequest';
import { cancelSettlePenalty, exemptPenalty, settlePenalty } from 'api/penalty';
import { toast } from 'react-toastify';
import BatchSettlePopup from '../BatchSettlePopup';

function SettleCalendar({
  groupId,
  isHost,
  noPenalty,
}: {
  groupId: number;
  isHost: boolean;
  noPenalty: boolean;
}) {
  const [selectDate, setSelectDate] = useState(dayjs()); // 선택한 날짜
  const [showBatchSettlePopup, setShowBatchSettlePopup] = useState(false); // 일괄 정산 팝업 띄우기 여부
  const [, setSchedules] = useState<IStudySchedule[]>([]); // 선택한 일정
  // 스터디 스케줄 로드
  const { data: scheduleInfo } = useSWR<IStudyScheduleInfo>(
    `/schedules/${groupId}`,
    fetcher,
  );
  // 미정산일 조회
  const { data: notSettledInfo, mutate: mutateSettleDate } = useSWR<{
    notSettledDays: string[];
  }>(`/penalty/${groupId}/dates`, fetcher);
  // 정산정보 조회
  const { data: penaltyInfo, mutate: mutatePenaltyInfo } = useSWR<IPenaltyInfo>(
    `/penalty/${groupId}/date?date=${selectDate.format('YYYY-MM-DD')}`,
    fetcher,
  );
  // 총 벌금 정보
  const { mutate: mutatePenalty } = useSWR<IPenaltyTotal>(
    `/penalty/${groupId}`,
    fetcher,
  );

  const [totalCost, setTotalCost] = useState(0); // 해당 날짜의 총 벌금
  const [settledTotal, setSettledTotal] = useState(0); // 해당 날짜의 정산된 총 금액
  const [notSettledTotal, setNotSettledTotal] = useState(0); // 해당 날짜의 미정산된 총 금액

  // 정산, 미정산 금액 계산
  useEffect(() => {
    if (!penaltyInfo) return;
    const total =
      penaltyInfo.absentMembers.length * penaltyInfo.absentCost +
      penaltyInfo.lateMembers.length * penaltyInfo.lateCost;
    setTotalCost(total);
    let settled = 0;
    let notSettled = 0;
    penaltyInfo.absentMembers.forEach((mem) => {
      if (mem.isSettled) {
        settled += penaltyInfo.absentCost;
      } else {
        notSettled += penaltyInfo.lateCost;
      }
    });
    penaltyInfo.lateMembers.forEach((mem) => {
      if (mem.isSettled) {
        settled += penaltyInfo.lateCost;
      } else {
        notSettled += penaltyInfo.lateCost;
      }
    });
    setSettledTotal(settled);
    setNotSettledTotal(notSettled);
  }, [penaltyInfo]);

  // 정산, 미정산 여부에 따라 다른 색상 반환
  const getSettledColor = useCallback(
    (currentDate: string) => {
      if (!notSettledInfo) {
        return settledColor.true;
      }
      if (
        notSettledInfo?.notSettledDays.some((notDate) => notDate == currentDate)
      ) {
        return settledColor.false;
      }
      return settledColor.true;
    },
    [notSettledInfo],
  );

  // 참여중인 스터디 일정 설정 (스터디 스케줄로 가공)
  const [studySchedules, setStudySchedules] = useState<IStudySchedule[]>([]);
  useEffect(() => {
    if (!scheduleInfo || !groupId) return;
    const scheduleList: IStudySchedule[] = [];
    const today = dayjs();
    const startDate = dayjs(scheduleInfo.startDate);

    // startDate부터 오늘까지의 각 날짜에 대한 처리
    // 출결 정보의 경우 날짜 단위로 이루어지기 때문에 startDate ~ 오늘 까지의 모든 날짜를 확인하면서
    // 스터디가 있는 요일의 날짜를 startDate와 finishDate로 동일하게 넣어줘서 별개로 표시되게 함
    // 현재 달력은 요일만 비교해서 일정 정보를 넣기 때문에 이렇게 했다.. 횡설수설
    let currentDate = startDate;
    while (currentDate.isSame(today) || currentDate.isBefore(today)) {
      // dayWeek에 해당하는 날짜인 경우
      const matchingSchedule = scheduleInfo.schedules.find(
        (schedule) => getDayNum(schedule.dayWeek) === currentDate.day(),
      );
      if (matchingSchedule) {
        const currentDateStr = currentDate.format('YYYY-MM-DD');
        scheduleList.push({
          day: getDayNum(matchingSchedule.dayWeek).toString(),
          time: matchingSchedule.startTime,
          title: '',
          studyId: groupId,
          attendance: true,
          color: noPenalty
            ? settledColor.true
            : getSettledColor(currentDateStr),
          startDate: currentDateStr,
          finishDate: currentDateStr,
        });
      }
      // 다음 날짜로 이동
      currentDate = currentDate.add(1, 'day');
    }
    setStudySchedules(scheduleList);
  }, [scheduleInfo, notSettledInfo, noPenalty]);

  // 데이터 리로드
  const mutateData = useCallback(() => {
    mutateSettleDate();
    mutatePenaltyInfo();
    mutatePenalty();
  }, []);

  // 벌금 정산
  const requestSettle = useRequest<boolean>(settlePenalty);
  const requestCancelSettle = useRequest<boolean>(cancelSettlePenalty);
  const settleProc = useCallback((penaltyId: number, isSettled: boolean) => {
    if (isSettled) {
      requestCancelSettle(penaltyId)
        .then(() => {
          mutateData();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      requestSettle(penaltyId)
        .then(() => {
          mutateData();
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);
  // 벌금 면제
  const requestExempt = useRequest<boolean>(exemptPenalty);
  const exemptProc = useCallback((penaltyId: number, isSettled: boolean) => {
    if (isSettled) {
      toast.error('이미 정산된 벌금입니다.');
      return;
    }
    requestExempt(penaltyId)
      .then(() => {
        mutateSettleDate();
        mutatePenaltyInfo();
        mutatePenalty();
        toast.success('벌금을 면제하였습니다.');
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      {!noPenalty && (
        <TopWrapper>
          <LegendInfo>
            <div>
              <ScheduleDot color={settledColor.true} />
              정산 완료
            </div>
            <div>
              <ScheduleDot color={settledColor.false} />
              미정산
            </div>
          </LegendInfo>
          {isHost && (
            <SettleButton
              onClick={() => {
                setShowBatchSettlePopup(true);
              }}
            >
              일괄 정산
            </SettleButton>
          )}
        </TopWrapper>
      )}
      <CalendarBlock
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        setSelectSchedules={setSchedules}
        schedules={studySchedules}
      >
        <TitleDiv>
          {dayjs(selectDate).format('M월 D일')} ({getDay(dayjs(selectDate))})
          {!noPenalty && <div>결석 벌금은 매 시 정각에 업데이트 됩니다.</div>}
        </TitleDiv>
        <ContentDiv>
          <div>
            {/* 결석 멤버 목록 */}
            {!isEmpty(penaltyInfo?.absentMembers) &&
              penaltyInfo?.absentMembers.map((mem) => (
                <MemberItem
                  key={mem.name}
                  isHost={isHost}
                  cost={penaltyInfo.absentCost}
                  penaltyMember={mem}
                  info="결석"
                  settle={() => {
                    settleProc(mem.penaltyId, mem.isSettled);
                  }}
                  exempt={() => {
                    exemptProc(mem.penaltyId, mem.isSettled);
                  }}
                  noPenalty={noPenalty}
                />
              ))}
            {!isEmpty(penaltyInfo?.lateMembers) && // 지각멤버 목록
              penaltyInfo?.lateMembers.map((mem) => (
                <MemberItem
                  key={mem.name}
                  isHost={isHost}
                  cost={penaltyInfo.lateCost}
                  penaltyMember={mem}
                  info={`${timeStringFormatter(mem.lateTime || 0)} 지각`}
                  settle={() => {
                    settleProc(mem.penaltyId, mem.isSettled);
                  }}
                  exempt={() => {
                    exemptProc(mem.penaltyId, mem.isSettled);
                  }}
                  noPenalty={noPenalty}
                />
              ))}
          </div>
          {/* 지각, 결석 멤버가 없는 경우 */}
          {isEmpty(penaltyInfo?.absentMembers) &&
          isEmpty(penaltyInfo?.lateMembers) ? (
            <NoSchedule>
              <div>출결 정보가 없습니다.</div>
            </NoSchedule>
          ) : (
            !noPenalty && (
              <div>
                <SettledNotSettledTotalDiv>
                  <div>
                    미정산 <span>{costFormatter(notSettledTotal)}원</span>
                  </div>
                  <div>
                    정산 완료 <span>{costFormatter(settledTotal)}원</span>
                  </div>
                </SettledNotSettledTotalDiv>
                <TotalCostDiv>
                  <span>총 </span>
                  {costFormatter(totalCost)}
                </TotalCostDiv>
              </div>
            )
          )}
        </ContentDiv>
      </CalendarBlock>
      <BatchSettlePopup
        show={showBatchSettlePopup}
        onClose={() => {
          setShowBatchSettlePopup(false);
        }}
        groupId={groupId}
        mutateData={mutateData}
      />
    </div>
  );
}

export default SettleCalendar;
