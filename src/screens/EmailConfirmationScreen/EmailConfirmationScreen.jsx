import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Page,
  Container,
  Box,
  Text,
  InputLabel,
} from './EmailConfirmationScreen.styles';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import OpenAccountLogin from '../../assets/icons/open-account-login.svg';
import TopBar from '../../components/TopBar/TopBar';
import PopUp from '../../components/PopUp/PopUp';
import NotificationIcon from '../../assets/icons/notification.svg';

const EmailConfirmationScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  const proceedLogin = useCallback(() => {
    history.push(routes.LOGIN.path);
  }, [history, routes]);

  return (
    <Page>
      <PopUp
        title={t('email_confirmation')}
        text={t('email_confirmed')}
        buttonText={t('proceed_login')}
        action={proceedLogin}
        icon={NotificationIcon}
      />
      <TopBar aligned hasBackButton hasLogo />
      <Container>
        <div className="fullDiv">
          <Text fontSize={fontSize}>{t('login')}</Text>
          <InputLabel fontSize={fontSize}>
            {t('email')}
            <span>*</span>
          </InputLabel>
          <CustomInput
            style={{}}
            placeholder={t('email_placeholder')}
            type="email"
          />
          <InputLabel fontSize={fontSize}>
            {t('password')}
            <span>*</span>
          </InputLabel>
          <CustomInput
            style={{}}
            placeholder={t('password_placeholder')}
            type="password"
          />
        </div>
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

export default withRouter(EmailConfirmationScreen);
