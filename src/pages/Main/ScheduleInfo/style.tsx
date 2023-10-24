import styled from '@emotion/styled';

export const Title = styled.div`
  display: flex;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.7rem;
`;

export const NoSchedule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-gray2);
`;

export const Schedule = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.875rem;
  .time {
    color: var(--color-gray2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400;
  }
  .title {
    color: var(--color-gray1);
    font-size: 0.875rem;
    font-weight: 500;
  }
`;
