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
    social,
  } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const dispatch = useDispatch();
  const privacyPolicy = `${process.env.REACT_APP_EXTERNAL_LINKS_BASE}/privacy-policy`;

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
          // eslint-disable-next-line no-undef
          alert(error);
        }),
    [dispatch, formData, validate, setFormErrors],
  );

  const focusHandler = useCallback(
    (target) => {
      setFormErrors((prevErrors) => validate(target, formData, prevErrors));
    },
    [validate, formData, setFormErrors],
  );

  const setPrivacyPolicyChecked = () => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: !formData.termsAccepted,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      provider: social?.provider,
      firstName: social?.name,
      surname: social?.surname,
      birthdate: social?.birthDate ? social?.birthDate : null,
      email: social?.email,
      avatar: social?.avatar,
    }));
  }, [social, setFormData]);

  useEffect(() => {
    if (social) {
      if (
        (validatePolicy(formData.termsAccepted) ||
          validateFirstName(formData.firstName) ||
          validateSurname(formData.surname) ||
          validateBirthDate(formData.birthDate) ||
          validateEmail(formData.email, false)) === null &&
        Object.keys(formErrors).length === 0
      ) {
        setNotReadySubmit(false);
        return;
      }
      setNotReadySubmit(true);
      return;
    }

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
  }, [formData, formErrors, social, setNotReadySubmit]);

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize} font={font}>
        {t('create_account')}
      </Text>
      <InputLabel fontSize={fontSize} font={font} htmlFor="firstName">
        {t('first_name')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        id="firstName"
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
        <Error fontSize={fontSize} font={font}>
          {t(formErrors.firstName)}
        </Error>
      )}
      <InputLabel fontSize={fontSize} font={font} htmlFor="surname">
        {t('surname')}
        <span>*</span>
      </InputLabel>
      <CustomInput
        id="surname"
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
        <Error fontSize={fontSize} font={font}>
          {t(formErrors.surname)}
        </Error>
      )}

      <InputLabel fontSize={fontSize} font={font} htmlFor="birthDate">
        {t('birth_date')}
      </InputLabel>
      <CustomInput
        id="birthDate"
        fontSize={fontSize}
        font={font}
        style={{ minWidth: 'intrinsic' }}
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
        <Error fontSize={fontSize} font={font}>
          {t(formErrors.birthDate)}
        </Error>
      )}
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
        type="email"
        value={formData.email}
        name="email"
        autoComplete="email"
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
        <Error fontSize={fontSize} font={font}>
          {t(formErrors.email)}
        </Error>
      )}
      {!social && (
        <>
          <InputLabel fontSize={fontSize} font={font} htmlFor="password">
            {t('password')}
            <span>*</span>
          </InputLabel>
          <CustomInput
            id="password"
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('password_placeholder')}
            type="password"
            value={formData.password}
            name="password"
            autoComplete="new-password"
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
            <Error fontSize={fontSize} font={font}>
              {t(formErrors.password)}
            </Error>
          )}
          <InputLabel fontSize={fontSize} font={font} htmlFor="confirmPassword">
            {t('confirm_password')}
            <span>*</span>
          </InputLabel>
          <CustomInput
            id="confirmPassword"
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('confirm_password_placeholder')}
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
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
            <Error fontSize={fontSize} font={font}>
              {t(formErrors.confirmPassword)}
            </Error>
          )}
        </>
      )}

      <CheckboxWrapper fontSize={fontSize} font={font}>
        <input
          id="terms"
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={() => setPrivacyPolicyChecked()}
        />
        <PrivacyPolicyLabel
          fontSize={fontSize}
          htmlFor="terms"
          font={font}
          onClick={() => setPrivacyPolicyChecked()}
          dangerouslySetInnerHTML={{
            __html: t('privacy_policy_message', {
              link: privacyPolicy,
              privacy_policy: t('privacy_policy'),
            }),
          }}
        />
      </CheckboxWrapper>

      {formErrors.termsAccepted && (
        <Error fontSize={fontSize} font={font}>
          {t(formErrors.termsAccepted)}
        </Error>
      )}
    </div>
  );
};

export default SignUpInfo;
