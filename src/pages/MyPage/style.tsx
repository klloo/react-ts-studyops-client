import styled from '@emotion/styled';
import { FaPen } from 'react-icons/fa';
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

export const HeaderButton = styled.div<{ primary?: boolean }>`
  font-size: 0.85rem;
  display: inline;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 0.1875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background-color: ${(props) =>
    props.primary ? 'var(--color-primary)' : 'var(--color-gray3)'};
  color: ${(props) => (props.primary ? 'white' : 'var(--color-gray1)')};
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
    }
    > span {
      color: var(--color-gray1);
      font-size: 1rem;
      font-weight: 700;
    }
  }
`;

export const FormItem = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  > div {
    font-weight: 600;
  }
  > input {
    background-color: #fff;
    border: solid 1px var(--color-gray3);
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    font-size: 0.9rem;
    &::placeholder {
      color: var(--color-gray2);
      font-size: 0.875rem;
    }
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const ChangePasswordButton = styled.span`
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 0.1875rem;
  font-weight: 500;
  background-color: var(--color-primary);
  color: white;
  margin-left: 1rem;
`;

export const EditIcon = styled(FaPen)`
  color: var(--color-gray2);
  cursor: pointer;
`;

export const ProfileInputWrapper = styled.div`
  position: relative;
  > input {
    display: none;
  }
`;

export const ProfileInputButton = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #c6c6c6;
  bottom: 1px;
  right: 1px;
  cursor: pointer;
`;
