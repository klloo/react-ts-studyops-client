import styled from '@emotion/styled';

export const Container = styled.div<{ error?: boolean }>`
  .react-datepicker-wrapper {
    display: block;
  }
  .datePicker {
    box-sizing: border-box;
    background-color: #fff;
    border: solid 1px
      ${(props) => (props.error ? 'var(--color-red)' : 'var(--color-gray3)')};
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    cursor: pointer;
    width: 100%;
    &::placeholder {
      color: var(--color-gray2);
      font-size: 0.875rem;
    }
  }
  .react-datepicker {
    border: solid 1px var(--color-gray3);
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
    border-bottom: solid 1px var(--color-gray3);
  }
  .selectedDay,
  .unselectedDay {
    border-radius: 50%;
    font-weight: 400;
    background-color: transparent;
  }
  .selectedDay {
    background-color: var(--color-primary);
    font-weight: 500;
    color: #fff;
  }
  .today {
    border-radius: 50%;
    background-color: var(--color-primary-light);
    color: #000;
    font-weight: 400;
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
