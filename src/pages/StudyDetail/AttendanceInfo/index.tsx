import React, { useCallback, useEffect, useState } from 'react';
import {
  AccountInfo,
  ContentDiv,
  InfoText,
  SetAccountButton,
  TotalPenaltyInfo,
  NoAccoutText,
  CalendarWrapper,
  NotSettledWrapper,
  ProfileWrapper,
  NotSettledInfoButton,
  FlexWrapper,
  TopWrapper,
  ButtonWrapper,
  GraphButton,
  ChartWrapper,
} from './style';
import { ContentTitle } from '../style';
import { MdCreditCard } from 'react-icons/md';
import useSWR from 'swr';
import { FaPen } from 'react-icons/fa';
import { IAttendanceInfo, IPenaltyTotal, IStudy } from 'types/db';
import fetcher from 'utils/fetcher';
import { costFormatter } from 'utils/formatter';
import SetAccountPopup from './SetAccountPopup';
import Charts from './Charts';
import useRequest from 'hooks/useRequest';
import { modifyAccount } from 'api/group';
import { toast } from 'react-toastify';
import SettleCalendar from './SettleCalendar';
import ProfileImage from 'components/ProfileImage';
import { GRAPH_MODE } from 'utils/constants';

function AttendanceInfo({
  groupId,
  isHost,
}: {
  groupId: number;
  isHost: boolean;
}) {
  const [showAccountSettigPopup, setShowAccountSettigPopup] = useState(false);
  const onClosePopup = useCallback(() => {
    setShowAccountSettigPopup(false);
  }, []);

  const { data: penaltyInfo, mutate } = useSWR<IPenaltyTotal>(
    `/penalty/${groupId}`,
    fetcher,
  );

  const { data: attendanceInfo } = useSWR<IAttendanceInfo[]>(
    `/penalty/counts/${groupId}`,
    fetcher,
  );

  // 그래프 유형
  const [graphMode, setGraphMode] = useState('');

  // 스터디 기본 정보
  const { data: studyInfo } = useSWR<IStudy>(`/info/${groupId}`, fetcher);
  // 벌금 정책 없는지 여부 설정
  const [noPenalty, setNoPenalty] = useState(false);
  useEffect(() => {
    if (!studyInfo) return;
    const noPenalty = studyInfo.absenceCost === 0 && studyInfo.lateCost === 0;
    if (noPenalty) setGraphMode(GRAPH_MODE.ATTENDANCE);
    else setGraphMode(GRAPH_MODE.PENALTY);
    setNoPenalty(noPenalty);
  }, [studyInfo]);

  // 미정산 전체 금액
  const [totalNotSettled, setTotalNotSettled] = useState(0);
  useEffect(() => {
    if (!penaltyInfo) return;
    const { notSettledPenalties } = penaltyInfo;
    const total = notSettledPenalties.reduce(
      (acc, cur) => acc + cur.penalty,
      0,
    );
    setTotalNotSettled(total);
  }, [penaltyInfo]);

  // 납부 계좌 정보 등록
  const requestModify = useRequest<boolean>(modifyAccount);
  const modifyAccountProc = useCallback((accout: string | null) => {
    requestModify(groupId, accout)
      .then(() => {
        onClosePopup();
        toast.success('납부 계좌 정보를 등록하였습니다.');
        mutate();
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // 납부 계좌 클릭 시 복사
  const copyClipBoard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('계좌번호가 복사되었습니다.');
    } catch {}
  }, []);

  return (
    <div>
      <ContentTitle>
        <span>
          <MdCreditCard size="24" />
        </span>
        {noPenalty ? '출결 현황' : '정산 현황'}
      </ContentTitle>
      <ContentDiv>
        {penaltyInfo && !noPenalty && (
          <span>
            {penaltyInfo.account ? (
              <AccountInfo
                onClick={() => {
                  if (!penaltyInfo || !penaltyInfo.account) return;
                  copyClipBoard(penaltyInfo.account.split(',')[1]);
                }}
              >
                납부계좌
                <div>
                  <span>
                    {penaltyInfo.account.split(',').map((item) => `${item} `)}
                  </span>
                  {isHost && (
                    <FaPen
                      size="13"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAccountSettigPopup(true);
                      }}
                    />
                  )}
                </div>
              </AccountInfo>
            ) : isHost ? (
              <SetAccountButton
                onClick={() => {
                  setShowAccountSettigPopup(true);
                }}
              >
                납부계좌 설정하기
              </SetAccountButton>
            ) : (
              <NoAccoutText>납부계좌가 설정되지 않았습니다.</NoAccoutText>
            )}
          </span>
        )}
        <FlexWrapper column={totalNotSettled <= 0}>
          <div>
            {!noPenalty && (
              <>
                <TopWrapper>
                  <ButtonWrapper>
                    <GraphButton
                      selected={graphMode === GRAPH_MODE.PENALTY}
                      onClick={() => {
                        setGraphMode(GRAPH_MODE.PENALTY);
                      }}
                    >
                      벌금
                    </GraphButton>
                    <GraphButton
                      selected={graphMode === GRAPH_MODE.ATTENDANCE}
                      onClick={() => {
                        setGraphMode(GRAPH_MODE.ATTENDANCE);
                      }}
                    >
                      출결
                    </GraphButton>
                  </ButtonWrapper>
                </TopWrapper>
                <InfoText>
                  {graphMode === GRAPH_MODE.PENALTY &&
                    '납부된 벌금의 누적합으로 계산된 그래프입니다.'}
                </InfoText>
              </>
            )}
            {attendanceInfo && penaltyInfo && (
              <ChartWrapper>
                <Charts
                  penaltyInfo={penaltyInfo}
                  attendanceInfo={attendanceInfo}
                  graphMode={graphMode}
                />
              </ChartWrapper>
            )}
          </div>
          {!noPenalty && (
            <div>
              <TotalPenaltyInfo>
                <span>총</span>{' '}
                {costFormatter(penaltyInfo ? penaltyInfo.totalFine : 0)}
              </TotalPenaltyInfo>
              {totalNotSettled > 0 && (
                <>
                  <NotSettledInfoButton>
                    아직 {costFormatter(totalNotSettled)}원이 정산되지 않았어요
                  </NotSettledInfoButton>
                  <NotSettledWrapper>
                    {penaltyInfo?.notSettledPenalties.map((item, i) => (
                      <div key={i}>
                        <ProfileWrapper>
                          <ProfileImage
                            width="35"
                            height="35"
                            url={item.profileImageUrl}
                          />
                          <div>{item.nickName}</div>
                        </ProfileWrapper>
                        <div>{costFormatter(item.penalty)}원</div>
                      </div>
                    ))}
                  </NotSettledWrapper>
                </>
              )}
            </div>
          )}
        </FlexWrapper>
        <CalendarWrapper>
          <SettleCalendar
            groupId={groupId}
            isHost={isHost}
            noPenalty={noPenalty}
          />
        </CalendarWrapper>
      </ContentDiv>
      <SetAccountPopup
        show={showAccountSettigPopup}
        onClose={onClosePopup}
        modifyAccount={modifyAccountProc}
        originAccount={penaltyInfo?.account || null}
      />
    </div>
  );
}

export default AttendanceInfo;
