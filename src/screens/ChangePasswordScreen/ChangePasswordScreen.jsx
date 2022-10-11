import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../constants/colors';
import { Page, LogoImage, Subtitle } from './ChangePasswordScreen.styles';
import Logo from '../../assets/images/old_delete/logo.svg';
import { changePassword } from '../../store/actions/auth';
import useQuery from '../../helpers/hooks/useQuery';

const ChangePasswordScreen = (props) => {
  const { history, routes } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const query = useQuery();

  const token = useMemo(() => query?.get('token'), [query]);

  const loading = useSelector((state) => state.auth.loading);

  const [newPassword, setNewPassword] = useState('');

  const changeHandler = () => {
    dispatch(changePassword(token, newPassword, t))
      .then((message) => {
        alert(message);
        history.replace(routes.LOGIN.path);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Page>
      <LogoImage className="logo_img" alt="logo" src={Logo} />
      <Subtitle>{t('change_password')}</Subtitle>

      <CustomInput
        style={{
          marginTop: 30,
        }}
        placeholder={t('new_password')}
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
      />

      <CustomButton
        style={{
          marginTop: 50,
        }}
        backgroundColor={colors.green}
        text={t('change')}
        onClick={changeHandler}
        disabled={loading}
      />
    </Page>
  );
};

export default ChangePasswordScreen;
