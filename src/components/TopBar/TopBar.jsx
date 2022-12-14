import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Title,
  LeftButton,
  AccessibilityButton,
  CloseButton,
  TopBarContainer,
  MagnifierButton,
  Logo,
} from './TopBar.styles';
import BackIcon from '../../assets/icons/back.svg';
import CloseIcon from '../../assets/icons/close.svg';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import map4AccessibilityIcon from '../../assets/icons/map4accessibility_logo.svg';
import Magnifier from '../../assets/icons/places/magnifier.svg';

const TopBar = (props) => {
  const {
    history,
    hasBackButton,
    backTarget,
    backgroundColor,
    title,
    hasIcon,
    hasAccessibilityButton,
    leftButton,
    hasCloseButton,
    hasLogo,
    accessibility,
    aligned,
    page,
    magnifier,
  } = props;

  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  return (
    <TopBarContainer
      backgroundColor={backgroundColor}
      className={accessibility ? 'accessibility' : null}
    >
      {hasBackButton && (
        <LeftButton type="button" onClick={backTarget || history.goBack}>
          <img src={BackIcon} alt="back" />
        </LeftButton>
      )}

      {leftButton && (
        <LeftButton type="button" onClick={leftButton.action}>
          <img src={leftButton.icon} alt={leftButton.description} />
        </LeftButton>
      )}

      {title && (
        <Title className={page ? 'page' : null} fontSize={fontSize} font={font}>
          {hasIcon && <img src={AccessibilityIcon} alt="Accessibility" />}
          {title}
        </Title>
      )}

      {magnifier && (
        <MagnifierButton type="button">
          <img src={Magnifier} alt="Magnifier" />
        </MagnifierButton>
      )}

      {hasAccessibilityButton && (
        <AccessibilityButton type="button" onClick={hasAccessibilityButton}>
          <img src={AccessibilityIcon} alt="Accessibility" />
        </AccessibilityButton>
      )}

      {hasCloseButton && (
        <CloseButton type="button" onClick={history.goBack}>
          <img src={CloseIcon} alt="back" />
        </CloseButton>
      )}

      {hasLogo && (
        <Logo className={aligned ? 'aligned' : null}>
          <img src={map4AccessibilityIcon} alt="Logo" />
        </Logo>
      )}
    </TopBarContainer>
  );
};

export default withRouter(TopBar);
