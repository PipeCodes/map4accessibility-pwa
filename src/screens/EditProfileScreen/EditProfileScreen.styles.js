import styled from 'styled-components';
import BackgroundImage from '../../assets/images/bg_blue.svg';
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
  /* overflow-y: scroll; */
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
export const AvatarWrapper = styled.div`
  margin-top: 35px;
`;
