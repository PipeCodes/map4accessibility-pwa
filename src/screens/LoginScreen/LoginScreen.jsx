import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../store/actions/auth';
import { Page, Container, Box, TextSecondary } from './LoginScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import OpenAccountLogin from '../../assets/icons/open-account-login.svg';
import TopBar from '../../components/TopBar/TopBar';
import SignUpInfo from './SignUpInfo';

const PageDisplay = (formData, setFormData, page, formErrors) => {
  if (page === 0) {
    return (
      <SignUpInfo
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
      />
    );
  }
};

const LoginScreen = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  function changePage(value) {
    setPage((currPage) => currPage + value);
  }

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
    } else if (values.password !== values.confirmPassword) {
      errors.password = t('passwords_match');
    } else if (!regexPassword.test(values.password)) {
      errors.password = t('password_rules');
    }

    return errors;
  };

  // ClickHandlers
  const registerClickHandler = useCallback(() => {
    dispatch(login(formData.email, formData.password)).catch((error) => {
      alert(error);
    });
  }, [dispatch, formData]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backClickHandler = (page) => {
    if (page === 0) {
      history.goBack();
    }
    changePage(-1);
  };

  const nextClickHandler = (page, formErrors) => {
    if (page === 0) {
      setFormErrors(validate(formData));
      if (Object.keys(validate(formData)).length === 0) {
        changePage(1);
        return;
      }
      return;
    }
    if (Object.keys(formErrors).length === 0) {
      registerClickHandler();
    } else {
      setPage(0);
    }
  };

  return (
    <Page>
      <TopBar
        backTarget={() => backClickHandler(page)}
        aligned
        hasBackButton
        hasLogo
        hasAccessibilityButton={openAccessibility}
      />
      <Container>
        {PageDisplay(formData, setFormData, page, formErrors)}
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
          onClick={() => nextClickHandler(page, formErrors)}
        />

        {page === 0 && (
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
        )}
      </Container>
    </Page>
  );
};

export default withRouter(LoginScreen);
