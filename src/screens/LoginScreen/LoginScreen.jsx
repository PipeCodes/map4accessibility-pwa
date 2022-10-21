import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../store/actions/auth';
import { Page, Container, Box } from './LoginScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import OpenAccountLogin from '../../assets/icons/open-account-login.svg';
import TopBar from '../../components/TopBar/TopBar';
import LoginInfo from './LoginInfo';

const LoginScreen = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      history.replace(routes.DASHBOARD.path);
    }
  }, [user]);

  // Validates the fields
  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!values.email) {
      errors.email = t('required_email');
    } else if (!regexEmail.test(values.email)) {
      errors.email = t('invalid_email');
    }

    if (!values.password) {
      errors.password = t('required_password');
    } else if (!regexPassword.test(values.password)) {
      errors.password = t('password_rules');
    }

    return errors;
  };

  // ClickHandlers
  const loginClickHandler = useCallback(() => {
    dispatch(login(formData.email, formData.password)).catch((error) => {
      alert(error);
    });
  }, [dispatch, formData]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const validateFormErrorsClickHandler = () => {
    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      loginClickHandler();
    }
  };

  return (
    <Page>
      <TopBar
        aligned
        hasBackButton
        hasLogo
        hasAccessibilityButton={openAccessibility}
      />
      <Container>
        <LoginInfo
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
        />
        <CustomButton
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: '100%',
            borderRadius: '25px',
          }}
          backgroundColor={colors.orange}
          text={t('login')}
          icon={OpenAccountLogin}
          onClick={() => validateFormErrorsClickHandler(formErrors)}
        />

        <Box>
          <CustomButton
            style={{
              width: 'auto',
              color: colors.primaryColor,
              fontSize: { fontSize },
              boxShadow: 'none',
            }}
            backgroundColor={colors.transparent}
            text={t('create_account')}
            onClick={() => history.push(routes.REGISTER.path)}
          />
          <CustomButton
            style={{
              width: 'auto',
              color: colors.primaryColor,
              fontSize: { fontSize },
              boxShadow: 'none',
            }}
            backgroundColor={colors.transparent}
            text={t('recover_password')}
            onClick={() => history.push(routes.LOGIN.path)}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default withRouter(LoginScreen);
