import styled from '@emotion/styled';

const ScheduleDot = styled.div<{ color: string }>`
  width: 7px;
  height: 7px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;

export default ScheduleDot;
