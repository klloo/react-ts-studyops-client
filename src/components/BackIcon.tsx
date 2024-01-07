import styled from '@emotion/styled';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import React from 'react';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: -2rem;
  margin-top: -1rem;
  > span {
    cursor: pointer;
  }
`;

function BackIcon() {
  const navigate = useNavigate();
  return (
    <Container>
      <span>
        <IoArrowBack
          size="31"
          onClick={() => {
            navigate(-1);
          }}
        />
      </span>
    </Container>
  );
}

export default BackIcon;
