import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

export const TitleDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
`;

export const CreateForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 38rem;
  max-width: 100%;
`;

export const Button = styled.button`
  width: 24rem;
  max-width: 100%;
  display: inline-flex;
  padding: 1rem;
  justify-content: center;
  font-size: 0.875rem;
  align-items: center;
  border: none;
  border-radius: 0.1875rem;
  font-weight: 500;
  cursor: pointer;
  background-color: var(--color-primary);
  color: #fff;
`;

export const StudyInfoField = styled.div`
  margin-top: 0.7rem;
`;
