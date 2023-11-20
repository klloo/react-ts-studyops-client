import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  flex-wrap: wrap;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  > div {
    color: var(--color-gray1);
    font-size: 0.95rem;
    font-weight: 700;
  }
  > span {
    color: var(--color-gray2);
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: 0.5rem;
    @media ${theme.device.phone} {
      margin-left: 0;
    }
  }
`;

export const CostWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
`;

export const SettleButton = styled.div`
  display: inline-flex;
  padding: 0.35rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  background: var(--color-primary);
  color: #fff;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
`;
