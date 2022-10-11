import React from 'react';
import { useTranslation } from 'react-i18next';
import { SELECT_MODE } from './CustomSelect.constants';
import { StyledSelect } from './CustomSelect.styles';

const CustomSelect = (props) => {
  const {
    style,
    options,
    onChange,
    defaultValue,
    value,
    mode = SELECT_MODE.light,
  } = props;

  const { t } = useTranslation();

  return (
    <div style={style}>
      <StyledSelect
        classNamePrefix="react-select"
        options={options}
        defaultValue={defaultValue}
        value={value}
        mode={mode}
        placeholder={t('region')}
        noOptionsMessage={() => t('no_options')}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomSelect;
