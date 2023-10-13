import styled from '@emotion/styled';

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 20px;

  .thisMonth {
    font-weight: 700;
    color: #292929;
    line-height: 24px;
  }
  button {
    width: 24px;
    margin: 0 8px;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const CalendarContent = styled.div`
  text-align: center;
  margin: 20px;
  font-weight: bold;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }
  .row.week {
    height: 18px;
    border-bottom: 1px solid #e8e8e8;
    font-weight: normal;
    color: var(--color-textgrey);
  }
  .text.sun {
    /* color: var(--color-red); */
  }
  .box.sun {
    /* color: var(--color-red); */
  }
  .box {
    width: 32px;
    height: 32px;
    margin: 15px 15px;
    font-size: 14px;
  }
  .text {
    position: static;
    width: 32px;
  }
  .holiday,
  .grayed {
    color: #484848;
    pointer-events: none;
  }
  .day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  .selected {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-primarylight);
    color: var(--color-primary);
  }
  .today {
    border-radius: 50%;
    font-weight: 500;
    background: var(--color-primary);
    color: #fff;
  }
  .none {
    display: none;
  }
`;

export const ScheduleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 32px;
  gap: 2px;
`;
