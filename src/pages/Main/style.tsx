import styled from '@emotion/styled';

export const Title = styled.div`
  font-weight: bold;
  font-size: var(--fontsize-title);
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ScheduleWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 40px;
`;

export const CardWrapper = styled.div`
  margin: 15px 0 50px 0;
  display: flex;
  gap: 20px;
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
