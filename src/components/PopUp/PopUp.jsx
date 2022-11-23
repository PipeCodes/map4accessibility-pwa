import React from 'react';
import { useSelector } from 'react-redux';
import ArrowLeft from '../../assets/icons/arrow-left.svg';

import {
  PopUp,
  DarkOverlayContainer,
  Icon,
  Text,
  TextSecondary,
  Container,
} from './PopUp.styles';
import CustomButton from '../CustomButton/CustomButton';

import { colors } from '../../constants/colors';

const PopUpComponent = (props) => {
  const { title, text, buttonText, action, buttonIcon, icon } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  return (
    <Container>
      <DarkOverlayContainer />
      <PopUp backgroundColor={backgroundColor}>
        <Icon>
          <img src={icon} alt="back" />
        </Icon>
        <Text fontSize={fontSize}>{title}</Text>
        <TextSecondary fontSize={fontSize}>{text} </TextSecondary>
        <CustomButton
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: '100%',
            borderRadius: '25px',
            color: colors.grey,
            border: '1px solid grey',
          }}
          backgroundColor={colors.transparent}
          text={buttonText}
          onClick={action}
          buttonicon={buttonIcon}
          icon={ArrowLeft}
        />
      </PopUp>
    </Container>
  );
};

export default PopUpComponent;
