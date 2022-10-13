import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Title,
  LeftButton,
  AccessibilityButton,
  CloseButton,
  TopBarContainer,
} from './TopBar.styles';
import BackIcon from '../../assets/images/old_delete/back.svg';
import CloseIcon from '../../assets/icons/close.svg';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';

const TopBar = (props) => {
  const {
    history,
    hasBackButton,
    backgroundColor,
    title,
    hasIcon,
    hasAccessibilityButton,
    leftButton,
    hasCloseButton,
  } = props;

  const fontSize = useSelector((state) => state.accessibilityReducer.fontSize);

  return (
    <TopBarContainer backgroundColor={backgroundColor}>
      {hasBackButton && (
        <LeftButton type="button" onClick={history.goBack}>
          <img src={BackIcon} alt="back" />
        </LeftButton>
      )}

      {leftButton && (
        <LeftButton type="button" onClick={leftButton.action}>
          <img src={leftButton.icon} alt={leftButton.description} />
        </LeftButton>
      )}

      {title && (
        <Title fontSize={fontSize}>
          {hasIcon && <img src={AccessibilityIcon} alt="Accessibility" />}
          {title}
        </Title>
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
    </TopBarContainer>
  );
};

export default withRouter(TopBar);
