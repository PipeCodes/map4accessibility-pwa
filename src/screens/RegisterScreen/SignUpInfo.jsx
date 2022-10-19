import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput/CustomInput';
import { Text, InputLabel, Error } from './RegisterScreen.styles';

const SignUpInfo = (props) => {
  const { formData, setFormData, formErrors } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

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
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
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
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
      />
      {formErrors.surname && (
        <Error fontSize={fontSize}>{formErrors.surname}</Error>
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
        onChange={(e) =>
          setFormData({ ...formData, birthDate: e.target.value })
        }
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
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      {formErrors.confirmPassword && (
        <Error fontSize={fontSize}>{formErrors.confirmPassword}</Error>
      )}
    </div>
  );
};

export default SignUpInfo;
