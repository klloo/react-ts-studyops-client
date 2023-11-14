import styled from '@emotion/styled';
import theme from 'styles/theme';

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  & div {
    font-size: 14px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const StudyOutlineDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
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
`;

export const StudyTitle = styled.div`
  color: var(--color-gray1);
  font-size: 1.8rem;
  font-weight: 700;
  padding-right: 1.5rem;
  border-right: 1px solid var(--color-gray1);
  @media ${theme.device.phone} {
    border-right: none;
  }
`;

export const MemberInfoDiv = styled.div`
  display: flex;
  align-items: center;
  > span {
    padding: 0 0.62rem;
    font-weight: 400;
    > span {
      font-weight: 700;
    }
  }
`;

export const DescriptionDiv = styled.div`
  color: var(--color-gray2);
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 1.44rem;
`;

export const StartDateDiv = styled.div`
  flex-grow: 1;
  text-align: end;
  color: var(--color-gray2);
  font-weight: 500;
`;
