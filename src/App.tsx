import React from 'react';
import GlobalStyle from 'styles/globalStyle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from 'pages/Main';
import StudyDetail from 'pages/StudyDetail';
import CreateStudy from 'pages/CreateStudy';

function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<CreateStudy />} />
          <Route path="/group/:groupId" element={<StudyDetail />} />
          {/* 이 경로가 없을 때 "/"로 리다이렉트된다 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
