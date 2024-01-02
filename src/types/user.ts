export interface IUserInfo {
  email: string;
  password: string;
  nickName: string;
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
