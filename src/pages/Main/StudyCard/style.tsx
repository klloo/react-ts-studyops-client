import styled from '@emotion/styled';
import { ImageProps } from 'types/styleProps';

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--color-gray1);
  font-size: 1.125rem;
  font-weight: 700;
  & div {
    display: flex;
    align-items: center;
  }
`;

export const StartDate = styled.div`
  color: var(--color-gray2);
  & span {
    font-weight: normal;
  }
`;

export const Description = styled.div<ImageProps>`
  width: 100%;
  word-break: keep-all;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: var(--color-gray2);
  font-size: 0.875rem;
  font-weight: 500;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const Tag = styled.div`
  border-radius: 3.125rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.19rem 0.7rem;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
`;

export const HeaderDiv = styled.div`
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-gray3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    > span {
      padding: 0 0.38rem;
      color: var(--color-gray2);
      font-size: 0.875rem;
      font-weight: 500;
    }
  }
  > div {
    & :first-of-type {
      padding-left: 0;
      border-right: 0.5px solid var(--color-gray2);
    }
  }
`;

export const DdayTag = styled.div<{ isMinus?: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 1.25rem;
  border: 1px solid #ff971d;
  display: inline-flex;
  padding: 0.125rem 0.5rem;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.isMinus ? 'white' : '#ff971d')};
  background-color: ${(props) => (props.isMinus ? '#ff971d' : 'white')};
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 0.5rem;
  color: #000;
  font-size: 0.875rem;
  font-weight: 400;
  & b {
    font-weight: 700;
  }
`;

export const Icon = styled.div`
  color: var(--color-gray2);
  /* padding-top: 2px; */
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.37rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-gray3);
`;
