import styled from '@emotion/styled';

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

export const UserNickNameDiv = styled.div`
  width: 3rem;
  height: 1rem;
  background-color: var(--color-gray4);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;
