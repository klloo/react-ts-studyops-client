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
import { BiSolidCrown } from 'react-icons/bi';
import { IStudy } from 'types/db';
import { costFormatter } from 'utils/formatter';
import useRequest from 'hooks/useRequest';
import { acceptAsk, rejectAsk } from 'api/ask';
import { Button } from 'components/Button';

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
  const link: string | null = isInvite ? null : '/study/1';

  // 시작일로부터 얼마나 지났는지 구하는 함수
  const calcDiffDays = useCallback((targetDate: string) => {
    const today = dayjs();
    const target = dayjs(targetDate);
    const differenceInDays = target.diff(today, 'day');
    if (differenceInDays == 0) {
      return 'D-day';
    }
    if (differenceInDays > 0) {
      return `+${differenceInDays}`;
    }
    return `${differenceInDays}`;
  }, []);

  // 초대 거절 함수
  const requestReject = useRequest(rejectAsk);
  const rejectProc = useCallback(() => {
    requestReject(study.groupId, 4)
      .then(() => {
        console.log('초대를 거절');
        if (loadData) loadData();
      })
      .catch(() => {});
  }, []);
  // 초대 수락 함수
  const requestAccept = useRequest(acceptAsk);
  const acceptProc = useCallback(() => {
    requestAccept(study.groupId, 4)
      .then(() => {
        console.log('초대를 수락');
        if (loadData) loadData();
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
          <DdayTag>D{calcDiffDays(study.startDate)}</DdayTag>
        </HeaderDiv>
        <ContentDiv>
          <Title>
            {study.name}
            {study.hostStatus && (
              <div>
                <BiSolidCrown />
              </div>
            )}
          </Title>
          <Description>{study.intro}</Description>
          <TagWrapper>
            <Tag>주 {study.schedules.length}회 진행</Tag>
            {study.absenceCost != 0 && (
              <Tag>불참비 {costFormatter(study.absenceCost)}원</Tag>
            )}
            {study.lateCost != 0 && (
              <Tag>지각비 {costFormatter(study.lateCost)}원</Tag>
            )}
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
              이찬희 외 <b>{study.headCount - 1}명</b> 참여 중
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
