import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
// import SocialButton from '../../components/SocialButton/SocialButton';
// Social Button commented for the time being, changed social media buttons to CustomButtons and unnistalled social-login lib

const RegisterOptionsScreen = (props) => {
  const { routes, history } = props;

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
          <CustomButton
            // provider="facebook"
            // appId="YOUR_APP_ID"
            style={{
              marginBottom: 20,
              width: '100%',
              borderRadius: '25px',
            }}
            backgroundColor={colors.facebook_blue}
            text={t('sign_in_facebook')}
            icon={FacebookIcon}
          />
          <CustomButton
            // provider="google"
            // appId="YOUR_APP_ID"
            style={{
              width: '100%',
              borderRadius: '25px',
            }}
            backgroundColor={colors.google_red}
            text={t('sign_in_google')}
            icon={GoogleIcon}
          />
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
