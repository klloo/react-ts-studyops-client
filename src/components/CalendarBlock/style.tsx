import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  width: calc(50% - 1.5rem);
  padding: 1.8rem 0.8rem;
  border-radius: 0.1875rem;
  box-sizing: border-box;
  border: 1px solid var(--color-gray2);
  @media ${theme.device.phone}, ${theme.device.tablet} {
    width: 100%;
  }
`;

export const Card = styled.div`
  width: calc(50% - 1rem);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
  border-radius: 0.1875rem;
  border: 1px solid var(--color-gray2);
  @media ${theme.device.phone}, ${theme.device.tablet} {
    width: 100%;
  }
`;
