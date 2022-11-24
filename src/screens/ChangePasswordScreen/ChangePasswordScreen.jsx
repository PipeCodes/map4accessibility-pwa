import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/colors';
import {
  Page,
  Container,
  Text,
  InputLabel,
  Error,
} from './ChangePasswordScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import {
  validateConfirmPassword,
  validatePassword,
} from '../RegisterScreen/validate';

const validate = (field, values, lastErrors) => {
  const errors = { ...lastErrors };
  let error;

  if (field === 'password') {
    delete errors.password;
    error = validatePassword(values.password, values.confirmPassword);
    if (error !== null && error !== undefined) {
      errors.password = error;
    }
  }
  if (field === 'confirmPassword') {
    delete errors.confirmPassword;
    error = validateConfirmPassword(values.password, values.confirmPassword);
    if (error !== null) {
      errors.confirmPassword = error;
    }
  }

  return errors;
};

const initialValues = (email) => ({ email, password: '', confirmPassword: '' });

const ChangePasswordScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const [notReadySubmit, setNotReadySubmit] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialValues('ineedan@email.com'));
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  useEffect(() => {
    if (
      formData.confirmPassword !== '' &&
      formData.password !== '' &&
      Object.keys(formErrors).length === 0
    ) {
      setNotReadySubmit(false);
    } else {
      setNotReadySubmit(true);
    }
  }, [formData]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const checkPasswords = (name, value) => {
    const form = { ...formData, [name]: value };

    setFormErrors((prevErrors) => {
      const firstForm = validate('password', form, prevErrors);
      const secondForm = validate('confirmPassword', form, firstForm);
      return secondForm;
    });
  };

  const recoverPasswordHandler = useCallback(() => {
    console.log('Call Change Password API');

    // Delete next line when feature is implemented
    history.push(routes.LOGIN.path);

    // Uncomment when implemented
    // dispatch(changePassword(formData))
    //   .then(history.push(routes.LOGIN.path))
    //   .catch((error) => {
    //     alert(error);
    //   });
  }, [dispatch, formData, history, routes]);

  const clickHandler = () => {
    setFormErrors((prevErrors) => validate(formData, prevErrors));
    if (Object.keys(formErrors).length === 0) {
      recoverPasswordHandler();
    }
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        hasLogo
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
      />
      <Container>
        <div className="fullDiv">
          <Text fontSize={fontSize} font={font}>
            {t('change_password')}
          </Text>

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
            readOnly
          />
          {formErrors.email && (
            <Error fontSize={fontSize} font={font}>
              {formErrors.email}
            </Error>
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
          <CustomButton
            style={{
              marginTop: 30,
              marginBottom: 20,
              width: '100%',
              borderRadius: '25px',
            }}
            disabled={notReadySubmit}
            backgroundColor={notReadySubmit ? colors.grey : colors.orange}
            text={t('change_password')}
            icon={ArrowRight}
            onClick={() => clickHandler()}
          />
        </div>
      </Container>
    </Page>
  );
};

export default withRouter(ChangePasswordScreen);
