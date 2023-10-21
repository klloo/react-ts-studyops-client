import styled from '@emotion/styled';

export const Title = styled.div`
  font-weight: bold;
  font-size: var(--fontsize-title);
  display: flex;
  align-items: center;
`;

export const CardWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const NewTag = styled.div`
  background-color: var(--color-red);
  border-radius: 50px;
  color: white;
  font-weight: normal;
  font-size: 15px;
  padding: 2px 15px;
`;

export const CalendarWrapper = styled.div`
  width: calc(45% - 10px);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
