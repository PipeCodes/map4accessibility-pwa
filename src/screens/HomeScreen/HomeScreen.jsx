import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import { Page, Container, Text, MyArea } from './HomeScreen.styles';
import { getUser } from '../../store/actions/auth';
import LatestComments from '../../components/LatestComments/LatestComments';
import { getMyPlaceEvaluations } from '../../store/actions/placeEvaluations';
import MyCommentsStatus from '../../components/MyCommentsStatus/MyCommentsStatus';

const HomeScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myEvaluations = useSelector(
    (state) => state.placeEvaluations.evaluations,
  );
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Gets user info on load
  useEffect(() => {
    dispatch(getUser());
    dispatch(getMyPlaceEvaluations());
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
        <MyArea backgroundColor={backgroundColor}>
          <MyCommentsStatus
            positive={11} // Placeholder
            negative={13} // Placeholder
            accepted={21} // Placeholder
            rejected={1} // Placeholder
            pending={2} // Placeholder
            comments={myEvaluations} // Placeholder
          />
          <LatestComments myComments comments={myEvaluations} />
        </MyArea>
      </Container>
      <FooterMenu routes={routes} home />
    </Page>
  );
};

export default withRouter(HomeScreen);
