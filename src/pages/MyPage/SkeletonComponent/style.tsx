import styled from '@emotion/styled';
import theme from 'styles/theme';

export const TitleDiv = styled.div`
  font-weight: bold;
  font-size: var(--fontsize-title);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
`;

export const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  @media ${theme.device.tablet} {
    width: 80%;
  }
  @media ${theme.device.phone} {
    width: 100%;
  }
`;

export const ContentDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid var(--color-gray2);
  border-radius: 0.1875rem;
  background-color: #fff;
  padding: 2rem 1.8rem;
`;

export const UserProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
  font-size: 1.1rem;
  gap: 1rem;
  padding-bottom: 1.5rem;
  padding: 2rem;
`;

export const UserDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0.5rem;
  > div {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.6rem;
    > div {
      width: 6rem;
      color: var(--color-gray1);
      font-size: 0.9rem;
      font-weight: 500;
      background-color: var(--color-gray4);
      height: 0.9rem;
    }
    > span {
      color: var(--color-gray1);
      font-size: 1rem;
      font-weight: 700;
      width: 16rem;
      background-color: var(--color-gray4);
      height: 0.9rem;
    }
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--color-gray4);
  width: 10rem;
  height: 1rem;
`;
