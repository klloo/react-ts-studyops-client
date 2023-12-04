import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
`;

export const CalendarHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  box-sizing: border-box;
  & span {
    font-weight: 700;
    color: #292929;
    cursor: pointer;
  }
  & button {
    background: none;
    border: none;
    cursor: pointer;
    color: #373737;
  }
`;

export const CalendarContentDiv = styled.div`
  display: flex;
  gap: 1rem;
  row-gap: 2rem;
  flex-direction: column;
`;

export const ScheduleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const WeekDiv = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  .selected {
    color: var(--color-primary);
    &::before {
      content: '';
      border-radius: 50%;
      background: var(--color-primary-light);
      position: absolute;
      top: -4px;
      width: 1.5rem;
      height: 1.5rem;
      z-index: -1;
    }
  }
  .today {
    font-weight: 500;
    color: #fff;
    &::before {
      content: '';
      border-radius: 50%;
      background: var(--color-primary);
      position: absolute;
      top: -4px;
      width: 1.5rem;
      height: 1.5rem;
      z-index: -1;
    }
  }
  .none {
    opacity: 0;
  }
`;

export const DateBoxDiv = styled.div`
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
`;

export const DayNumberDiv = styled.div<{
  sun?: boolean;
  day?: boolean;
  num?: boolean;
}>`
  ${(props) => (props.sun ? 'color: #FF0926;' : 'color: var(--color-gray2);')}
  ${(props) => !props.sun && props.num && 'color: var(--color-gray1);'}
  font-size: 0.875rem;
`;
