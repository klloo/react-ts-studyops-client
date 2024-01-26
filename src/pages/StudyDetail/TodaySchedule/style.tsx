import styled from '@emotion/styled';
import { MdCancel } from 'react-icons/md';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoWarning } from 'react-icons/io5';

export const Container = styled.div`
  border: 1px solid var(--color-gray3);
  background: #fff;
  padding: 3rem 1.6rem;
  box-sizing: border-box;
`;

export const TodayDate = styled.div`
  color: #000;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

export const TodayStudy = styled.div`
  color: #000;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  row-gap: 1rem;
  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    > span {
      color: #f00;
      font-weight: 500;
      font-size: 1rem;
    }
  }
  > button {
    cursor: pointer;
    border-radius: 0.1875rem;
    background: #8d4bf6;
    display: flex;
    padding: 0.9375rem 3.375rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    color: #fff;
    font-size: 1.1rem;
    text-align: center;
    font-weight: 600;
    border: none;
  }
`;

export const CancelIcon = styled(MdCancel)`
  color: #f00;
`;

export const CheckIcon = styled(IoMdCheckmarkCircle)`
  color: var(--color-primary);
`;

export const LateIcon = styled(IoWarning)`
  color: #f2e200;
`;

export const AttendacneInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  color: #000;
  font-size: 1.25rem;
  font-weight: 700;
`;
