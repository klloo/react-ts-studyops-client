import styled from '@emotion/styled';

const ScheduleDot = styled.div<{ color: string }>`
  width: 0.4375rem;
  height: 0.4375rem;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

export default ScheduleDot;
