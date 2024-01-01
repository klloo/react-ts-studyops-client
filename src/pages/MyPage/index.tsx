import ProfileImage from 'components/ProfileImage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// import useSWR from 'swr';
// import fetcher from 'utils/fetcher';
import {
  Container,
  TitleDiv,
  ContentDiv,
  UserProfileInfo,
  UserDetailInfo,
  FormItem,
  RowWrapper,
  HeaderButton,
  ChangePasswordButton,
  EditIcon,
  Layout,
} from './style';
import { CiCamera } from 'react-icons/ci';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';
import { ProfileInputButton, ProfileInputWrapper } from 'pages/Join/style';
import ChangePasswordPopup from './ChangePasswordPopup';
// import useRequest from 'hooks/useRequest';

function MyPage() {
  // const { data: loginUser, mutate: mutateLoginUser } = useSWR(
  //   '/member/inform',
  //   fetcher,
  // );
  // const { data: userInfo, mutate: mutateUserInfo } = useSWR(
  //   loginUser ? `/member?username=${loginUser.id}` : null,
  //   fetcher,
  // );
  const userInfo = {
    email: 'asdf016182@naver.com',
    nickname: '희영',
    image: '',
  };
  const [editMode, setEditMode] = useState(false);
  const [nickname, onChangeNickname, setNickname] = useInput('');

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const [profileImage, setProfileImage] = useState('');
  // const requestUpload = useRequest(imageUpload);
  const imageFileUpload = (fileBlob: File | null) => {
    // 이미지 업로드
    if (!fileBlob) return;
    const formData = new FormData();
    formData.append('file', fileBlob);
    // requestUpload(formData)
    //   .then((data) => {
    //     setProfileImage(data);
    //   })
    //   .catch(() => {
    //     toast.error('이미지를 업로드하지 못하였습니다.');
    //   });
  };

  // 파일 업로드 버튼 클릭 핸들러
  const fileInput = useRef(null);
  const clickUploadButton = useCallback(() => {
    // fileInput.current?.click();
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    setNickname(userInfo.nickname || '');
    setProfileImage(userInfo.image);
  }, [setNickname]);

  // const requestUpdate = useRequest(updateUserInfo);
  const updateUserInfoProc = useCallback(() => {
    const newUserInfo = {
      nickname: userInfo?.nickname,
      photoUrl: profileImage,
    };
    if (nickname && nickname.trim()) {
      newUserInfo.nickname = nickname;
    }
    // requestUpdate(newUserInfo)
    //   .then(() => {
    //     mutateUserInfo();
    //     mutateLoginUser();
    //     setEditMode((prev) => !prev);
    //   })
    //   .catch(() => {
    //     toast.error('사용자 정보를 수정하지 못하였습니다.');
    //   });
  }, [
    // mutateLoginUser,
    // mutateUserInfo,
    nickname,
    profileImage,
    // requestUpdate,
    userInfo?.email,
    userInfo?.nickname,
  ]);

  return (
    <Layout>
      <Container>
        <TitleDiv>
          내 정보
          {editMode && (
            <RowWrapper>
              <HeaderButton
                onClick={() => {
                  setEditMode((prev) => !prev);
                  setProfileImage(userInfo.image);
                }}
              >
                취소
              </HeaderButton>
              <HeaderButton
                onClick={() => {
                  updateUserInfoProc();
                }}
                primary
              >
                완료
              </HeaderButton>
            </RowWrapper>
          )}
        </TitleDiv>
        <UserProfileInfo>
          <ProfileInputWrapper>
            <ProfileImage
              width="65"
              height="65"
              onClick={() => {
                if (editMode) clickUploadButton();
              }}
              cursor={editMode ? 'pointer' : 'default'}
            />
            {editMode && (
              <>
                <ProfileInputButton onClick={clickUploadButton}>
                  <CiCamera />
                </ProfileInputButton>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  ref={fileInput}
                  onChange={(e) => {
                    const selectedFile = e.target.files && e.target.files[0];
                    if (
                      selectedFile?.type === 'image/png' ||
                      selectedFile?.type === 'image/jpeg' ||
                      selectedFile?.type === 'image/jpg'
                    ) {
                      imageFileUpload(selectedFile);
                    } else {
                      toast.error(
                        'png, jpg, jpeg 파일만 업로드할 수 있습니다.',
                      );
                    }
                  }}
                />
              </>
            )}
          </ProfileInputWrapper>
          {editMode ? (
            <FormItem>
              <input
                placeholder="닉네임"
                value={nickname}
                onChange={onChangeNickname}
              />
            </FormItem>
          ) : (
            <RowWrapper>
              {userInfo && userInfo.nickname}
              <EditIcon
                size="11"
                onClick={() => {
                  setEditMode((prev) => !prev);
                }}
              />
            </RowWrapper>
          )}
        </UserProfileInfo>
        <ContentDiv>
          <UserDetailInfo>
            <div>
              <div>닉네임</div> <span>{userInfo && userInfo.nickname}</span>
            </div>
            <div>
              <div>이메일</div> <span>{userInfo && userInfo.email}</span>
            </div>
            <div>
              <div>비밀번호</div>
              <span>
                ••••••••
                <ChangePasswordButton
                  onClick={() => {
                    setShowPasswordPopup(true);
                  }}
                >
                  변경하기
                </ChangePasswordButton>
              </span>
            </div>
          </UserDetailInfo>
        </ContentDiv>
        <ChangePasswordPopup
          show={showPasswordPopup}
          onClose={() => {
            setShowPasswordPopup(false);
          }}
        />
      </Container>
    </Layout>
  );
}

export default MyPage;
