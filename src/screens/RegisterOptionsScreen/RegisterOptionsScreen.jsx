import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import { PROVIDERS } from '../../constants';
import {
  Page,
  Container,
  Box,
  Text,
  TextSecondary,
} from './RegisterOptionsScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import ProfileIcon from '../../assets/icons/profile.svg';
import FacebookIcon from '../../assets/icons/socials/facebook.svg';
import GoogleIcon from '../../assets/icons/socials/google.svg';
import LoginIcon from '../../assets/icons/login.svg';
import { loginByProvider } from '../../store/actions/auth';

const RegisterOptionsScreen = (props) => {
  const { routes, history } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && history) {
      history.replace(routes.LOGIN.path);
    }
  }, [user, history]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

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
        backgroundColor={backgroundColor}
        hasLogo
        hasAccessibilityButton={openAccessibility}
      />
      <Container>
        <Text fontSize={fontSize} font={font}>
          {t('sign_in')}
        </Text>
        <CustomButton
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: '100%',
            borderRadius: '25px',
          }}
          backgroundColor={colors.orange}
          text={t('create_account')}
          onClick={() => history.push(routes.REGISTER.path)}
          icon={ProfileIcon}
        />
        <Box>
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
        </Box>
        <Box>
          <TextSecondary fontSize={fontSize} font={font}>
            {t('already_have_account')}
          </TextSecondary>
          <CustomButton
            style={{
              width: 'auto',
              borderRadius: '25px',
              color: colors.primaryColor,
              boxShadow: 'none',
            }}
            backgroundColor={colors.transparent}
            text={t('login')}
            onClick={() => history.push(routes.LOGIN.path)}
            icon={LoginIcon}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default withRouter(RegisterOptionsScreen);
