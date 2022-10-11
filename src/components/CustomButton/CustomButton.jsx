import React from 'react';
import ButtonStyle from './CustomButton.styles';

const CustomButton = (props) => {
  const { text, backgroundColor, small, style, onClick, disabled } = props;

  return (
    <ButtonStyle
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
