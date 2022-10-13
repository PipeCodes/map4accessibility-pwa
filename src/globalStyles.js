import { createGlobalStyle } from 'styled-components';
import NotoSansRegular from './assets/fonts/NotoSans-Regular.ttf';
import NotoSansBold from './assets/fonts/NotoSans-Bold.ttf';
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

  body {
    font-family: 'NotoSans-Regular';
    margin: 0;
    overscroll-behavior-y: contain;
    max-width: 820px;
    margin: 0px auto;
    background-color: ${colors.lightBlue};

    #root {
      background-color: #fff;
    }

    b {
      font-family: 'NotoSans-Bold';
    }

    button {
      -webkit-appearance: none;
      -webkit-border-radius: 0;
    }

    .spinner-border {
      color: ${colors.lightBlue};
    }
  }
`;

export default GlobalStyles;
