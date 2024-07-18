import { createGlobalStyle } from 'styled-components';
import { setUnderline, setHighlight } from './helpers/utils';
import NotoSansRegular from './assets/fonts/NotoSans-Regular.ttf';
import NotoSansBold from './assets/fonts/NotoSans-Bold.ttf';
import EasyReadingPro from './assets/fonts/EasyReadingPRO.ttf';
import EasyReadingProBold from './assets/fonts/EasyReadingPROBold.ttf';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { colors } from './constants/colors';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'NotoSans-Regular';
    src: url(${NotoSansRegular}) format('truetype');
  }
  @font-face {
    font-family: 'NotoSans-Bold';
    src: url(${NotoSansBold}) format('truetype');
  }

  @font-face {
    font-family: 'EasyReadingPro';
    src: url(${EasyReadingPro}) format('truetype');
  }
  @font-face {
    font-family: 'EasyReadingPro-Bold';
    src: url(${EasyReadingProBold}) format('truetype');
  }

html {
  height: 100%;
}

  #root {
    height: 100%;
    position: relative;
  }

  body {
    font-family: 'NotoSans-Regular';
    margin: 0;
    overscroll-behavior-y: contain;
    max-width: 820px;
    height: 100%;
    margin: 0px auto;
    background-color: ${colors.background};
    word-wrap: break-word;
    /*Removes infoBox from googlemaps closing image */
    .infoBox {width: auto !important;img {display: none;}}

    a {
      text-decoration: ${(props) => setUnderline('none', props.underline)};
      background-color: ${(props) => setHighlight('unset', props.highlight)};
    }

    b {
      font-family: 'NotoSans-Bold';
    }

    button {
      -webkit-appearance: none;
      -webkit-border-radius: 0;
    }

    .spinner-border {
      color: ${colors.primaryColor} !important;
      margin-top: 20px;
    }

    .Toastify__progress-bar--bg {
      background: ${colors.transparent};
    }

    .Toastify__progress-bar {
      background: ${colors.primaryColor};
    }
  }
`;

export default GlobalStyles;
