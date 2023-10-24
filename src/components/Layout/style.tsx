import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;
  border-bottom: 0.5px solid var(--color-gray2);
`;

export const HeaderSide = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const Content = styled.div`
  max-width: var(--width-maxwidth);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 3rem 1rem 8rem 1rem;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  max-width: var(--width-maxwidth);
  margin-left: auto;
  margin-right: auto;
`;

export const Logo = styled.img`
  height: 1.5rem;
`;
