import styled from '@emotion/styled';

export const Title = styled.div`
  font-weight: bold;
  font-size: var(--fontsize-title);
  display: flex;
  justify-content: space-between;
`;

export const ExitButton = styled.div`
  background-color: var(--color-cancel);
  border-radius: 50px;
  padding: 1px 15px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: normal;
  color: var(--color-textmoregrey);
`;

export const Tag = styled.div`
  font-size: 14px;
  border-radius: 50px;
  background: var(--color-primarylight);
  color: var(--color-primary);
  padding: 3px 8px;
  width: 125px;
  text-align: center;
  & span {
    font-weight: bold;
  }
`;

export const StudySummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  & div {
    font-size: 14px;
  }
`;

export const AddUserButton = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-cancel);
  cursor: pointer;
  color: var(--color-textmoregrey);
`;

export const AttendanceCard = styled.div<{ clickable?: boolean }>`
  padding: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
  flex-wrap: wrap;
  & div {
    & span {
      font-weight: bold;
      margin: 0 10px 0 10px;
    }
  }
`;

export const AttendanceButton = styled.div`
  border-radius: 6px;
  background-color: var(--color-primary);
  padding: 5px 15px;
  color: white;
  cursor: pointer;
`;

export const StudyDetailContainer = styled.div`
  margin-top: 30px;
  position: relative;
  scroll-margin-top: 80px;
`;

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: sticky;
  top: -20px;
  background-color: var(--color-background);
  padding-bottom: 20px;
  padding-top: 20px;
  flex-wrap: wrap;
  z-index: 999;
`;

export const Tab = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'var(--color-cancel)'};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border-radius: 50px;
  padding: 10px 25px;
  display: flex;
  cursor: pointer;
`;

export const TabContent = styled.div`
  /* height: 100vh; */
  margin-top: 10px;
`;

export const BoldText = styled.div`
  font-weight: bold;
`;
