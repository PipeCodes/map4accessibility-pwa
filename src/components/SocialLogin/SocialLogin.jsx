import React, { useCallback } from 'react';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginByProvider } from '../../store/actions/auth';
import FacebookIcon from '../../assets/icons/socials/facebook.svg';
import GoogleIcon from '../../assets/icons/socials/google.svg';
import { PROVIDERS } from '../../constants';
import CustomButton from '../CustomButton/CustomButton';
import { colors } from '../../constants/colors';

const SocialLogin = ({ history, routes }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    <>
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
    </>
  );
};

export default SocialLogin;
