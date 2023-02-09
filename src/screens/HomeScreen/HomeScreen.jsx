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
import PlacesVisited from '../../components/PlacesVisited/PlacesVisited';

const HomeScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const user = useSelector((state) => state.auth.user);
  const myEvaluations = useSelector(
    (state) => state.placeEvaluations.evaluations,
  );
  const sums = useSelector((state) => state.placeEvaluations.sums);

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
          {t('welcome')} {user?.name} {user?.surname}!
        </Text>
        <MyArea backgroundColor={backgroundColor}>
          <PlacesVisited history={history} />
          <MyCommentsStatus
            positive={sums?.positive || 0}
            negative={sums?.negative || 0}
            accepted={sums?.accepted || 0}
            rejected={sums?.rejected || 0}
            comments={myEvaluations}
          />
          <LatestComments myComments comments={myEvaluations} />
        </MyArea>
      </Container>
      <FooterMenu routes={routes} home />
    </Page>
  );
};

export default withRouter(HomeScreen);
