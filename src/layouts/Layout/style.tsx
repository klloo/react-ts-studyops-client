import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  padding: 15px 20px 15px 20px;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 999;
`;

export const Content = styled.div`
  max-width: var(--width-maxwidth);
  width: 100%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 20px 100px 20px;
  box-sizing: border-box;
  overflow: scroll;
`;
