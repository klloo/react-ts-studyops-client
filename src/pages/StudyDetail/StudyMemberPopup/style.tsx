import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  max-width: 90%;
  border-radius: 0.1875rem;
  background: #fff;
  box-sizing: border-box;
  width: 20rem;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 70vh;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1.15rem;
  font-weight: 500;
  > div {
    color: var(--color-gray2);
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
  }
`;

export const ProfileWarpper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  > img {
    margin-left: -10px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  > input {
    flex-grow: 1;
    background-color: #fff;
    border: solid 1px var(--color-gray3);
    border-radius: 0.2rem;
    padding: 0.81rem 0.94rem;
    flex-grow: 1;
    &::placeholder {
      color: var(--color-gray2);
      font-size: 0.875rem;
    }
  }
  > button {
    width: 3rem;
    display: inline-flex;
    padding: 0.81rem 0.94rem;
    justify-content: center;
    font-size: 0.875rem;
    align-items: center;
    border: none;
    border-radius: 0.1875rem;
    font-weight: 500;
    cursor: pointer;
    background-color: var(--color-primary);
    color: white;
    box-sizing: border-box;
  }
`;

export const StatusDiv = styled.div`
  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 4.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  background: var(--color-gray4);
  color: var(--color-gray2);
  text-align: center;
  font-size: 0.875rem;
  font-weight: 400;
`;
