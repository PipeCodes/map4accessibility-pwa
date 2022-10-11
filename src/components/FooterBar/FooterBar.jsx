import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { FooterBarContainter, FooterButton, Icon, Overlay, Saturation } from './FooterBar.styles';
import { colors } from '../../constants/colors';
import RankingIcon from '../../assets/images/old_delete/ranking_inactive.svg';
import ProfileIcon from '../../assets/images/old_delete/profile_inactive.svg';

const FooterBar = (props) => {
  const { history, routes, activeColor } = props;

  const isRankingActive = useMemo(
    () => history.location.pathname === routes.RANKING.path,
    [history, routes],
  );

  const isProfileActive = useMemo(
    () =>
      history.location.pathname === routes.PROFILE.path ||
      history.location.pathname === routes.FAQS.path,
    [history, routes],
  );

  const rankingClickHandler = () => {
    history.push(routes.RANKING.path);
  };

  const profileClickHandler = () => {
    history.push(routes.PROFILE.path);
  };

  return (
    <FooterBarContainter {...colors}>
      <FooterButton type="button" onClick={rankingClickHandler}>
      { isRankingActive ? <Overlay color={activeColor} /> : <Saturation />}
        <Icon
          alt="ranking"
          src={RankingIcon}
        />
      </FooterButton>
      <FooterButton type="button" onClick={alert("TODO")}>
        <Icon
          alt="TODO"
          src={RankingIcon}
        />
      </FooterButton>
      <FooterButton type="button" onClick={profileClickHandler}>
      { isProfileActive ? <Overlay color={activeColor} /> : <Saturation />}
        <Icon
          alt="profile"
          src={ProfileIcon}
        />
      </FooterButton>
    </FooterBarContainter>
  );
};

export default withRouter(FooterBar);
