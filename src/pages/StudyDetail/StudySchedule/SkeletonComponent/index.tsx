import {
  VoteWrapper,
  AttendanceList,
  UserNickNameDiv,
  Container,
} from './style';
import CustomSwitch from 'components/CustomSwitch';
import ProfileImage from 'components/ProfileImage';
import gravatar from 'gravatar';

/**
 * 스터디 상세화면의 일정 탭 내용
 */
function SkeletonComponent() {
  return (
    <Container>
      <VoteWrapper>
        나의 참석 여부
        <CustomSwitch checked={true} onChange={() => {}} />
      </VoteWrapper>
      <AttendanceList>
        참석인원
        <div>
          {[0, 1, 2].map((num) => (
            <div key={num}>
              <ProfileImage
                size={40}
                url={gravatar.url('default-profile', {
                  s: `65px`,
                  d: 'mm',
                })}
              />
              <UserNickNameDiv />
            </div>
          ))}
        </div>
      </AttendanceList>
      <AttendanceList>
        불참인원
        <div>
          {[0, 1, 2].map((num) => (
            <div key={num}>
              <ProfileImage
                size={40}
                url={gravatar.url('default-profile', {
                  s: `65px`,
                  d: 'mm',
                })}
              />
              <UserNickNameDiv />
            </div>
          ))}
        </div>
      </AttendanceList>
    </Container>
  );
}

export default SkeletonComponent;
