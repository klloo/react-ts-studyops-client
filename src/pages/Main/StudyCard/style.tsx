import styled from '@emotion/styled';

interface CardProps {
  isInvite?: boolean;
}

export const Card = styled.div<CardProps>`
  width: 24%;
  height: ${(props) => (props.isInvite ? '380px' : '350px')};
  /* border: 1px solid var(--color-border); */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  cursor: ${(props) => (props.isInvite ? '' : 'pointer')};
  gap: 15px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  :hover {
    transform: ${(props) =>
      props.isInvite ? '' : 'scale3d(1.01, 1.01, 1.01)'};
    box-shadow: ${(props) =>
      props.isInvite ? '' : '2px 4px 16px rgba(0, 0, 0, 0.16);'};
  }
`;

export const Title = styled.div`
  display: flex;
  padding: 15px 15px 0 15px;
  gap: 3px;
  & h2 {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

export const Description = styled.div`
  width: 100%;
  background-color: black;
  height: 120px;
  padding: 0 !important;
  background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
    url('https://source.unsplash.com/random');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  backdrop-filter: grayscale(0.5) opacity(0.8);
  & div {
    color: white;
    font-weight: bold;
    background-color: transparent;
    padding: 20px;
    word-break: keep-all;
  }
`;

export const Info = styled.div`
  margin-top: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px 0 15px;
  gap: 10px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 10px;
  & b {
    font-weight: bold;
  }
`;

export const Icon = styled.div`
  color: var(--color-textgrey);
  padding-top: 2px;
`;

export const ButtonWrapper = styled.div`
  padding: 0 15px 15px 15px;
  display: flex;
  gap: 10px;
`;

interface ButtonProps {
  yesButton?: boolean;
}

export const Button = styled.button<ButtonProps>`
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
