import React from 'react';
import { useTranslation } from 'react-i18next';
import { components } from 'react-select';
import { StyledSelect } from './CustomSelect.styles';

const { Option } = components;
const IconOption = (props) => {
  const { data } = props;
  const { icon, label } = data;

  return (
    <Option {...props}>
      <img src={icon} style={{ height: 16, marginRight: 7 }} alt={label} />
      {label}
    </Option>
  );
};

const CustomSelect = (props) => {
  const { style, options, onChange, defaultValue, value } = props;

  const { t } = useTranslation();

  return (
    <div style={style}>
      <StyledSelect
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
