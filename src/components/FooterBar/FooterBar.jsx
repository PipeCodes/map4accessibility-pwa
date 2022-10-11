import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { FooterBarContainter, FooterButton, Icon, Overlay, Saturation } from './FooterBar.styles';
import { colors } from '../../constants/colors';
import RankingIcon from '../../assets/images/ranking_inactive.svg';
import CyclesIcon from '../../assets/images/cycles_inactive.svg';
import ProfileIcon from '../../assets/images/profile_inactive.svg';

const FooterBar = (props) => {
  const { history, routes, activeColor } = props;

  const isCyclesActive = useMemo(
    () =>
      history.location.pathname === routes.CYCLES.path ||
      history.location.pathname.includes(routes.CYCLES.path),
    [history, routes],
  );

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

  const cyclesClickHandler = () => {
    history.push(routes.CYCLES.path);
  };

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
      <FooterButton type="button" onClick={cyclesClickHandler}>
        { isCyclesActive ? <Overlay color={activeColor} /> : <Saturation />}
        <Icon
          alt="cycles"
          src={CyclesIcon}
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
