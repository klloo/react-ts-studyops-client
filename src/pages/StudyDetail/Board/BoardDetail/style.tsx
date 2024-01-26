import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  max-width: 80%;
  border-radius: 0.1875rem;
  background: #fff;
  box-sizing: border-box;
  width: 80rem;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 70vh;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 2rem;
  > div {
    color: var(--color-gray2);
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const PostTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  align-items: start;
  font-size: 1.5rem !important;
  color: #000 !important;
  font-weight: 500 !important;
  gap: 1rem;
  > div {
    font-size: 1rem !important;
    font-weight: 500 !important;
    color: var(--color-gray2);
  }
`;

export const UrlListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  > a {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: start;
    color: var(--color-gray2);
    text-decoration: underline;
    display: flex;
    gap: 0.2rem;
  }
`;

export const ContentDiv = styled.div`
  text-align: start;
  white-space: pre-line;
  height: 100%;
  overflow-y: auto;
`;

export const DeleteButton = styled.div`
  align-self: flex-end;
  display: flex;
  width: 4rem;
  height: 2.5rem;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  background: var(--color-gray4);
  font-size: 0.85rem;
  cursor: pointer;
`;
