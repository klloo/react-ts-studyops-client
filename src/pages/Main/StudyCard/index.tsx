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
  Button,
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

/**
 * 참여중인 스터디 카드
 */
function StudyCard({ isInvite, study }: { isInvite?: boolean; study: IStudy }) {
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
            <Button>거절</Button>
            <Button yesButton>수락</Button>
          </ButtonWrapper>
        )}
      </Container>
    </MainCard>
  );
}

export default StudyCard;
