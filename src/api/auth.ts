import axios from './config';
import { ResponseType } from 'types/common';
import { IJwt, ILoginInfo, IUserInfo } from 'types/user';

const PREFIX_URL = '/auth';

/**
 * 회원가입한다.
 */
export function signup(userInfo: IUserInfo): Promise<{
  data: ResponseType<{ email: string }>;
}> {
  return axios.post(`${PREFIX_URL}/signup`, userInfo);
}

/**
 * 로그인한다.
 */
export function signin(userInfo: ILoginInfo): Promise<{
  data: ResponseType<IJwt>;
}> {
  return axios.post(`${PREFIX_URL}/login`, userInfo);
}

/**
 * 액세스 토큰을 재발급 받는다.
 */
export function refresh(): Promise<{
  data: ResponseType<IJwt>;
}> {
  return axios.post(`${PREFIX_URL}/reissue`);
}
