import React from 'react';
import { useSelector } from 'react-redux';
import ButtonStyle from './CustomButton.styles';

const CustomButton = (props) => {
  const { text, backgroundColor, small, style, onClick, disabled, icon } =
    props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  return (
    <ButtonStyle
      fontSize={fontSize}
      font={font}
      {...{ backgroundColor }}
      {...{ onClick }}
      {...{ small }}
      {...{ disabled }}
      {...{ style }}
    >
      {icon && <img src={icon} alt={text} />}

      {text}
    </ButtonStyle>
  );
};

export default CustomButton;
