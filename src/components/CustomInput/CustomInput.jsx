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
    name,
    min,
    max,
    onBlur,
    readOnly,
    fontSize,
    font,
  } = props;

  return (
    <InputStyle
      style={style}
      fontSize={fontSize}
      font={font}
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={onChange}
      onPaste={(e) => {
        e.preventDefault();
        return false;
      }}
      onCopy={(e) => {
        e.preventDefault();
        return false;
      }}
      value={value}
      name={name}
      onBlur={onBlur}
      {...{ readOnly }}
      {...{ borderColor }}
    />
  );
};

export default CustomInput;
