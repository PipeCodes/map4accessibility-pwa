import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Page,
  Container,
  QuizTitle,
  QuestionsCounter,
  Question,
  AnswersContainer,
  AnswerWrapper,
  BackgroundWaves,
  QuizWrapper,
  AnswerFeedbackWrapper,
  AnswerFeedback,
  AnswerFeedbackIcon,
} from './QuizScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import FooterBar from '../../components/FooterBar/FooterBar';
import { getQuiz, registerAnswer } from '../../store/actions/quiz';
import Answer from '../../components/Answer/Answer';
import { ANSWER_STATE } from '../../components/Answer/Answer.constants';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import {
  clearCurrentQuestion,
  getCurrentQuestion,
  setCurrentQuestion,
} from '../../services/local';
import WavesImg from '../../assets/images/waves.svg';
import CorrectIcon from '../../assets/images/correct_answer.svg';
import WrongIcon from '../../assets/images/wrong_answer.svg';

const QuizScreen = (props) => {
  const { history, routes } = props;

  const { cycleId, quizId } = useParams();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const quiz = useSelector((state) => state.quiz.quiz);
  const results = useSelector((state) => state.quiz.quizResults);

  const [question, setQuestion] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const getAnswerState = useCallback(
    (answer) => {
      if (
        !selectedAnswer ||
        (selectedAnswer.id !== answer.id && !answer.is_correct)
      ) {
        return ANSWER_STATE.DEFAULT;
      }

      if (selectedAnswer) {
        return answer.is_correct ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG;
      }

      return ANSWER_STATE.DEFAULT;
    },
    [selectedAnswer],
  );

  const showResults = useCallback(() => {
    const historyState = history.location.state;

    history.replace({
      pathname: routes.QUIZ_RESULTS.path
        .replace(':cycleId', cycleId)
        .replace(':quizId', quizId),
      state: { ...historyState, points: results.points },
    });
  }, [cycleId, history, routes, quizId, results]);

  useEffect(() => {
    const historyState = history.location.state;

    setCycle(historyState?.cycle);

    if (!results && !quiz) {
      dispatch(getQuiz(quizId));
    }
  }, [dispatch, results, quiz, history, quizId]);

  const nextQuestion = useCallback(() => {
    if (results) {
      showResults();
    } else if (quiz?.questions) {
      if (question) {
        if (question.order < quiz.questions.length) {
          setSelectedAnswer(null);
          setQuestion(quiz.questions[question.order]);
          setCurrentQuestion(question.order);
        }
      } else {
        setQuestion(quiz.questions[0]);
      }
    }
  }, [quiz, question, showResults, results]);

  useEffect(() => {
    if (quiz) {
      const localCurrentQuestion = getCurrentQuestion();

      if (localCurrentQuestion) {
        setQuestion(quiz.questions[localCurrentQuestion]);
      } else {
        nextQuestion();
      }
    }
  }, [quiz]);

  useEffect(
    () => () => {
      clearCurrentQuestion();
    },
    [],
  );

  const registerAnswerHandler = useCallback(
    (answer) => {
      setSelectedAnswer(answer);

      dispatch(
        registerAnswer(
          question.id,
          answer.id,
          question.order === quiz.questions.length,
        ),
      ).catch((error) => {
        alert(error);
      });
    },
    [dispatch, question, question, quiz],
  );

  return (
    <Page backgroundColor={cycle?.color}>
      <BackgroundWaves src={WavesImg} />
      <TopBar hasBackButton title={cycle?.name} />
      <Container>
        {quiz && (
          <QuizWrapper>
            <QuizTitle>{`${t('quiz')} ${quiz.level}`}</QuizTitle>
            {question && (
              <>
                <QuestionsCounter>
                  {`${question.order} / ${quiz.questions.length}`}
                </QuestionsCounter>
                {selectedAnswer ? (
                  <AnswerFeedbackWrapper>
                    <AnswerFeedbackIcon
                      src={selectedAnswer.is_correct ? CorrectIcon : WrongIcon}
                      alt="feedback logo"
                    />
                    <AnswerFeedback>
                      {selectedAnswer.is_correct
                        ? t('correct_answer')
                        : t('wrong_answer')}
                      !
                    </AnswerFeedback>
                  </AnswerFeedbackWrapper>
                ) : (
                  <Question>{question.question}</Question>
                )}

                <AnswersContainer>
                  {question.answers?.map((answer) => (
                    <AnswerWrapper key={answer.id}>
                      <Answer
                        answer={answer}
                        state={getAnswerState(answer)}
                        onSelect={registerAnswerHandler}
                      />
                    </AnswerWrapper>
                  ))}
                </AnswersContainer>

                {selectedAnswer && (
                  <CustomButton
                    style={{ marginTop: 28, marginBottom: 30 }}
                    backgroundColor={colors.blue}
                    color="white"
                    text={t('next')}
                    onClick={nextQuestion}
                  />
                )}
              </>
            )}
          </QuizWrapper>
        )}
      </Container>
      <FooterBar routes={routes} activeColor={cycle?.color} />
    </Page>
  );
};

export default withRouter(QuizScreen);
