import React from 'react';
import InputStyle from './CustomInput.styles';

const CustomInput = (props) => {
  const {
    placeholder,
    borderColor,
    style,
    type = 'text',
    onChange,
    value,
  } = props;

  return (
    <InputStyle
      style={style}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...{ borderColor }}
    />
  );
};

export default CustomInput;
