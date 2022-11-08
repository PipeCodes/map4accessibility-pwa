import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import BackIcon from '../../assets/icons/back.svg';
import {
  Page,
  Container,
  TopContainer,
  LeftButton,
  AccessibilityButton,
  RouteInputs,
} from './RoutePlannerScreen.styles';

const RoutePlannerScreen = (props) => {
  const { history, routes } = props;
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Click handlers
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopContainer>
        <LeftButton type="button" onClick={history.goBack}>
          <img src={BackIcon} alt="back" />
        </LeftButton>
        <RouteInputs>
          <input id="from" />
          <input id="to" />
        </RouteInputs>
        <AccessibilityButton type="button" onClick={openAccessibility}>
          <img src={AccessibilityIcon} alt="Accessibility" />
        </AccessibilityButton>
      </TopContainer>
      <Container>
        <div>Map will be here when fields are filled</div>
      </Container>
    </Page>
  );
};

export default RoutePlannerScreen;
