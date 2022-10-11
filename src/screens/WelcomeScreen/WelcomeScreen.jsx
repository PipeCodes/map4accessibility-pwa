import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../assets/images/logo_blue.svg';
import SplashIllustration from '../../assets/images/illustration_splash.svg';
import { Page, LogoImage, Illustration } from './WelcomeScreen.styles';

const WelcomeScreen = (props) => {
  const { history, routes } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      history.replace(routes.ONBOARDING.path);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Page>
      <LogoImage className="logo_img" alt="logo" src={Logo} />

      <Illustration alt="illustration" src={SplashIllustration} />
    </Page>
  );
};

export default withRouter(WelcomeScreen);
