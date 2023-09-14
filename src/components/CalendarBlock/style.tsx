import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  width: calc(45% - 10px);
`;

export const Card = styled.div`
  width: calc(55%);
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  box-sizing: border-box;
`;
