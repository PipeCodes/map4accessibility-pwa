import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FooterBarContainter, MenuButton } from './FooterMenu.styles';
import { colors } from '../../constants/colors';
import HomeIcon from '../../assets/icons/footerMenu/menu-home.svg';
import HomeActiveIcon from '../../assets/icons/footerMenu/menu-home-active.svg';
import ProfileIcon from '../../assets/icons/footerMenu/menu-profile.svg';
import ProfileActiveIcon from '../../assets/icons/footerMenu/menu-profile-active.svg';
import MapIcon from '../../assets/icons/footerMenu/menu-map.svg';
import MapActiveIcon from '../../assets/icons/footerMenu/menu-map-active.svg';

const FooterBar = (props) => {
  const { history, routes, home, map, profile } = props;

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const homeClickHandler = () => {
    history.push(routes.HOME.path);
  };

  const mapClickHandler = () => {
    history.push(routes.MAP.path);
  };

  const profileClickHandler = () => {
    history.push(routes.PROFILE.path);
  };

  return (
    <FooterBarContainter backgroundColor={backgroundColor} {...colors}>
      <MenuButton type="button" onClick={homeClickHandler}>
        {home ? (
          <img src={HomeActiveIcon} alt="home active" />
        ) : (
          <img src={HomeIcon} alt="home" />
        )}
      </MenuButton>
      <MenuButton type="button" onClick={mapClickHandler}>
        {map ? (
          <img src={MapActiveIcon} alt="map" />
        ) : (
          <img src={MapIcon} alt="map active" />
        )}
      </MenuButton>
      <MenuButton type="button" onClick={profileClickHandler}>
        {profile ? (
          <img src={ProfileActiveIcon} alt="profile" />
        ) : (
          <img src={ProfileIcon} alt="profile active" />
        )}
      </MenuButton>
    </FooterBarContainter>
  );
};

export default withRouter(FooterBar);
