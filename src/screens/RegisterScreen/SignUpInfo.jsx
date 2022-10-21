import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput/CustomInput';
import { Text, InputLabel, Error } from './RegisterScreen.styles';

const SignUpInfo = (props) => {
  const { formData, setFormData, formErrors, setFormErrors, validate } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  function focusHandler(target) {
    setFormErrors((prevState) => validate(target, formData, prevState));
    console.log(formErrors);
  }

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize}>{t('Create Account')}</Text>
      <InputLabel fontSize={fontSize}>
        {t('first_name')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
        style={{}}
        placeholder={t('first_name_placeholder')}
        value={formData.firstName}
        name="firstName"
        onBlur={(e) => focusHandler(e.target.name)}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            firstName: e.target.value,
          }));
        }}
      />
      {formErrors.firstName && (
        <Error fontSize={fontSize}>{formErrors.firstName}</Error>
      )}
      <InputLabel fontSize={fontSize}>
        {t('surname')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('surname_placeholder')}
        value={formData.surname}
        name="surname"
        onBlur={(e) => focusHandler(e.target.name)}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            surname: e.target.value,
          }));
        }}
      />
      {formErrors.surname && (
        <Error fontSize={fontSize}>{t(formErrors.surname)}</Error>
      )}

      <InputLabel fontSize={fontSize}>
        {t('birth_date')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('birth_date_placeholder')}
        type="date"
        value={formData.birthDate}
        name="birthDate"
        onBlur={(e) => focusHandler(e.target.name)}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            birthDate: e.target.value,
          }));
        }}
      />
      {formErrors.birthDate && (
        <Error fontSize={fontSize}>{formErrors.birthDate}</Error>
      )}
      <InputLabel fontSize={fontSize}>
        {t('email')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('email_placeholder')}
        type="email"
        value={formData.email}
        name="email"
        onBlur={(e) => focusHandler(e.target.name)}
        onChange={(e) => {
          setFormData((prevState) => ({ ...prevState, email: e.target.value }));
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
        name="password"
        onBlur={(e) => focusHandler(e.target.name)}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            password: e.target.value,
          }));
        }}
      />
      {formErrors.password && (
        <Error fontSize={fontSize}>{formErrors.password}</Error>
      )}
      <InputLabel fontSize={fontSize}>
        {t('confirm_password')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        style={{}}
        placeholder={t('confirm_password_placeholder')}
        type="password"
        name="confirmPassword"
        onBlur={(e) => focusHandler(e.target.name)}
        value={formData.confirmPassword}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            confirmPassword: e.target.value,
          }));
        }}
      />
      {formErrors.confirmPassword && (
        <Error fontSize={fontSize}>{formErrors.confirmPassword}</Error>
      )}
    </div>
  );
};

export default SignUpInfo;
