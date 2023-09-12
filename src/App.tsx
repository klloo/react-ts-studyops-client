import React from 'react';
import GlobalStyle from 'styles/globalStyle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from 'pages/Main';
import StudyDetail from 'pages/StudyDetail';

function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/study/:studyId" element={<StudyDetail />} />
          {/* 이 경로가 없을 때 "/"로 리다이렉트된다 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
