/* eslint-disable @typescript-eslint/no-unused-vars */
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
  ProfileInputButton,
  ProfileInputWrapper,
} from './style';
import { CiCamera } from 'react-icons/ci';
import useInput from 'hooks/useInput';
import { toast } from 'react-toastify';
import ChangePasswordPopup from './ChangePasswordPopup';
import EditIcon from 'components/EditIcon';
import { Button } from 'components/Button';
import useRequest from 'hooks/useRequest';
import { updateProfileImage, updateUserInfo } from 'api/user';
import { IUserInfo } from 'types/user';
import ProfileImage from 'components/ProfileImage';
import SkeletonComponent from './SkeletonComponent';

function MyPage() {
  const { data: loginUser, mutate: mutateLoginUser } = useSWR(
    '/users/me',
    fetcher,
  );
  const { data: userInfo, mutate: mutateUserInfo } = useSWR<
    Omit<IUserInfo, 'password'>
  >(loginUser ? `/users/me/${loginUser.email}` : null, fetcher);

  const [socialLogin, setSocialLogin] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [nickName, onChangeNickName, setNickName] = useInput('');

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const setImageFile = (fileBlob: File | null) => {
    // 이미지 업로드
    if (!fileBlob) return;
    setProfileImageFile(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
        }
        resolve();
      };
    });
  };

  // 파일 업로드 버튼 클릭 핸들러
  const fileInput = useRef<HTMLInputElement>(null);
  const clickUploadButton = useCallback(() => {
    fileInput.current?.click();
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    setNickName(userInfo.nickName || '');
    setProfileImage(userInfo.profileImageUrl);
    const emailDomain = userInfo.email.split('@')[1];
    const splitList = emailDomain.split('.');
    if (splitList.length === 3) {
      setSocialLogin(splitList[2]);
      setEmail(userInfo.email.replace(/\.[^.]*$/, ''));
    } else {
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const requestUpdate = useRequest(updateUserInfo);
  const requestImageUpload = useRequest(updateProfileImage);
  const updateUserInfoProc = useCallback(async () => {
    const newUserInfo = {
      nickName: nickName,
    };
    if (!nickName || !nickName.trim()) {
      setNickName(userInfo?.nickName);
      setEditMode((prev) => !prev);
      return;
    }
    if (userInfo?.nickName === nickName) {
      if (profileImageFile) {
        const formData = new FormData();
        formData.append('profileImage', profileImageFile);
        await requestImageUpload(formData).catch(() => {
          toast.error('사용자 정보를 수정하지 못하였습니다.');
        });
        mutateLoginUser();
        mutateUserInfo();
        setProfileImageFile(null);
      }
      setEditMode((prev) => !prev);
      return;
    }
    const nicknameReg = /^user/;
    if (nicknameReg.test(nickName.trim())) {
      toast.error('사용할 수 없는 닉네임입니다.');
      return;
    }
    await requestUpdate(newUserInfo).catch((e) => {
      if (e.status === 409) {
        toast.error(e.message);
      } else {
        toast.error('사용자 정보를 수정하지 못하였습니다.');
      }
    });
    if (profileImageFile) {
      const formData = new FormData();
      formData.append('profileImage', profileImageFile);
      await requestImageUpload(formData).catch(() => {
        toast.error('사용자 정보를 수정하지 못하였습니다.');
      });
      setProfileImageFile(null);
    }
    mutateUserInfo();
    mutateLoginUser();
    setEditMode((prev) => !prev);
  }, [
    mutateLoginUser,
    mutateUserInfo,
    nickName,
    profileImage,
    requestUpdate,
    userInfo?.email,
    userInfo?.nickName,
    profileImageFile,
  ]);

  if (!userInfo) {
    return <SkeletonComponent />;
  }

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
                  setProfileImage(userInfo.profileImageUrl || null);
                  setNickName(userInfo.nickName);
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
              size={65}
              nickName={userInfo?.nickName}
              url={profileImage}
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
                      setImageFile(selectedFile);
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
              {userInfo.nickName}
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
              <div>닉네임</div> <span>{userInfo.nickName}</span>
            </div>
            <div>
              <div>이메일</div> <span>{email}</span>
            </div>
            {socialLogin ? (
              <div>
                <div>소셜 로그인</div>
                <span>{socialLogin}</span>
              </div>
            ) : (
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
            )}
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
