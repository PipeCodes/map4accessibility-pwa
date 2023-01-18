import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../components/CustomInput/CustomInput';
import { checkEmail } from '../../store/actions/auth';
import {
  Text,
  InputLabel,
  Error,
  CheckboxWrapper,
  PrivacyPolicyLabel,
} from './RegisterScreen.styles';
import {
  validateBirthDate,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validatePassword,
  validatePolicy,
  validateSurname,
} from './validate';

const SignUpInfo = (props) => {
  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    validate,
    setNotReadySubmit,
  } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const dispatch = useDispatch();

  const checkPasswords = (name, value) => {
    const form = { ...formData, [name]: value };

    setFormErrors((prevErrors) => {
      const firstForm = validate('password', form, prevErrors);
      const secondForm = validate('confirmPassword', form, firstForm);
      return secondForm;
    });
  };

  const duplicate = useCallback(
    (email) =>
      dispatch(checkEmail(email))
        .then((value) => {
          setFormErrors((prevErrors) =>
            validate('email', formData, prevErrors, value),
          );
        })
        .catch((error) => {
          alert(error);
        }),
    [dispatch, formData, validate],
  );

  const focusHandler = useCallback(
    (target) => {
      setFormErrors((prevErrors) => validate(target, formData, prevErrors));
    },
    [validate, formData],
  );

  const setPrivacyPolicyChecked = () => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: !formData.termsAccepted,
    }));
  };

  useEffect(() => {
    if (
      (validatePolicy(formData.termsAccepted) ||
        validateFirstName(formData.firstName) ||
        validateSurname(formData.surname) ||
        validateBirthDate(formData.birthDate) ||
        validateEmail(formData.email, false) ||
        validatePassword(formData.password, formData.confirmPassword) ||
        validateConfirmPassword(
          formData.password,
          formData.confirmPassword,
        )) === null &&
      Object.keys(formErrors).length === 0
    ) {
      setNotReadySubmit(false);
    } else {
      setNotReadySubmit(true);
    }
  }, [formData, formErrors]);

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize} font={font}>
        {t('Create Account')}
      </Text>
      <InputLabel fontSize={fontSize} font={font}>
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
        maxLength="25"
      />
      {formErrors.firstName && (
        <Error fontSize={fontSize}>{t(formErrors.firstName)}</Error>
      )}
      <InputLabel fontSize={fontSize} font={font}>
        {t('surname')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
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
        maxLength="25"
      />
      {formErrors.surname && (
        <Error fontSize={fontSize}>{t(formErrors.surname)}</Error>
      )}

      <InputLabel fontSize={fontSize} font={font}>
        {t('birth_date')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
        style={{}}
        placeholder={t('birth_date_placeholder')}
        type="date"
        value={formData.birthDate}
        name="birthDate"
        min={moment().subtract(100, 'years').format('YYYY-MM-DD')}
        max={moment().subtract(16, 'years').format('yyyy-MM-DD')}
        onBlur={(e) => focusHandler(e.target.name)}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            birthDate: e.target.value,
          }));
        }}
      />
      {formErrors.birthDate && (
        <Error fontSize={fontSize}>{t(formErrors.birthDate)}</Error>
      )}
      <InputLabel fontSize={fontSize} font={font}>
        {t('email')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
        style={{}}
        placeholder={t('email_placeholder')}
        type="email"
        value={formData.email}
        name="email"
        onBlur={(e) => {
          if (e.target.value.length > 0) {
            duplicate(e.target.value);
          } else {
            focusHandler(e.target.name);
          }
        }}
        onChange={(e) => {
          setFormData((prevState) => ({ ...prevState, email: e.target.value }));
        }}
      />
      {formErrors.email && (
        <Error fontSize={fontSize}>{t(formErrors.email)}</Error>
      )}
      <InputLabel fontSize={fontSize} font={font}>
        {t('password')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
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
          checkPasswords(e.target.name, e.target.value);
        }}
      />
      {formErrors.password && (
        <Error fontSize={fontSize}>{t(formErrors.password)}</Error>
      )}
      <InputLabel fontSize={fontSize} font={font}>
        {t('confirm_password')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
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
          checkPasswords(e.target.name, e.target.value);
        }}
      />
      {formErrors.confirmPassword && (
        <Error fontSize={fontSize}>{t(formErrors.confirmPassword)}</Error>
      )}
      <CheckboxWrapper fontSize={fontSize} font={font}>
        <input
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={() => setPrivacyPolicyChecked()}
        />
        <PrivacyPolicyLabel
          fontSize={fontSize}
          font={font}
          onClick={() => setPrivacyPolicyChecked()}
          dangerouslySetInnerHTML={{
            __html: t('privacy_policy_message', {
              link: 'https://google.com',
              privacy_policy: t('privacy_policy'),
            }),
          }}
        />
      </CheckboxWrapper>

      {formErrors.termsAccepted && (
        <Error fontSize={fontSize}>{t(formErrors.termsAccepted)}</Error>
      )}
    </div>
  );
};

export default SignUpInfo;
