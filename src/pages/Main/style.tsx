import styled from '@emotion/styled';
import { PiPlusCircleThin } from 'react-icons/pi';

export const Title = styled.div`
  font-weight: bold;
  font-size: var(--fontsize-title);
  display: flex;
  align-items: center;
`;

export const CardWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  width: calc(45% - 10px);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PlusButton = styled(PiPlusCircleThin)`
  cursor: pointer;
  color: #888888;
`;
