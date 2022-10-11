import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import BackgroundImage from '../../assets/images/old_delete/bg_tutorial.svg';
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
  overflow: hidden;
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
  overflow-y: scroll;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const CarouselStyled = styled(Carousel)`
  display: flex;
  flex: 1;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.span`
  font-family: 'Rubik-Bold';
  font-size: 32px;
  color: ${colors.blue};
  max-width: 236px;
  text-align: center;
  margin-top: 30px;
`;

export const Image = styled.img`
  width: 160px;
  height: 160px;
  object-fit: scale-down;
  margin-top: 30px;
`;

export const DescriptionLabel = styled.span`
  font-size: 16px;
  color: ${colors.blue};
  max-width: 248px;
  text-align: center;
  margin-top: 30px;
`;

export const PageIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

export const PageIndicator = styled.div`
  width: 34px;
  height: 6px;
  background-color: #ffffff;
  opacity: ${(props) => (props.active ? 1 : 0.1)};
  margin-right: 11px;

  &:last-child {
    margin-right: 0px;
  }
`;
