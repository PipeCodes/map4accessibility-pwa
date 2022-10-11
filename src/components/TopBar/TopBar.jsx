import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Title,
  LeftButton,
  RightButton,
  TopBarContainer,
} from './TopBar.styles';
import BackIcon from '../../assets/images/old_delete/back.svg';

const TopBar = (props) => {
  const {
    history,
    hasBackButton,
    backgroundColor,
    title,
    rightButton,
    leftButton,
  } = props;

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

      {title && <Title>{title}</Title>}

      {rightButton && (
        <RightButton type="button" onClick={rightButton.action}>
          <img src={rightButton.icon} alt={rightButton.description} />
        </RightButton>
      )}
    </TopBarContainer>
  );
};

export default withRouter(TopBar);
