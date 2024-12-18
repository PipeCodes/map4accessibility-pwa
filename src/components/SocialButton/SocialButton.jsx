import React from 'react';
import { useSelector } from 'react-redux';
// import SocialLogin from 'react-social-login';
import ButtonStyle from './SocialButton.styles';

class SocialButton extends React.Component {
  static handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  render() {
    const {
      triggerLogin,
      provider,
      appId,
      text,
      icon,
      backgroundColor,
      style,
      ...otherProps
    } = this.props;
    const fontSize = useSelector((state) => state.accessibility.fontSize);
    const font = useSelector((state) => state.accessibility.font);

    return (
      <ButtonStyle
        provider={provider}
        appId={appId}
        onLoginSuccess={SocialButton.handleSocialLogin}
        onLoginFailure={SocialButton.handleSocialLoginFailure}
        onClick={triggerLogin}
        fontSize={fontSize}
        font={font}
        {...{ backgroundColor }}
        {...{ style }}
        {...otherProps}
      >
        {icon && <img src={icon} alt={text} />}
        {text}
      </ButtonStyle>
    );
  }
}

export default SocialButton;
