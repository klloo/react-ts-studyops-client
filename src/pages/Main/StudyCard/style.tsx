import styled from '@emotion/styled';
import { ImageProps } from 'types/styleProps';

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

export const StartDate = styled.div`
  color: var(--color-textgrey);
  & span {
    font-weight: normal;
  }
`;

export const Description = styled.div<ImageProps>`
  width: 100%;
  font-weight: bold;
  background-color: transparent;
  word-break: keep-all;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  & b {
    font-weight: bold;
  }
`;

export const Icon = styled.div`
  color: var(--color-textlight);
  padding-top: 2px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button<{ yesButton?: boolean }>`
  width: 50%;
  padding: 10px 0 10px 0;
  border: none;
  font-weight: ${(props) => (props.yesButton ? 'bold' : '')};
  cursor: pointer;
  border-radius: 7px;
  background-color: ${(props) =>
    props.yesButton ? 'var(--color-primary)' : ''};
  color: ${(props) => (props.yesButton ? 'white' : '')};
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 17px;
`;

export const Tag = styled.div`
  font-size: 14px;
  font-weight: bold;
  border-radius: 50px;
  background: var(--color-primarylight);
  color: var(--color-primary);
  padding: 3px 13px;
`;
