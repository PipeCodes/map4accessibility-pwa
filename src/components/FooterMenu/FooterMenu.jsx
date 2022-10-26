import React from 'react';
import { withRouter } from 'react-router-dom';
import { FooterBarContainter, MenuButton } from './FooterMenu.styles';
import { colors } from '../../constants/colors';
import HomeIcon from '../../assets/icons/menu-home.svg';
import HomeActiveIcon from '../../assets/icons/menu-home-active.svg';
import ProfileIcon from '../../assets/icons/menu-profile.svg';
import ProfileActiveIcon from '../../assets/icons/menu-profile-active.svg';
import MapIcon from '../../assets/icons/menu-map.svg';
import MapActiveIcon from '../../assets/icons/menu-map-active.svg';

const FooterBar = (props) => {
  const { history, routes, home, map, profile } = props;

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
    <FooterBarContainter {...colors}>
      <MenuButton type="button" onClick={mapClickHandler}>
        {map ? (
          <img src={MapActiveIcon} alt="map" />
        ) : (
          <img src={MapIcon} alt="map active" />
        )}
      </MenuButton>
      <MenuButton type="button" onClick={homeClickHandler}>
        {home ? (
          <img src={HomeActiveIcon} alt="home active" />
        ) : (
          <img src={HomeIcon} alt="home" />
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
