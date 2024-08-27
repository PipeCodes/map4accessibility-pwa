import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput/CustomInput';
import { Text, InputLabel, Error } from './LoginScreen.styles';

const SignUpInfo = (props) => {
  const { formData, setFormData, formErrors } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize} font={font}>
        {t('login')}
      </Text>

      <InputLabel fontSize={fontSize} font={font} htmlFor="email">
        {t('email')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        id="email"
        fontSize={fontSize}
        font={font}
        style={{}}
        placeholder={t('email_placeholder')}
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      {formErrors.email && (
        <Error fontSize={fontSize} font={font}>
          {formErrors.email}
        </Error>
      )}
      <InputLabel fontSize={fontSize} font={font} htmlFor="password">
        {t('password')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
        style={{}}
        id="password"
        placeholder={t('password_placeholder')}
        type="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      {formErrors.password && (
        <Error fontSize={fontSize} font={font}>
          {formErrors.password}
        </Error>
      )}
    </div>
  );
};

export default SignUpInfo;
