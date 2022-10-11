import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../constants/colors';
import CustomButton from '../../components/CustomButton/CustomButton';
import TopBar from '../../components/TopBar/TopBar';
import {
  Page,
  LogoImage,
  RecoverPassword,
  Subtitle,
} from './LoginScreen.styles';
import Logo from '../../assets/images/old_delete/logo.svg';
import { login } from '../../store/actions/auth';

const LoginScreen = (props) => {
  const { routes, history } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginClickHandler = () => {
    dispatch(login(emailOrUsername, password, t)).catch((error) => {
      alert(error);
    });
  };

  useEffect(() => {
    if (user) {
      alert("TODO")
    }
  }, [user]);

  return (
    <Page>
      <TopBar hasBackButton />
      <LogoImage className="logo_img" alt="logo" src={Logo} />
      <Subtitle>{t('login_subtitle')}</Subtitle>
      <CustomInput
        style={{
          marginTop: 20,
        }}
        placeholder={t('username_email')}
        type="email"
        onChange={(e) => setEmailOrUsername(e.target.value)}
        value={emailOrUsername}
      />
      <CustomInput
        style={{
          marginTop: 13,
        }}
        placeholder={t('password')}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <RecoverPassword
        onClick={() => history.push(routes.RECOVER_PASSWORD.path)}
      >
        {t('recover_password')}
      </RecoverPassword>

      <CustomButton
        style={{
          marginTop: 20,
        }}
        backgroundColor={colors.green}
        text={t('login')}
        onClick={loginClickHandler}
        disabled={loading}
      />

      <Subtitle>{t('dont_have_an_account_yet')}</Subtitle>

      <CustomButton
        style={{
          marginTop: 10,
        }}
        backgroundColor={colors.orange}
        text={t('register')}
        onClick={() => history.push(routes.REGISTER.path)}
        disabled={loading}
      />
    </Page>
  );
};

export default withRouter(LoginScreen);
