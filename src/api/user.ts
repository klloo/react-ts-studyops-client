import { IUserInfo } from 'types/user';
import axios from './config';
import { ResponseType } from 'types/common';

const PREFIX_URL = '/users';

/**
 * 사용자 정보를 수정한다.
 */
export function updateUserInfo(userInfo: Pick<IUserInfo, 'nickName'>): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${PREFIX_URL}/me/info`, userInfo);
}

/**
 * 사용자 비밀번호를 수정한다.
 */
export function updatePassword(password: {
  oldPassword: string;
  newPassword: string;
}): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${PREFIX_URL}/me`, password);
}
