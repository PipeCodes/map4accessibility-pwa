import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';
import { login, loginByProvider } from '../../store/actions/auth';
import { Page, Container, Box } from './LoginScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import OpenAccountLogin from '../../assets/icons/open-account-login.svg';
import TopBar from '../../components/TopBar/TopBar';
import LoginInfo from './LoginInfo';
import FacebookIcon from '../../assets/icons/socials/facebook.svg';
import GoogleIcon from '../../assets/icons/socials/google.svg';
import { REGEX_PASSWORD, REGEX_EMAIL, PROVIDERS } from '../../constants';

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
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

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
  const registerClickHandler = useCallback((provider, data) => {
    if (data === undefined && data === null) {
      return;
    }

    if (provider === PROVIDERS.GOOGLE) {
      history.push(routes.REGISTER.path, {
        social: {
          provider,
          email: data?.email,
          name: data?.given_name,
          surname: data?.family_name,
          id: data?.sub,
        },
      });
    }

    if (provider === PROVIDERS.FACEBOOK) {
      history.push(routes.REGISTER.path, {
        social: {
          provider,
          email: data?.email,
          name: data?.first_name,
          surname: data?.last_name,
          id: data?.id,
        },
      });
    }
  });

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
          text={t('login')}
          icon={OpenAccountLogin}
          onClick={() => validateFormErrorsClickHandler(formErrors)}
          backgroundColor={loading ? colors.grey : colors.orange}
          loading={loading}
          disabled={loading}
        />
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FB_APP_ID || ''}
          fieldsProfile="id,first_name,last_name,middle_name,name,name_format,picture,short_name,email"
          onResolve={({ provider, data }) => {
            dispatch(loginByProvider(data?.email, provider, data?.id)).catch(
              () => {
                registerClickHandler(provider, data);
              },
            );
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <CustomButton
            style={{
              marginBottom: 20,
              width: '100%',
              borderRadius: '25px',
            }}
            backgroundColor={colors.facebook_blue}
            text={t('sign_in_facebook')}
            icon={FacebookIcon}
          />
        </LoginSocialFacebook>

        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GG_APP_ID || ''}
          scope="openid profile email"
          onResolve={({ provider, data }) => {
            dispatch(loginByProvider(data?.email, provider, data?.sub)).catch(
              () => {
                registerClickHandler(provider, data);
              },
            );
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <CustomButton
            style={{
              width: '100%',
              borderRadius: '25px',
            }}
            backgroundColor={colors.google_red}
            text={t('sign_in_google')}
            icon={GoogleIcon}
          />
        </LoginSocialGoogle>

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
