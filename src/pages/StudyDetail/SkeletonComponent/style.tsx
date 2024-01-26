import styled from '@emotion/styled';
import theme from 'styles/theme';

export const StudyOutlineDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  @media ${theme.device.phone} {
    gap: 0.5rem;
    row-gap: 1.5rem;
  }
`;

export const DdayTag = styled.div`
  display: inline-flex;
  padding: 0.5rem 1.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 3.125rem;
  background: #eee3ff;
  color: var(--color-primary);
  font-size: 0.9375rem;
  font-weight: 600;
  height: 1rem;
  width: 1rem;
`;

export const StudyTitle = styled.div`
  color: var(--color-gray1);
  font-size: 1.8rem;
  font-weight: 700;
  padding-right: 1.5rem;
  background-color: var(--color-gray4);
  width: 30%;
  height: 1.8rem;
  @media ${theme.device.phone} {
    border-right: none;
    width: 100%;
  }
`;

export const MemberInfoDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const DescriptionDiv = styled.div`
  color: var(--color-gray2);
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1.44rem;
  background-color: var(--color-gray4);
  width: 50%;
  height: 1.2rem;
`;
