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
import { REGEX_PASSWORD, REGEX_EMAIL } from '../../constants';

const LoginScreen = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && history) {
      history.replace(routes.HOME.path);
    }
  }, [user, history]);

  // Validates the fields
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = t('required_email');
    } else if (!REGEX_EMAIL.test(values.email)) {
      errors.email = t('invalid_email');
    }

    if (!values.password) {
      errors.password = t('required_password');
    } else if (!REGEX_PASSWORD.test(values.password)) {
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
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        hasBackButton
        hasLogo
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
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
            onClick={() => history.push(routes.REGISTER_OPTIONS.path)}
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
            onClick={() => history.push(routes.RECOVER_PASSWORD.path)}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default withRouter(LoginScreen);
