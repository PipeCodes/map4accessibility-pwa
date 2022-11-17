import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ThubsUpIcon from '../../assets/icons/maps/up.svg';
import ThubsDownIcon from '../../assets/icons/maps/down.svg';
import StepsIcon from '../../assets/icons/maps/steps.svg';
import GoToIcon from '../../assets/icons/maps/goTo.svg';
import { colors } from '../../constants/colors';
import {
  RouteContainer,
  Name,
  Distance,
  Ratings,
  CTA,
  GoToMaps,
  Steps,
  Rating,
  Icon,
  Number,
} from './MapRoute.styles';

const MapRoute = ({ route, setRoute, keyProp }) => {
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <RouteContainer onClick={() => setRoute(keyProp)}>
      <Name fontSize={fontSize}>{route.name}</Name>
      <Distance fontSize={fontSize}>{route.distance}</Distance>
      <Ratings fontSize={fontSize}>
        <Rating>
          <Icon>
            <img src={ThubsUpIcon} alt="Likes" />
          </Icon>
          <Number color={colors.green}>{route.likes}</Number>
        </Rating>
        <Rating>
          <Icon>
            <img src={ThubsDownIcon} alt="Dislikes" />
          </Icon>
          <Number color={colors.red}>{route.dislikes}</Number>
        </Rating>
      </Ratings>
      <CTA>
        <GoToMaps fontSize={fontSize}>
          <Icon>
            <img src={GoToIcon} alt="GoTo" />
          </Icon>
          {t('go_to_maps')}
        </GoToMaps>
        <Steps fontSize={fontSize}>
          <Icon>
            <img src={StepsIcon} alt="Steps" />
          </Icon>
          {t('steps')}
        </Steps>
      </CTA>
    </RouteContainer>
  );
};
export default MapRoute;
