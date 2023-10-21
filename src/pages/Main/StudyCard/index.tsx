import React from 'react';
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

/**
 * 참여중인 스터디 카드
 */
function StudyCard({ isInvite }: { isInvite?: boolean }) {
  const link: string | null = isInvite ? null : '/study/1';
  return (
    <MainCard clickable={!isInvite} link={link}>
      <Container>
        <HeaderDiv>
          <div>
            <span>시작일</span>
            <span>{dayjs().format('YYYY.MM.DD')}</span>
          </div>
          <DdayTag>D+12</DdayTag>
        </HeaderDiv>
        <ContentDiv>
          <Title>
            알고리즘 스터디
            <div>
              <BiSolidCrown />
            </div>
          </Title>
          <Description>
            알고리즘 실력 향상을 위한 스터디 입니다. 하루에 한 문제씩 풀도록
            합시다.
          </Description>
          <TagWrapper>
            <Tag>주 4회 진행</Tag>
            <Tag>벌금 5,000원</Tag>
          </TagWrapper>
        </ContentDiv>
        <InfoItem>
          <Icon>
            <BsPeopleFill />
          </Icon>
          {isInvite ? (
            <span>
              <b>5명</b> 모집
            </span>
          ) : (
            <span>
              이찬희 외 <b>5명</b> 참여 중
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
