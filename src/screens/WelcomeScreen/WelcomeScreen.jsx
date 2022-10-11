import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../assets/images/old_delete/logo_blue.svg';
import SplashIllustration from '../../assets/images/old_delete/illustration_splash.svg';
import { Page, LogoImage, Illustration } from './WelcomeScreen.styles';

const WelcomeScreen = (props) => {
  const { history, routes } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push(routes.ONBOARDING.path);
    }, 5000);

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
