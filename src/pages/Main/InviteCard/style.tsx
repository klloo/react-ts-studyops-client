import styled from '@emotion/styled';
import { PiPlusCircleThin } from 'react-icons/pi';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 1.7rem;
  text-align: center;
  color: #000;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const PlusButton = styled(PiPlusCircleThin)`
  cursor: pointer;
  color: #888888;
`;
