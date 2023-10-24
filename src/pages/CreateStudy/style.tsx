import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

export const TitleDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
`;

export const CreateForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 38rem;
  max-width: 100%;
`;

export const FormItemDiv = styled.div<{
  emptyLabel?: boolean;
  error?: boolean;
}>`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    flex-direction: column;
  }
  > label {
    width: 8rem;
    color: var(--gray1, #333);
    font-size: 0.875rem;
    font-weight: 700;
    padding: 0.87rem 0;
    @media ${theme.device.tablet}, ${theme.device.phone} {
      ${(props) => props.emptyLabel && 'display:none;'}
    }
  }
  > input {
    flex-grow: 1;
    background-color: #fff;
    border: solid 1px ${(props) => (props.error ? '#f33535' : '#ddd')};
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    &::placeholder {
      color: var(--gray2, #8c8c8c);
      font-size: 0.875rem;
    }
  }
  > textarea {
    flex-grow: 1;
    background-color: #fff;
    border: solid 1px ${(props) => (props.error ? '#f33535' : '#ddd')};
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    &::placeholder {
      color: var(--gray2, #8c8c8c);
      font-size: 0.875rem;
    }
    resize: none;
    min-height: 6rem;
  }
`;

export const DaysWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  gap: 1.31rem;
  flex-wrap: wrap;
`;

export const DayDiv = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  display: flex;
  padding: 0.875rem 1rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 3.125rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.selected ? '500' : '400')};
  background: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'var(--gray4, #F4F4F4)'};
  color: ${(props) => (props.selected ? '#FFFFFF' : 'var(--gray2, #8c8c8c)')};
`;

export const CostWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.94rem;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    flex-direction: column;
    align-items: start;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    > label {
      font-size: 0.875rem;
      font-weight: 400;
    }
  }
`;

export const Button = styled.button`
  width: 24rem;
  max-width: 100%;
  display: inline-flex;
  padding: 1rem;
  justify-content: center;
  font-size: 0.875rem;
  align-items: center;
  border: none;
  border-radius: 0.1875rem;
  font-weight: 500;
  cursor: pointer;
  background-color: var(--color-primary);
  color: #fff;
`;

export const NameTagWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 80%;
`;

export const NameTagDiv = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 400;
  background: var(--gray4, #f4f4f4);
  color: var(--gray2, #8c8c8c);
  display: flex;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
  align-items: center;
  gap: 0.5rem;
  > div {
    cursor: pointer;
    font-size: 0.8rem;
  }
`;

export const ScheduleTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ScheduleTimeDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  > div {
    color: var(--gray1, #333);
    font-size: 0.875rem;
    font-weight: 400;
  }
`;
