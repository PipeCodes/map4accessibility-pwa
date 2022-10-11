import styled from 'styled-components';
import { colors } from '../../constants/colors';
import BackgroundImage from '../../assets/images/bg_select_cycle.svg';
import IllustrationImage from '../../assets/images/illustration_splash.svg';


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
  background-color: ${colors.bgBlue2};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  align-items: center;

  .spinner-border {
    color: ${colors.blue};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  width: 100%;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: 40px;
`;

export const Title = styled.span`
  font-family: 'Rubik-Bold';
  font-size: 9vw;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  color: #ffffff;

  @media(min-width: 820px) {
    font-size: 80px;
  }  
`;

export const CycleListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const IllustrationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const Illustration = styled.img`
  width: 58%;
  height: auto;
  object-fit: scale-down;
  content: url(${IllustrationImage});
`;