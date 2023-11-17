import Modal from 'components/Modal';
import React, { useEffect, useState } from 'react';
import {
  Container,
  TitleDiv,
  ContentDiv,
  SelectDateForm,
  SettleListWrapper,
  TotalCostDiv,
  NoSchedule,
  SettledNotSettledTotalDiv,
} from './style';
import DatePicker from 'components/DatePicker';
import { SubTitle } from '../style';
import dayjs from 'dayjs';
import fetcher from 'utils/fetcher';
import { IPenaltyInfo } from 'types/db';
import useSWR from 'swr';
import MemberItem from '../MemberItem';
import { isEmpty } from 'lodash';
import { costFormatter } from 'utils/formatter';

function BatchSettlePopup({
  show,
  onClose,
  groupId,
}: {
  show: boolean;
  onClose: () => void;
  groupId: number;
}) {
  const [startDate, setStartDate] = useState<Date | null>(new Date()); // 정산 시작일
  const [finishDate, setFinishDate] = useState<Date | null>(new Date()); // 정산 완료일
  const [startDateStr, setStartDateStr] = useState('');
  const [finishDateStr, setFinishDateStr] = useState('');

  useEffect(() => {
    if (startDate) {
      setStartDateStr(dayjs(startDate).format('YYYY년 M월 D일'));
    } else {
      setStartDateStr('');
    }
    if (finishDate) {
      setFinishDateStr(dayjs(finishDate).format('YYYY년 M월 D일'));
    } else {
      setFinishDateStr('');
    }
  }, [startDate, finishDate]);

  // 기간 내 정산정보 조회
  const { data: penaltyInfo } = useSWR<IPenaltyInfo>(
    `/penalty/${groupId}/between?start=${dayjs(startDate).format(
      'YYYY-MM-DD',
    )}&finish=${dayjs(finishDate).format('YYYY-MM-DD')}`,
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

  return (
    <Modal show={show} onCloseModal={onClose}>
      <Container>
        <TitleDiv>
          일괄 정산 <div onClick={onClose}>&times;</div>
        </TitleDiv>
        <ContentDiv>
          <SelectDateForm>
            <div>
              정산 시작 날짜
              <div>
                <DatePicker
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                />
              </div>
            </div>
            <div>
              정산 완료 날짜
              <div>
                <DatePicker
                  selectedDate={finishDate}
                  setSelectedDate={setFinishDate}
                />
              </div>
            </div>
          </SelectDateForm>
          <div>
            <SubTitle>
              {startDateStr} ~ {finishDateStr}
            </SubTitle>
            <SettleListWrapper>
              <div>
                {/* 결석 멤버 목록 */}
                {!isEmpty(penaltyInfo?.absentMembers) && (
                  <>
                    {penaltyInfo?.absentMembers.map((mem) => (
                      <MemberItem
                        key={mem.name}
                        cost={penaltyInfo.absentCost}
                        penaltyMember={mem}
                        info=""
                        settle={() => {}}
                      />
                    ))}
                  </>
                )}
                {!isEmpty(penaltyInfo?.lateMembers) && ( // 지각멤버 목록
                  <>
                    {penaltyInfo?.lateMembers.map((mem) => (
                      <MemberItem
                        key={mem.name}
                        cost={penaltyInfo.lateCost}
                        penaltyMember={mem}
                        info=""
                        settle={() => {}}
                      />
                    ))}
                  </>
                )}
              </div>
              {/* 지각, 결석 멤버가 없는 경우 */}
              {isEmpty(penaltyInfo?.absentMembers) &&
              isEmpty(penaltyInfo?.lateMembers) ? (
                <NoSchedule>
                  <div>정산할 내역이 없습니다.</div>
                </NoSchedule>
              ) : (
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
              )}
            </SettleListWrapper>
          </div>
        </ContentDiv>
      </Container>
    </Modal>
  );
}

export default BatchSettlePopup;
