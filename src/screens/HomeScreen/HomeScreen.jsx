import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import { Page, Container, Text } from './HomeScreen.styles';
import { getUser } from '../../store/actions/auth';

const setUser = (user) => {
  const values = {
    firstName: user.name,
    surname: user.surname,
    birthDate: user.birthdate,
    email: user.email,
    avatar: user.avatar,
  };
  return values;
};

const HomeScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Gets user info on load
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
        title={t('home')}
      />
      <Container>
        <Text fontSize={fontSize} font={font}>
          {t('welcome')} {user.name} {user.surname}!
        </Text>
      </Container>
      <FooterMenu routes={routes} home />
    </Page>
  );
};

export default withRouter(HomeScreen);
