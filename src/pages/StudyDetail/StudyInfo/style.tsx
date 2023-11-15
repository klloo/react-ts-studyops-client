import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const TitleDiv = styled.div`
  > span {
    color: var(--color-gray2);
    padding-top: 0.3rem;
  }
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ContentDiv = styled.div`
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1.7rem;
  word-break: keep-all;
  white-space: pre-line;
  line-height: 1.5;
  & span {
    font-weight: 700;
  }
`;
