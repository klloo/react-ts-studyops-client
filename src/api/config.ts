import axios from 'axios';
import { refresh } from './auth';

const REFRESH_URL = '/auth/reissue';

const instance = axios.create({
  baseURL: '',
});

const logout = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
};

// access token 재발급
const getRefreshToken = async (): Promise<string | void> => {
  try {
    const res = await refresh();
    const accessToken = res.data.data?.accessToken;
    return accessToken;
  } catch (e) {
    // 로그아웃 처리
    logout();
  }
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 헤더에 엑세스 토큰 담기
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    //  401에러가 아니거나 재요청이거나 refresh 요청인 경우 그냥 에러 발생
    if (response.status !== 401 || config.sent || config.url === REFRESH_URL) {
      return Promise.reject(error);
    }
    // 아닌 경우 토큰 갱신
    config.sent = true; // 무한 재요청 방지
    const accessToken = await getRefreshToken();
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return axios(config);
  },
);

export default instance;
