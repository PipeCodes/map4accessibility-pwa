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
    onBlur,
    readOnly,
  } = props;

  return (
    <InputStyle
      style={style}
      type={type}
      placeholder={placeholder}
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
