import React, { useCallback } from 'react';
import {
  Container,
  HeaderDiv,
  DdayTag,
  Title,
  Description,
  InfoItem,
  Icon,
  ButtonWrapper,
  TagWrapper,
  Tag,
  ContentDiv,
} from './style';
import { BsPeopleFill } from 'react-icons/bs';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { IStudy } from 'types/db';
import { costFormatter } from 'utils/formatter';
import useRequest from 'hooks/useRequest';
import { acceptAsk, rejectAsk } from 'api/ask';
import { Button } from 'components/Button';
import { toast } from 'react-toastify';
import { calcDiffDays } from 'utils/schedule';

/**
 * 참여중인 스터디 카드
 */
function StudyCard({
  isInvite,
  study,
  loadData,
}: {
  isInvite?: boolean;
  study: IStudy;
  loadData?: () => void;
}) {
  const link: string | null = isInvite ? null : `/group/${study.groupId}`;

  // 초대 거절 함수
  const requestReject = useRequest<boolean>(rejectAsk);
  const rejectProc = useCallback(() => {
    requestReject(study.groupId)
      .then((res) => {
        if (res) {
          toast.success('초대를 거절하였습니다.');
          if (loadData) loadData();
        }
      })
      .catch(() => {});
  }, []);
  // 초대 수락 함수
  const requestAccept = useRequest<boolean>(acceptAsk);
  const acceptProc = useCallback(() => {
    requestAccept(study.groupId)
      .then((res) => {
        if (res) {
          toast.success('초대를 수락하였습니다.');
          if (loadData) loadData();
        }
      })
      .catch(() => {});
  }, []);

  return (
    <MainCard clickable={!isInvite} link={link}>
      <Container>
        <HeaderDiv>
          <div>
            <span>시작일</span>
            <span>{dayjs(study.startDate).format('YYYY.MM.DD')}</span>
          </div>
          <DdayTag>{calcDiffDays(study.startDate)}</DdayTag>
        </HeaderDiv>
        <ContentDiv>
          <Title>
            {study.name}
            {study.host && (
              <div>
                <img src={`${process.env.PUBLIC_URL}/crown.svg`} alt="icon" />
              </div>
            )}
          </Title>
          <Description>{study.intro}</Description>
          <TagWrapper>
            <Tag>주 {study.schedules.length}회 진행</Tag>
            <Tag>
              불참비{' '}
              {study.absenceCost == 0
                ? '없음'
                : `${costFormatter(study.absenceCost)}원`}
            </Tag>
            <Tag>
              지각비{' '}
              {study.lateCost == 0
                ? '없음'
                : `${costFormatter(study.lateCost)}원`}
            </Tag>
          </TagWrapper>
        </ContentDiv>
        <InfoItem>
          <Icon>
            <BsPeopleFill />
          </Icon>
          {isInvite ? (
            <span>
              <b>{study.headCount}명</b> 모집
            </span>
          ) : (
            <span>
              {study.hostName} 외 <b>{study.headCount - 1}명</b> 참여 중
            </span>
          )}
        </InfoItem>
        {isInvite && (
          <ButtonWrapper>
            <Button onClick={rejectProc} width="50%">
              거절
            </Button>
            <Button yesButton width="50%" onClick={acceptProc}>
              수락
            </Button>
          </ButtonWrapper>
        )}
      </Container>
    </MainCard>
  );
}

export default StudyCard;
