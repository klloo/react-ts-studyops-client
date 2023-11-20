import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
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
