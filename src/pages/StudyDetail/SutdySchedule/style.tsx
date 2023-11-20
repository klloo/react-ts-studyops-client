import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

export const TitleDiv = styled.div`
  font-weight: 700;
`;

export const NoSchedule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-gray2);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.7rem;
`;

export const VoteWrapper = styled.div`
  display: flex;
  gap: 1.87rem;
  color: var(--color-gray1);
  font-size: 0.925rem;
  font-weight: 500;
  align-items: center;
`;

export const AttendanceList = styled.div`
  color: var(--color-gray1);
  font-size: 0.925rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      gap: 0.38rem;
    }
    > span {
      color: var(--color-gray2);
      font-weight: 400;
    }
  }
`;
