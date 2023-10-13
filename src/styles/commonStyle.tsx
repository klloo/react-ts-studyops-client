import styled from '@emotion/styled';

export const CommonProfileImage = styled.div<{
  url: string;
  height: string;
  width: string;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: 50px;
  background-image: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const CommonBoldText = styled.div`
  font-weight: bold;
`;

export const CommonScheduleDot = styled.div<{ color: string }>`
  width: 7px;
  height: 7px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;

export const CommonFlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
