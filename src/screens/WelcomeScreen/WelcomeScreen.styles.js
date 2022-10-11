import styled from 'styled-components';
import BackgroundImage from '../../assets/images/bg_splash.svg';

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
  overflow: hidden;
  justify-content: space-between;
`;

export const LogoImage = styled.img`
  width: 220px;
  margin-top: 50px;
`;

export const Illustration = styled.img`
  margin-bottom: 40px;
`;
