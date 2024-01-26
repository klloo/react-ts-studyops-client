export interface IUserInfo {
  email: string;
  password: string;
  nickName: string;
  profileImageUrl: string | null;
}

export interface ILoginInfo {
  email: string;
  password: string;
}

export interface IJwt {
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: string;
}
