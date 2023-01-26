import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import LoginIcon from '../../assets/icons/login.svg';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const RegisterOptionsScreen = (props) => {
  const { routes, history } = props;
  const { t } = useTranslation();
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
  }, [user, history, routes.LOGIN.path]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

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
          <SocialLogin />
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
