import styled from 'styled-components';
import BackgroundImage from '../../assets/images/old_delete/bg_blue.svg';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  padding: 10px 15px;
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
`;

export const Subtitle = styled.label`
  font-size: 15px;
  color: white;
  margin-top: 30px;
`;

export const RecoverPassword = styled.button`
  background-color: transparent;
  width: 181px;
  height: 40px;
  border: 0;
  text-decoration: underline;
  color: white;
  font-family: 'Rubik-Bold';
  margin-top: 15px;
  font-size: 13px;
  &:focus {
    outline: 0;
  }
`;
