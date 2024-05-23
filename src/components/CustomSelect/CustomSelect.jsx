import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { components } from 'react-select';
import { StyledSelect } from './CustomSelect.styles';

const { Option } = components;
const IconOption = (props) => {
  const { data } = props;
  const { label } = data;

  return <Option {...props}>{label}</Option>;
};

const CustomSelect = (props) => {
  const { style, options, onChange, defaultValue, value, id } = props;
  const { t } = useTranslation();
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  return (
    <div style={style}>
      <StyledSelect
        inputId={id}
        font={font}
        fontSize={fontSize}
        backgroundColor={backgroundColor}
        classNamePrefix="react-select"
        options={options}
        defaultValue={defaultValue}
        value={value}
        placeholder={t('region')}
        noOptionsMessage={() => t('no_options')}
        onChange={onChange}
        components={{ Option: IconOption, SingleValue: IconOption }}
      />
    </div>
  );
};

export default CustomSelect;
