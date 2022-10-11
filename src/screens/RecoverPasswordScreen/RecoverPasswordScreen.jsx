import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../constants/colors';
import { Page, LogoImage, Subtitle } from './RecoverPasswordScreen.styles';
import Logo from '../../assets/images/old_delete/logo.svg';
import { recoverPassword } from '../../store/actions/auth';
import TopBar from '../../components/TopBar/TopBar';

const RecoverPasswordScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const [emailOrUsername, setEmailOrUsername] = useState('');

  const recoverHandler = () => {
    dispatch(recoverPassword(emailOrUsername, t))
      .then((message) => {
        setEmailOrUsername('');
        alert(message);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Page>
      <TopBar hasBackButton />
      <LogoImage className="logo_img" alt="logo" src={Logo} />
      <Subtitle>{t('recover_password')}</Subtitle>
      <CustomInput
        style={{
          marginTop: 30,
        }}
        placeholder={t('username_email')}
        type="email"
        onChange={(e) => setEmailOrUsername(e.target.value)}
        value={emailOrUsername}
      />

      <CustomButton
        style={{
          marginTop: 50,
        }}
        backgroundColor={colors.green}
        text={t('recover')}
        onClick={recoverHandler}
        disabled={loading}
      />
    </Page>
  );
};

export default withRouter(RecoverPasswordScreen);
