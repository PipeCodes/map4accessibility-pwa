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

export const Container = styled.div`
  display: flex;
  overflow-y: scroll;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 90%;
  max-width: 220px;
`;

export const AvatarWrapper = styled.div`
  margin-top: 35px;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 18px;
  display: flex;
  max-width: 266px;
  padding-left: 5px;
  padding-right: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const PrivacyPolicyLabel = styled.div`
  color: #fff;
  font-size: 12px;
  font-family: 'Rubik-Regular';
  margin-left: 10px;

  a {
    color: #fff;
    text-decoration: underline;
  }
`;
