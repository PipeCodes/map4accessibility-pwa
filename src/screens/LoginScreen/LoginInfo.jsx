import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput/CustomInput';
import { Text, InputLabel, Error } from './LoginScreen.styles';

const SignUpInfo = (props) => {
  const { formData, setFormData, formErrors } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize}>{t('login')}</Text>

      <InputLabel fontSize={fontSize}>
        {t('email')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('email_placeholder')}
        type="email"
        value={formData.email}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      {formErrors.email && (
        <Error fontSize={fontSize}>{formErrors.email}</Error>
      )}
      <InputLabel fontSize={fontSize}>
        {t('password')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('password_placeholder')}
        type="password"
        value={formData.password}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      {formErrors.password && (
        <Error fontSize={fontSize}>{formErrors.password}</Error>
      )}
    </div>
  );
};

export default SignUpInfo;
