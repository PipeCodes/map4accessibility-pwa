import React, { useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Page,
  Container,
  Region,
  Avatar,
  UsernameContainer,
  Username,
  EditButton,
  ScoreContainer,
  ScoreImg,
  Score,
  PrivacyPolicyLink,
  UserInfoContainer,
  EditableContainer,
  StatsContainer,
  StatsItem,
  StatsItemCount,
  StatsItemTitle,
  TopWrapper,
  BottomWrapper,
  LogoutButton,
} from './ProfileScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import { getUser, logout } from '../../store/actions/auth';
import FooterBar from '../../components/FooterBar/FooterBar';
import FAQsIcon from '../../assets/images/old_delete/faqs.svg';
import LogoutIcon from '../../assets/images/old_delete/logout.svg';
import EditIcon from '../../assets/images/old_delete/edit.svg';
import StarIcon from '../../assets/images/old_delete/star.svg';
import { AVATARS } from '../../constants';

const ProfileScreen = (props) => {
  const navigate = useNavigate();
  const { history, routes } = props;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);

  const avatar = useMemo(
    () => AVATARS.find((a) => a.id === user?.avatar)?.element,
    [user],
  );

  const openFAQs = useCallback(() => {
    navigate(routes.FAQS.path);
  }, [history, routes]);

  const logoutHandler = useCallback(() => {
    const canLogout = confirm(t('logout_confirm_message'));

    if (canLogout) {
      dispatch(logout());
    }
  }, [dispatch, t]);

  const topRightButton = useMemo(
    () => ({
      action: openFAQs,
      icon: FAQsIcon,
      description: 'faqs',
    }),
    [openFAQs],
  );

  const editHandler = () => {
    navigate(routes.EDIT_PROFILE.path);
  };

  const privacyHandler = () => {
    navigate(routes.POLICY.path);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Page>
      <TopBar title={t('my_profile')} rightButton={topRightButton} />
      <Container>
        <TopWrapper>
          <ScoreContainer>
            <Score>{user?.points}</Score>
            <ScoreImg src={StarIcon} alt="points" />
          </ScoreContainer>

          <EditableContainer>
            <UserInfoContainer>
              <Avatar src={avatar} alt="avatar" />
              <UsernameContainer>
                <Username>{user?.username}</Username>
                <Region>{user?.region?.name}</Region>
              </UsernameContainer>
            </UserInfoContainer>
            <EditButton onClick={editHandler} src={EditIcon} />
          </EditableContainer>

          <StatsContainer>
            <StatsItem>
              <StatsItemCount>{user?.quizzes_played}</StatsItemCount>
              <StatsItemTitle
                dangerouslySetInnerHTML={{ __html: t('quizzes_played') }}
              />
            </StatsItem>
            <StatsItem>
              <StatsItemCount>{user?.quizzes_completed}</StatsItemCount>
              <StatsItemTitle
                dangerouslySetInnerHTML={{ __html: t('quizzes_completed') }}
              />
            </StatsItem>
          </StatsContainer>
        </TopWrapper>

        <BottomWrapper>
          <PrivacyPolicyLink
            onClick={privacyHandler}
          >
            {t('privacy_policy')}
          </PrivacyPolicyLink>

          <LogoutButton onClick={logoutHandler}>
            <img src={LogoutIcon} alt="logout" />
            <span>{t('logout')}</span>
          </LogoutButton>
        </BottomWrapper>
      </Container>

      <FooterBar routes={routes} />
    </Page>
  );
};

export default ProfileScreen;
