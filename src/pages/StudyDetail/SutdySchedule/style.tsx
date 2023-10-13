import styled from '@emotion/styled';
import { CommonProfileImage } from 'styles/commonStyle';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  & h2 {
    font-weight: bold;
    font-size: 20px;
  }
  & div {
    display: flex;
    align-items: center;
    color: var(--color-crown);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const NoSchedule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-textgrey);
  margin-top: 20%;
`;

export const Schedule = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  .time {
    color: var(--color-textmoregrey);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .title {
    font-weight: bold;
  }
`;

export const ProfileImage = styled(CommonProfileImage)`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    font-size: 20px;
    font-weight: bold;
    z-index: 1000;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
  }
`;
