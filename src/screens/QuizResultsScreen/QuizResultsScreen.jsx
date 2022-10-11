import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  BackgroundWaves,
  BottomWrapper,
  Container,
  Feedback,
  Page,
  Score,
  ScoreContainer,
  ScoreIcon,
  ScoreTitle,
  TopWrapper,
  UserInfoContainer,
  Username,
} from './QuizResultsScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { resetQuizState } from '../../store/actions/quiz';
import { colors } from '../../constants/colors';
import FooterBar from '../../components/FooterBar/FooterBar';
import WavesImg from '../../assets/images/waves.svg';
import { getLocalUser } from '../../services/local';
import { AVATARS } from '../../constants';
import StarIcon from '../../assets/images/star.svg';

const QuizResultsScreen = (props) => {
  const { history, routes } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [cycle, setCycle] = useState(null);
  const [points, setPoints] = useState(null);

  const loggedUser = useMemo(() => getLocalUser(), []);

  const avatar = useMemo(
    () => AVATARS.find((a) => a.id === loggedUser?.avatar)?.element,
    [loggedUser],
  );

  useEffect(() => {
    const historyState = history.location.state;

    setCycle(historyState?.cycle);
    setPoints(historyState?.points ?? 0);
  }, [history]);

  const goHome = () => {
    dispatch(resetQuizState());

    const historyState = history.location.state;

    history.replace({
      pathname: routes.SELECT_LEVEL.path.replace(':id', historyState?.cycle?.id),
      state: { ...historyState },
    });
  };

  return (
    <Page backgroundColor={cycle?.color}>
      <BackgroundWaves src={WavesImg} />
      <Container>
        <TopWrapper>
          <Feedback>{`${t('thank_you')}!`}</Feedback>
          <UserInfoContainer>
            <Avatar src={avatar} alt="avatar" />
            <Username>{loggedUser?.username}</Username>
          </UserInfoContainer>

          <ScoreTitle>{t('you_won')}</ScoreTitle>
          <ScoreContainer>
            <Score>{points}</Score>
            <ScoreIcon src={StarIcon} alt="score icon" />
          </ScoreContainer>
        </TopWrapper>

        <BottomWrapper>
          <CustomButton
            style={{ marginBottom: 30 }}
            backgroundColor={colors.green}
            color="white"
            text={t('continue')}
            onClick={goHome}
          />
        </BottomWrapper>
      </Container>

      <FooterBar routes={routes} activeColor={cycle?.color} />
    </Page>
  );
};

export default QuizResultsScreen;
