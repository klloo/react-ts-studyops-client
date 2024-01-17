import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout';
import { isEmpty } from 'lodash';

export default function PrivateRoute({
  userAuthentication,
}: {
  userAuthentication?: boolean;
}) {
  const token = localStorage.getItem('accessToken');
  const isLogin = !isEmpty(token);
  // const isLogin = true;

  if (userAuthentication) {
    // 사용자 인증이 반드시 필요한 페이지
    // 인증을 안했을 경우 메인 페이지로, 했을 경우 해당 페이지로
    if (!isLogin) {
      return <Navigate to="/login" />;
    }
    // 인증을 안했을 경우 메인 페이지로, 했을 경우 해당 페이지로
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    // 인증이 반드시 필요 없는 페이지
    // 인증을 안했을 경우 해당 페이지로, 인증을 한 상태일 경우 메인 페이지로
    return !isLogin ? <Outlet /> : <Navigate to="/" />;
  }
}
