import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import ButtonStyle from './CustomButton.styles';

const CustomButton = (props) => {
  const {
    text,
    backgroundColor,
    small,
    style,
    onClick,
    disabled,
    icon,
    loading,
    alt,
  } = props;
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
      alt={alt}
    >
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        icon && <img src={icon} alt={`${text} icon`} />
      )}
      {text}
    </ButtonStyle>
  );
};

export default CustomButton;
