import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  IResolveParams,
} from 'reactjs-social-login';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import {
  Page,
  Container,
  Box,
  Text,
  TextSecondary,
} from './RegisterOptionsScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import ProfileIcon from '../../assets/icons/profile.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import LoginIcon from '../../assets/icons/login.svg';

const RegisterOptionsScreen = (props) => {
  const { routes, history } = props;
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    alert('login start');
    console.log('Login');
    console.log(provider);
    console.log(profile);
  }, []);

  const onLogoutSuccess = useCallback(() => {
    console.log('Before Logout');
    console.log(provider);
    console.log(profile);
    setProfile(null);
    setProvider('');
    alert('logout success');
    console.log('After Logout');
    console.log(provider);
    console.log(profile);
  }, []);

  const { t } = useTranslation();

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar hasLogo hasAccessibilityButton={openAccessibility} />
      <Container>
        <Text fontSize={fontSize}>{t('sign_in')}</Text>
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
            isOnlyGetToken
            appId={process.env.REACT_APP_FB_APP_ID || ''}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              console.log('On Button');
              console.log(provider);
              console.log(profile);
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
            isOnlyGetToken
            client_id={process.env.REACT_APP_GG_APP_ID || ''}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              console.log('On Button');
              console.log(provider);
              console.log(profile);
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
          <TextSecondary fontSize={fontSize}>
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
