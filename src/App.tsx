import React from 'react';
import GlobalStyle from 'styles/globalStyle';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from 'pages/Main';
import StudyDetail from 'pages/StudyDetail';
import CreateStudy from 'pages/CreateStudy';
import Login from 'pages/Login';
import Join from 'pages/Join';
import MyPage from 'pages/MyPage';
import PrivateRoute from 'layouts/PrivateRoute';

function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute userAuthentication={true} />}>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<MyPage />} />
            <Route path="/create" element={<CreateStudy />} />
            <Route path="/group/:groupId" element={<StudyDetail />} />
          </Route>
          <Route element={<PrivateRoute userAuthentication={false} />}>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* 이 경로가 없을 때 "/"로 리다이렉트된다 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>
  );
}

export default App;
