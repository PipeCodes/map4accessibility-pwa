import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Page,
  SpinnerWrapper,
  Container,
  QuizList,
  BackgroundWaves,
  Subtitle,
  MoreSoonContainer,
  Illustration,
} from './SelectLevelScreen.styles';
import FooterBar from '../../components/FooterBar/FooterBar';
import { getLevels } from '../../store/actions/levels';
import TopBar from '../../components/TopBar/TopBar';
import QuizItem from '../../components/QuizItem/QuizItem';

const CyclesScreen = (props) => {
  const { history, routes } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [cycle, setCycle] = useState(null);

  const { id: cycleId } = useParams();

  const quizzes = useSelector((state) => state.levels.quizzes);
  const loading = useSelector((state) => state.levels.loading);

  useEffect(() => {
    setCycle(history.location.state.cycle);

    dispatch(getLevels(cycleId));
  }, [dispatch, history, cycleId]);

  const quizClickHandler = (quiz) => {
    history.push({
      pathname: routes.QUIZ.path
        .replace(':cycleId', cycle.id)
        .replace(':quizId', quiz.id),
      state: { cycle },
    });
  };

  return (
    <Page color={cycle?.color}>
      <BackgroundWaves />
      <TopBar hasBackButton title={cycle?.name} />
      {loading || !quizzes || quizzes.length === 0 ? (
        <SpinnerWrapper>
          <div className="spinner-border" role="status" />
        </SpinnerWrapper>
      ) : (
        <Container>
          <Subtitle>{cycle?.subtitle}</Subtitle>
          <MoreSoonContainer>
            <p>{t("more_levels_soon")}</p>
          </MoreSoonContainer>
          <QuizList>
            {quizzes.map((quiz) => (
              <QuizItem
                quiz={quiz}
                key={quiz.id}
                cycleColor={cycle?.color}
                onQuizClick={quizClickHandler}
              />
            ))}
          </QuizList>
          
          <Illustration />
        </Container>
      )}
      <FooterBar routes={routes} activeColor={cycle?.color} />
    </Page>
  );
};

export default withRouter(CyclesScreen);
