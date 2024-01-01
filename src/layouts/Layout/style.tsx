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
  position: relative;
`;

export const Logo = styled.img`
  height: 1.5rem;
`;

export const UserInfoBox = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100vh;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  > div {
    position: absolute;
    border: 0.5px solid var(--color-gray2);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 5rem;
    right: 0.5rem;
    top: 4rem;
    padding: 0.5rem 1rem;
    gap: 0.7rem;
    font-size: 0.9rem;
    font-weight: 300;
    cursor: pointer !important;
    background-color: #fff;
    z-index: 1022;
  }
`;
