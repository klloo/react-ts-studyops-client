import styled from '@emotion/styled';

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;
  border-bottom: 1px solid var(--color-background);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const Content = styled.div`
  max-width: var(--width-maxwidth);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100vh;
  padding: 20px 20px 100px 20px;
  box-sizing: border-box;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  max-width: var(--width-maxwidth);
  margin-left: auto;
  margin-right: auto;
`;

export const Logo = styled.img`
  height: 28px;
`;
