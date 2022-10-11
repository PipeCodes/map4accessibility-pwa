import styled from 'styled-components';
import { colors } from '../../constants/colors';
import BackgroundImage from '../../assets/images/waves.svg';
import IllustrationImage from '../../assets/images/bonecos_1_ciclo.svg';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background-color: ${props => props.color };
`;

export const BackgroundWaves = styled.img`
  position: absolute;
  width: 100%;
  height: 80%;
  object-fit: cover;
  bottom: 0;
  left: 0;
  content: url(${BackgroundImage});
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
  flex: 1;
  max-height: calc(100% - 60px - 50px);
`;

export const Subtitle = styled.span`
  font-size: 6vw;
  font-weight: lighter;
  color: #ffffff;
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const QuizList = styled.div`
  padding-top: 20px;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 20px;
  row-gap: 25px;
  max-height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;

  @media(min-width: 370px) {
    column-gap: 30px;
    row-gap: 35px;
  }

  @media(min-width: 380px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 25px;
    row-gap: 30px;
  }
`

export const MoreSoonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: white;
  font-size: 3.5vw;
`;

export const Illustration = styled.img`
  width: 145px;
  height: auto;
  position: absolute;
  bottom: 50px;
  right: 12%;
  object-fit: scale-down;
  z-index: 5;
  content: url(${IllustrationImage});
`;