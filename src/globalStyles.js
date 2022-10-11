import { createGlobalStyle } from 'styled-components';
import RubikRegular from './assets/fonts/Rubik-Regular.ttf';
import RubikBold from './assets/fonts/Rubik-Bold.ttf';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { colors } from './constants/colors';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Rubik-Regular';
    src: url(${RubikRegular}) format('truetype');
  }
  @font-face {
    font-family: 'Rubik-Bold';
    src: url(${RubikBold}) format('truetype');
  }

  body {
    font-family: 'Rubik-Regular';
    margin: 0;
    overscroll-behavior-y: contain;
    max-width: 820px;
    margin: 0px auto;
    background-color: ${colors.lightBlue};

    #root {
      background-color: #fff;
    }

    b {
      font-family: 'Rubik-Bold';
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
