import Modal from 'layouts/Modal';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  TitleDiv,
  ContentDiv,
  SelectDateForm,
  SettleListWrapper,
  TotalCostDiv,
  NoSchedule,
  SubTitle,
} from './style';
import DatePicker from 'components/DatePicker';
import dayjs from 'dayjs';
import fetcher from 'utils/fetcher';
import { IPenaltyInfo, IPenaltyMemberInfo } from 'types/db';
import useSWR from 'swr';
import { isEmpty } from 'lodash';
import { costFormatter } from 'utils/formatter';
import BatchMemberItem from './BatchMemberItem';
import useRequest from 'hooks/useRequest';
import { batchSettle } from 'api/penalty';
import { toast } from 'react-toastify';

export interface IBatchPenaltyInfo
  extends Omit<IPenaltyMemberInfo, 'penaltyId' | 'lateTime'> {
  penaltyIds: number[];
  penaltyCount: number;
  penaltyCost: number;
}

function BatchSettlePopup({
  show,
  onClose,
  groupId,
  mutateData,
}: {
  show: boolean;
  onClose: () => void;
  groupId: number;
  mutateData: () => void;
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
  const { data: penaltyInfo, mutate: mutatePenaltyInfo } = useSWR<IPenaltyInfo>(
    `/penalty/${groupId}/between?start=${dayjs(startDate).format(
      'YYYY-MM-DD',
    )}&finish=${dayjs(finishDate).format('YYYY-MM-DD')}`,
    fetcher,
  );

  const [totalCost, setTotalCost] = useState(0); // 해당 날짜의 총 벌금
  const [batchPenaltyInfo, setBatchPenaltyInfo] = useState<IBatchPenaltyInfo[]>(
    [],
  );

  // 지각, 결석 벌금 일괄 정보 가공
  useEffect(() => {
    if (!penaltyInfo) return;
    const penaltyInfoMap: { [name: string]: IBatchPenaltyInfo } = {};
    penaltyInfo.lateMembers.forEach((item) => {
      const { penaltyId, name } = item;
      if (!penaltyInfoMap[name]) {
        penaltyInfoMap[name] = {
          isSettled: false,
          name: item.name,
          penaltyIds: [],
          penaltyCount: 0,
          penaltyCost: 0,
        };
      }
      penaltyInfoMap[name].penaltyIds.push(penaltyId);
      penaltyInfoMap[name].penaltyCount += 1;
      penaltyInfoMap[name].penaltyCost += penaltyInfo.lateCost;
    });
    penaltyInfo.absentMembers.forEach((item) => {
      const { penaltyId, name } = item;
      if (!penaltyInfoMap[name]) {
        penaltyInfoMap[name] = {
          isSettled: false,
          name: item.name,
          penaltyIds: [],
          penaltyCount: 0,
          penaltyCost: 0,
        };
      }
      penaltyInfoMap[name].penaltyIds.push(penaltyId);
      penaltyInfoMap[name].penaltyCount += 1;
      penaltyInfoMap[name].penaltyCost += penaltyInfo.absentCost;
    });
    setBatchPenaltyInfo(Object.values(penaltyInfoMap));
  }, [penaltyInfo]);

  // 미정산 총 금액 계산
  useEffect(() => {
    if (!penaltyInfo) return;
    const total =
      penaltyInfo.absentMembers.length * penaltyInfo.absentCost +
      penaltyInfo.lateMembers.length * penaltyInfo.lateCost;
    setTotalCost(total);
  }, [penaltyInfo]);

  // 벌금 정산
  const requestSettle = useRequest<boolean>(batchSettle);
  const settleProc = useCallback((penalties: number[]) => {
    requestSettle(penalties)
      .then(() => {
        mutatePenaltyInfo();
        mutateData();
        toast.success('정산 되었습니다.');
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

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
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div>
              정산 완료 날짜
              <div>
                <DatePicker
                  selectedDate={finishDate}
                  onChange={(date) => setFinishDate(date)}
                />
              </div>
            </div>
          </SelectDateForm>
          <div>
            <SubTitle>
              {startDateStr} ~ {finishDateStr}
              <div>기간 내 미정산된 금액만 조회됩니다.</div>
            </SubTitle>
            <SettleListWrapper>
              <div>
                {!isEmpty(batchPenaltyInfo) && !isEmpty(penaltyInfo) && (
                  <>
                    {batchPenaltyInfo.map((mem) => (
                      <BatchMemberItem
                        key={mem.name}
                        cost={mem.penaltyCost}
                        penaltyMember={{ name: mem.name }}
                        settle={() => {
                          settleProc(mem.penaltyIds);
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
              {/* 지각, 결석 멤버가 없는 경우 */}
              {isEmpty(penaltyInfo?.lateMembers) &&
              isEmpty(penaltyInfo?.absentMembers) ? (
                <NoSchedule>
                  <div>정산할 내역이 없습니다.</div>
                </NoSchedule>
              ) : (
                <TotalCostDiv>
                  <span>총 </span>
                  {costFormatter(totalCost)}
                </TotalCostDiv>
              )}
            </SettleListWrapper>
          </div>
        </ContentDiv>
      </Container>
    </Modal>
  );
}

export default BatchSettlePopup;
