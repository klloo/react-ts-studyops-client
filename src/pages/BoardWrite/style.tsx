import styled from '@emotion/styled';

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

export const ErrorMsg = styled.div`
  color: var(--color-red);
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export const FileListWrapper = styled.div`
  border: 1px solid var(--color-gray3);
  height: auto;
  color: #7d7d7d;
  font-size: 0.8rem;
  font-weight: 400;
`;

export const AttachButton = styled.div`
  color: var(--color-gray2);
  text-align: center;
  font-weight: 400;
  display: flex;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  background: var(--color-gray4);
  cursor: pointer;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -1rem;
  > span {
    color: var(--color-gray2);
    font-size: 0.8rem;
    font-weight: 400;
  }
`;

export const FileListTitle = styled.div`
  border-bottom: 0.0625rem solid #ddd;
  padding: 0.7rem 1rem;
  > div {
    display: flex;
    gap: 0.62rem;
    & span {
      cursor: pointer;
    }
  }
`;

export const FileListContent = styled.div`
  padding: 0.7rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  > div {
    display: flex;
    justify-content: space-between;
    > div {
      > span {
        cursor: pointer;
      }
      display: flex;
      gap: 0.62rem;
    }
  }
`;

export const Button = styled.button<{ yesButton?: boolean }>`
  width: 6rem;
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
  background-color: ${(props) =>
    props.yesButton ? 'var(--color-primary)' : '#fff'};
  color: ${(props) => (props.yesButton ? 'white' : 'var(--color-gray1)')};
  ${(props) => !props.yesButton && 'border: 1px solid var(--color-gray3);'}
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
