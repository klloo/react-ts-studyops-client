import styled from '@emotion/styled';

export const Container = styled.div`
  .datePicker {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    cursor: pointer;
    &::placeholder {
      color: var(--gray2, #8c8c8c);
      font-size: 0.875rem;
    }
  }
  .react-datepicker {
    border: solid 1px #ddd;
    border-radius: 0.2rem;
    padding: 0.5rem;
    .react-datepicker__day--outside-month {
      cursor: default;
      visibility: hidden;
    }
  }
  .react-datepicker__triangle {
    display: none;
  }
  .calenderWrapper {
    background-color: #fff;
  }
  .react-datepicker__header {
    background-color: #fff;
    border-bottom: solid 1px #ddd;
  }
  .selectedDay,
  .unselectedDay {
    border-radius: 50%;
    font-weight: 400;
  }
  .selectedDay {
    background-color: var(--color-primary);
    color: #fff;
    font-weight: 600;
  }
`;

export const CalendarHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem 0.5rem 1.5rem;
  box-sizing: border-box;
  & span {
    font-weight: 700;
    color: #292929;
  }
  & button {
    background: none;
    border: none;
    cursor: pointer;
    color: #373737;
  }
`;
