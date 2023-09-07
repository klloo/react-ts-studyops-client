import React from 'react';
import {
  Card,
  Title,
  Description,
  Info,
  InfoItem,
  Icon,
  ButtonWrapper,
  Button,
} from './style';
import { BsCalendar, BsCreditCard, BsPeopleFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
// import { BiSolidCrown } from 'react-icons/bi';

/**
 * 참여중인 스터디 카드
 */
function StudyCard({ isInvite }: { isInvite?: boolean }) {
  return (
    <Card isInvite={isInvite}>
      <Title>
        <h2>알고리즘 스터디</h2>
        <div>{/* <BiSolidCrown /> */}</div>
      </Title>
      <Description>
        <div>
          알고리즘 실력 향상을 위한 스터디 입니다. 하루에 한 문제씩 풀도록
          합시다.
        </div>
      </Description>
      <Info>
        <InfoItem>
          <Icon>
            <BsCalendar />
          </Icon>
          <div>
            2023.08.23
            <b> D+12</b>
          </div>
        </InfoItem>
        <InfoItem>
          <Icon>
            <AiOutlineClockCircle />
          </Icon>
          <div>
            <b> 주 4회 </b>
            진행
          </div>
        </InfoItem>
        <InfoItem>
          <Icon>
            <BsCreditCard />
          </Icon>
          <div>
            지각비
            <b> 5,000원</b>
          </div>
        </InfoItem>
        <InfoItem>
          <Icon>
            <BsPeopleFill />
          </Icon>
          <div>
            이찬희 외<b> 5명</b>이 참여중이에요
          </div>
        </InfoItem>
      </Info>
      {isInvite && (
        <ButtonWrapper>
          <Button yesButton>가입</Button>
          <Button>거절</Button>
        </ButtonWrapper>
      )}
    </Card>
  );
}

export default StudyCard;
