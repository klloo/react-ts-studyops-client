import React from 'react';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const baseStyle = css`
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  ${emotionNormalize}
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
  :root {
    --color-primary: #8d4bf6;
    --color-primary-light: #eee3ff;
    --color-red: #d52d2d;
    --color-gray1: #333333;
    --color-gray2: #8c8c8c;
    --color-gray3: #dddddd;
    --color-gray4: #f4f4f4;
    --width-maxwidth: 1200px;
    --fontsize-title: 1.25rem;
  }
  body {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
    font-size: 16px;
    word-break: keep-all;
    .Toastify__toast {
      font-size: 0.9rem;
      line-height: 1.2;
      word-break: keep-all;
    }
  }

  textarea,
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
