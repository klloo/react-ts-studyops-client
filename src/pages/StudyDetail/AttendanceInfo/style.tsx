import styled from '@emotion/styled';
import theme from 'styles/theme';

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoText = styled.div`
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 500;
`;

export const TotalPenaltyInfo = styled.div`
  color: #000;
  font-size: 1.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  > span {
    color: #000;
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

export const NotSettledInfoButton = styled.div`
  font-size: 1rem;
  color: var(--color-gray2);
  font-weight: 500;
  margin: 1.75rem 0 0.5rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
`;

export const AccountInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.38rem;
  padding: 0.8rem 1.5rem;
  border-radius: 0.1875rem;
  background: #eee3ff;
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  > div {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    > span {
      color: var(--color-gray1);
      font-size: 0.875rem;
      font-weight: 500;
    }
  }
`;

export const SetAccountButton = styled.div`
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-gray2);
  background-color: var(--color-gray4);
  padding: 0.2rem 0.7rem;
  border-radius: 5rem;
  display: inline;
`;

export const NoAccoutText = styled.div`
  color: var(--color-gray2);
  font-size: 0.875rem;
`;

export const CalendarWrapper = styled.div`
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid var(--color-gray4);
`;

export const SubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 1.5rem;
`;

export const NotSettledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  > div {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    @media ${theme.device.phone} {
      justify-content: space-between;
    }
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  > div {
    color: var(--color-gray1);
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const FlexWrapper = styled.div<{ column: boolean }>`
  display: flex;
  gap: 1rem;
  row-gap: 3rem;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  > :first-of-type {
    width: ${(props) => (props.column ? '100%' : '70%')};
    @media ${theme.device.phone},
      ${theme.device.tablet},
      ${theme.device.laptop} {
      width: 100%;
    }
  }
  > :last-child {
    width: ${(props) => (props.column ? '100%' : '25%')};
    @media ${theme.device.phone},
      ${theme.device.tablet},
      ${theme.device.laptop} {
      width: 100%;
    }
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap-reverse;
  padding: 1rem;
  gap: 1.5rem;
`;

export const ChartWrapper = styled.div`
  margin-top: 3rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const GraphButton = styled.div<{ selected?: boolean }>`
  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 4.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  ${(props) => props.selected && 'background: var(--color-gray4)'};
  color: ${(props) =>
    props.selected ? 'var(--color-gray1)' : 'var(--color-gray2)'};
  text-align: center;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  align-self: flex-end;
`;
