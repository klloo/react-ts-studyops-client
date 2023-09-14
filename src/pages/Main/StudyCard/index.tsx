import React from 'react';
import {
  Title,
  Description,
  InfoItem,
  Icon,
  ButtonWrapper,
  Button,
  StartDate,
  TagWrapper,
  Tag,
} from './style';
import { BsPeopleFill } from 'react-icons/bs';
import MainCard from 'components/MainCard';
// import { BiSolidCrown } from 'react-icons/bi';

/**
 * 참여중인 스터디 카드
 */
function StudyCard({ isInvite }: { isInvite?: boolean }) {
  const link: string | null = isInvite ? null : '/study/1';
  return (
    <MainCard clickable={!isInvite} link={link}>
      <Title>
        <h2>알고리즘 스터디</h2>
        <div>{/* <BiSolidCrown /> */}</div>
      </Title>
      <Description>
        <StartDate>
          시작일 (D+12)
          <span> 2023.08.23</span>
        </StartDate>
        <div>
          알고리즘 실력 향상을 위한 스터디 입니다. 하루에 한 문제씩 풀도록
          합시다.
        </div>
        <TagWrapper>
          <Tag>주 4회 진행</Tag>
          <Tag>벌금 5,000원</Tag>
        </TagWrapper>
      </Description>
      <InfoItem>
        <Icon>
          <BsPeopleFill />
        </Icon>
        <div>
          이찬희 외<b> 5명</b> 참여중
        </div>
      </InfoItem>
      {isInvite && (
        <ButtonWrapper>
          <Button yesButton>가입</Button>
          <Button>거절</Button>
        </ButtonWrapper>
      )}
    </MainCard>
  );
}

export default StudyCard;
