import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput/CustomInput';
import { Text, InputLabel, Error } from './RecoverPasswordScreen.styles';

const SignUpInfo = (props) => {
  const { formData, setFormData, formErrors } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize}>{t('recover_password')}</Text>

      <InputLabel fontSize={fontSize}>
        {t('email')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('email_placeholder')}
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {formErrors.email && (
        <Error fontSize={fontSize}>{formErrors.email}</Error>
      )}
    </div>
  );
};

export default SignUpInfo;
