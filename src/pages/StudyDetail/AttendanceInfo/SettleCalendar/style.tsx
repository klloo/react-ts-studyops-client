import styled from '@emotion/styled';
import theme from 'styles/theme';

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    color: var(--color-gray2);
    font-size: 0.775rem;
    font-weight: 400;
  }
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
  height: 100%;
  > div {
    display: flex;
    flex-direction: column;
    @media ${theme.device.phone} {
      row-gap: 1rem;
    }
  }
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

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const SettleButton = styled.div`
  display: flex;
  padding: 0.6875rem 1.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  background: var(--color-primary);
  color: #fff;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
`;
