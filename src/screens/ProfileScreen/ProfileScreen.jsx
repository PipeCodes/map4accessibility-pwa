import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Page, Container } from './ProfileScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import { getUser } from '../../store/actions/auth';
import FooterMenu from '../../components/FooterMenu/FooterMenu';

const ProfileScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const user = useSelector((state) => state.auth.user);

  const editHandler = () => {
    // history.push(routes.EDIT_PROFILE.path);
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Page>
      <TopBar
        aligned
        page
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
        title={t('profile')}
      />
      <Container>
        <div>Im content</div>
      </Container>
      <FooterMenu routes={routes} profile />
    </Page>
  );
};

export default withRouter(ProfileScreen);
