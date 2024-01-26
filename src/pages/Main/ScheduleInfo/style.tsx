import styled from '@emotion/styled';

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
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
