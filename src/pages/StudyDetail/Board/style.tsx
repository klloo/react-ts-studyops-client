import styled from '@emotion/styled';
import theme from 'styles/theme';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const WriteButton = styled.div`
  color: var(--color-gray2);
  text-align: center;
  font-weight: 600;
  display: inline-flex;
  padding: 0.875rem 1.5rem;
  font-size: 0.9rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  background: var(--color-gray4);
  cursor: pointer;
`;

export const BoardTable = styled.table`
  border-top: 0.0625rem solid #000;
  border-bottom: 0.0625rem solid #000;
  border-collapse: collapse;
  width: 100%;
  /* 테이블 행 */
  & th {
    font-weight: 400;
    padding: 1.3rem 3rem;
    text-align: left;
    color: var(--color-gray1);
    font-size: 1rem;
    font-weight: 700;
    @media ${theme.device.phone} {
      padding: 1.3rem 0;
    }
  }
  /* 테이블 바디 */
  & tbody {
    & tr {
      cursor: pointer;
      text-align: left;
      & th {
        color: var(--color-gray1);
        font-size: 0.9rem;
        font-weight: 400;
      }
      border-bottom: 0.0625rem solid #ddd;
      &:first-of-type {
        border-top: 0.0625rem solid #ddd;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  /* 테이블 비율 */
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 70%;
  }
  & th:nth-of-type(3),
  & td:nth-of-type(3) {
    @media ${theme.device.phone} {
      display: none;
    }
  }
`;

export const NoContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: var(--color-gray2);
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;
