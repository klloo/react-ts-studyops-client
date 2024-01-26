import styled from '@emotion/styled';

export const Container = styled.div`
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
