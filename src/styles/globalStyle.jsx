import React from 'react';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const baseStyle = css`
  ${emotionNormalize}
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
  :root {
    --color-primary: #8d4bf6;
    --color-primarylight: #eee3ff;
    --color-crown: #f5e03c;
    --color-red: rgb(235, 78, 62);
    --color-border: rgb(221, 221, 221);
    --color-textdarkgrey: rgb(116, 116, 116);
    --color-textgrey: rgb(151, 151, 151);
    --color-textlight: rgb(194, 194, 194);
    --color-background: rgb(245, 245, 247);
    --color-cancel: rgb(224, 229, 233);
    --width-maxwidth: 1200px;
    --fontsize-title: 1.25rem;
  }
  body {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
    font-size: 16px;
    word-break: keep-all;
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
