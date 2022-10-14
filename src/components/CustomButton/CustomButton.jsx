import React from 'react';
import { useSelector } from 'react-redux';
import ButtonStyle from './CustomButton.styles';

const CustomButton = (props) => {
  const { text, backgroundColor, small, style, onClick, disabled } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <ButtonStyle
      fontSize={fontSize}
      {...{ backgroundColor }}
      {...{ onClick }}
      {...{ small }}
      {...{ disabled }}
      {...{ style }}
    >
      {text}
    </ButtonStyle>
  );
};

export default CustomButton;
