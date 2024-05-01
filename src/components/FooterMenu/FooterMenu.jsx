import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FooterBarContainter, MenuButton } from './FooterMenu.styles';
import { colors } from '../../constants/colors';
import { MENU_OPTIONS } from '../../constants/index';
import HomeIcon from '../../assets/icons/footerMenu/menu-home.svg';
import HomeActiveIcon from '../../assets/icons/footerMenu/menu-home-active.svg';
import ProfileIcon from '../../assets/icons/footerMenu/menu-profile.svg';
import ProfileActiveIcon from '../../assets/icons/footerMenu/menu-profile-active.svg';
import MapIcon from '../../assets/icons/footerMenu/menu-map.svg';
import MapActiveIcon from '../../assets/icons/footerMenu/menu-map-active.svg';
import DirectionIcon from '../../assets/icons/footerMenu/menu-directions.svg';
import DirectionActiveIcon from '../../assets/icons/footerMenu/menu-directions-active.svg';

const FooterBar = (props) => {
  const { history, routes, home, map, profile, routePlanner } = props;

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const clickHandler = (page) => {
    let destinationRoute;
    switch (page) {
      case MENU_OPTIONS.HOME:
        destinationRoute = routes.HOME.path;
        break;
      case MENU_OPTIONS.MAP:
        destinationRoute = routes.MAP.path;
        break;
      case MENU_OPTIONS.PROFILE:
        destinationRoute = routes.PROFILE.path;
        break;
      case MENU_OPTIONS.ROUTE_PLANNER:
        destinationRoute = routes.ROUTE_PLANNER.path;
        break;
      default:
        destinationRoute = routes.HOME.path;
    }

    // eslint-disable-next-line no-undef
    if (window.location.pathname !== destinationRoute) {
      history.push(destinationRoute);
    }
  };

  return (
    <FooterBarContainter backgroundColor={backgroundColor} {...colors}>
      <MenuButton
        type="button"
        onClick={() => {
          clickHandler(MENU_OPTIONS.HOME);
        }}
      >
        {home ? (
          <img src={HomeActiveIcon} alt="home active" />
        ) : (
          <img src={HomeIcon} alt="home" />
        )}
      </MenuButton>
      <MenuButton
        type="button"
        onClick={() => {
          clickHandler(MENU_OPTIONS.MAP);
        }}
      >
        {map ? (
          <img src={MapActiveIcon} alt="map active" />
        ) : (
          <img src={MapIcon} alt="map" />
        )}
      </MenuButton>
      <MenuButton
        type="button"
        onClick={() => {
          clickHandler(MENU_OPTIONS.ROUTE_PLANNER);
        }}
      >
        {routePlanner ? (
          <img src={DirectionActiveIcon} alt="directions active" />
        ) : (
          <img src={DirectionIcon} alt="directions" />
        )}
      </MenuButton>
      <MenuButton
        type="button"
        onClick={() => {
          clickHandler(MENU_OPTIONS.PROFILE);
        }}
      >
        {profile ? (
          <img src={ProfileActiveIcon} alt="profile active" />
        ) : (
          <img src={ProfileIcon} alt="profile" />
        )}
      </MenuButton>
    </FooterBarContainter>
  );
};

export default withRouter(FooterBar);
