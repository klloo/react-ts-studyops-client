import styled from '@emotion/styled';
import { ImageProps } from 'types/styleProps';

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--color-gray1);
  font-size: 1.125rem;
  font-weight: 700;
  background-color: var(--color-gray4);
  width: 70%;
  height: 1.2rem;
`;

export const Description = styled.div<ImageProps>`
  width: 100%;
  word-break: keep-all;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: var(--color-gray2);
  font-size: 0.875rem;
  font-weight: 500;
  background-color: var(--color-gray4);
  width: 90%;
  height: 0.875rem;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const Tag = styled.div`
  border-radius: 3.125rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.19rem 0.7rem;
  font-size: 0.875rem;
  font-weight: 600;
  width: 20%;
  height: 0.875rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
`;

export const HeaderDiv = styled.div`
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-gray3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 50%;
    height: 1rem;
    background-color: var(--color-gray4);
  }
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 0.5rem;
  color: #000;
  font-size: 0.875rem;
  font-weight: 400;
  background-color: var(--color-gray4);
  width: 90%;
  height: 0.875rem;
`;
