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
  padding: 30px 16px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;
