import { socialLogin } from 'api/auth';
import useRequest from 'hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function KakaoAuth() {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  const navigate = useNavigate();

  if (!code) {
    navigate('/login');
    return;
  }

  const requestLogin = useRequest(socialLogin);
  requestLogin(code)
    .then((data) => {
      const { accessToken } = data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      navigate('/');
    })
    .catch(() => {
      toast.error('로그인에 실패하였습니다.');
      navigate('/login');
    });

  return <></>;
}
export default KakaoAuth;
