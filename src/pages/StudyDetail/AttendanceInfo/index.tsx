/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import {
  AccountInfo,
  ContentDiv,
  InfoText,
  SetAccountButton,
  TotalFineInfo,
  NoAccoutText,
} from './style';
import { ContentTitle } from '../style';
import { MdCreditCard } from 'react-icons/md';
import useSWR from 'swr';
import Highcharts from 'highcharts';
import { FaPen } from 'react-icons/fa';
import accessibility from 'highcharts/modules/accessibility';
import { IFineTotal } from 'types/db';
import fetcher from 'utils/fetcher';
import { costFormatter } from 'utils/formatter';
import SetAccountPopup from './SetAccountPopup';
import Statistics from './Statistics';
import useRequest from 'hooks/useRequest';
import { modifyAccount } from 'api/group';
import { toast } from 'react-toastify';

accessibility(Highcharts);

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
  const { data: fineInfo, mutate } = useSWR<IFineTotal>(
    `/penalty/${groupId}`,
    fetcher,
  );

  const requestModify = useRequest<boolean>(modifyAccount);
  const modifyAccountProc = useCallback((accout: string) => {
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

  return (
    <div>
      <ContentTitle>
        <span>
          <MdCreditCard size="24" />
        </span>
        벌금 현황
      </ContentTitle>
      <ContentDiv>
        {fineInfo && (
          <>
            <div>
              {fineInfo.account ? (
                <AccountInfo>
                  납부계좌
                  <div>
                    <span>
                      {fineInfo.account.split(',').map((item) => `${item} `)}
                    </span>
                    {isHost && (
                      <FaPen
                        size="13"
                        onClick={() => {
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

              <TotalFineInfo>
                <span>총</span> {costFormatter(fineInfo.totalFine)}
              </TotalFineInfo>
            </div>
            <InfoText>납부된 벌금의 누적합으로 계산된 그래프입니다.</InfoText>
            <Statistics fineInfo={fineInfo} />
          </>
        )}
      </ContentDiv>
      <SetAccountPopup
        show={showAccountSettigPopup}
        onClose={onClosePopup}
        modifyAccount={modifyAccountProc}
        originAccount={fineInfo?.account || null}
      />
    </div>
  );
}

export default AttendanceInfo;
