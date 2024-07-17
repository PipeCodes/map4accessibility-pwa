import React from 'react';
import InputStyle from './CustomInput.styles';

const CustomInput = (props) => {
  const {
    placeholder,
    borderColor,
    style,
    type = 'text',
    maxLength,
    onChange,
    value,
    name,
    min,
    max,
    onBlur,
    readOnly,
    fontSize,
    font,
    icon,
    id,
    defaultValue,
    autoFocus,
  } = props;

  return (
    <InputStyle
      id={id}
      style={style}
      fontSize={fontSize}
      font={font}
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={onChange}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      onPaste={(e) => {
        e.preventDefault();
        return false;
      }}
      onCopy={(e) => {
        e.preventDefault();
        return false;
      }}
      maxLength={maxLength}
      value={value}
      name={name}
      onBlur={onBlur}
      {...{ readOnly }}
      {...{ borderColor }}
      icon={icon}
    />
  );
};

export default CustomInput;
