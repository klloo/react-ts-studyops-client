import React from 'react';
import {
  Container,
  HeaderDiv,
  Title,
  Description,
  InfoItem,
  TagWrapper,
  Tag,
  ContentDiv,
} from './style';
import MainCard from 'components/MainCard';

/**
 * 참여중인 스터디 카드
 */
function SkeletonCard() {
  return (
    <MainCard clickable={false}>
      <Container>
        <HeaderDiv>
          <div />
        </HeaderDiv>
        <ContentDiv>
          <Title />
          <Description />
          <TagWrapper>
            <Tag />
            <Tag />
            <Tag />
          </TagWrapper>
        </ContentDiv>
        <InfoItem />
      </Container>
    </MainCard>
  );
}

export default SkeletonCard;
