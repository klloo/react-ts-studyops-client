import ProfileImage from 'components/ProfileImage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import {
  Container,
  TitleDiv,
  ContentDiv,
  UserProfileInfo,
  UserDetailInfo,
  FormItem,
  RowWrapper,
  ChangePasswordButton,
  Layout,
} from './style';
import { CiCamera } from 'react-icons/ci';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';
import { ProfileInputButton, ProfileInputWrapper } from 'pages/Join/style';
import ChangePasswordPopup from './ChangePasswordPopup';
import EditIcon from 'components/EditIcon';
import { Button } from 'components/Button';
// import useRequest from 'hooks/useRequest';

function MyPage() {
  const { data: loginUser } = useSWR('/users/me', fetcher);
  const { data: userInfo } = useSWR(
    loginUser ? `/users/me/${loginUser.email}` : null,
    fetcher,
  );
  const [editMode, setEditMode] = useState(false);
  const [nickName, onChangeNickName, setNickName] = useInput('');

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
    setNickName(userInfo.nickName || '');
    setProfileImage(userInfo.image);
  }, [setNickName]);

  // const requestUpdate = useRequest(updateUserInfo);
  const updateUserInfoProc = useCallback(() => {
    const newUserInfo = {
      nickName: userInfo?.nickName,
      photoUrl: profileImage,
    };
    if (nickName && nickName.trim()) {
      newUserInfo.nickName = nickName;
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
    nickName,
    profileImage,
    // requestUpdate,
    userInfo?.email,
    userInfo?.nickName,
  ]);

  return (
    <Layout>
      <Container>
        <TitleDiv>
          내 정보
          {editMode && (
            <RowWrapper>
              <Button
                onClick={() => {
                  setEditMode((prev) => !prev);
                  setProfileImage(userInfo.image);
                }}
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  updateUserInfoProc();
                }}
                yesButton
              >
                완료
              </Button>
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
                value={nickName}
                onChange={onChangeNickName}
              />
            </FormItem>
          ) : (
            <RowWrapper>
              {userInfo && userInfo.nickName}
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
              <div>닉네임</div> <span>{userInfo && userInfo.nickName}</span>
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
