import styled from '@emotion/styled';

export const TitleDiv = styled.div`
  font-weight: bold;
  font-size: var(--fontsize-title);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  padding: 1.5rem 1rem;
`;

export const UserProfileInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-gray2);
`;

export const UserDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;
  > div {
    display: flex;
    gap: 1.5rem;
    font-weight: 600;
    > div {
      width: 4rem;
    }
    > span {
      font-weight: 300;
      color: #000;
    }
  }
`;

export const FormItem = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  position: relative;
  align-items: center;
  > div {
    font-weight: 600;
  }
  > input {
    flex-grow: 1;
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
`;

export const ChangePasswordButton = styled.span`
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 0.1875rem;
  font-weight: 500;
  background-color: var(--color-primary);
  color: white;
  margin-left: 0.5rem;
`;
