import styled from '@emotion/styled';

export const LegendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  font-size: 0.875rem;
  color: var(--color-gray2);
  padding-bottom: 2rem;
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const NoSchedule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--color-gray2);
`;

export const TitleDiv = styled.div`
  font-weight: 700;
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
  height: 100%;
`;

export const SettledNotSettledTotalDiv = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  border-top: 1px solid var(--color-gray4);
  border-bottom: 1px solid var(--color-gray4);
  box-sizing: border-box;
  > div {
    color: var(--color-gray1);
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      font-weight: 700;
    }
  }
`;

export const TotalCostDiv = styled.div`
  text-align: end;
  padding-top: 1.5rem;
  color: var(--color-primary);
  font-size: 1.7rem;
  font-weight: 700;
  > span {
    color: var(--color-gray1);
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }
`;
