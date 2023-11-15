import styled from '@emotion/styled';

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
`;

export const InfoText = styled.div`
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.8rem;
`;

export const TotalFineInfo = styled.div`
  color: #000;
  font-size: 1.65rem;
  font-weight: 700;
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  > span {
    color: #000;
    font-size: 1.125rem;
    font-weight: 500;
  }
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
