import styled from 'styled-components';
import BackgroundImage from '../../assets/images/old_delete/bg_blue.svg';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background: url(${BackgroundImage}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: ${colors.bgBlue};
`;

export const LogoImage = styled.img`
  width: 90%;
  max-width: 220px;
  margin-top: 50px;
`;

export const Subtitle = styled.label`
  font-family: 'Rubik-Regular';
  font-size: 20px;
  color: white;
  margin-top: 70px;
`;
