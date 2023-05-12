import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ThubsUpIcon from '../../assets/icons/maps/up.svg';
import ThubsDownIcon from '../../assets/icons/maps/down.svg';
import NeutralIcon from '../../assets/icons/places/neutral.svg';
import StepsIcon from '../../assets/icons/maps/steps.svg';
import GoToIcon from '../../assets/icons/maps/goTo.svg';
import { colors } from '../../constants/colors';
import {
  RouteContainer,
  Name,
  ContainerName,
  Distance,
  Ratings,
  CTA,
  GoToMaps,
  Steps,
  Rating,
  Icon,
  Number,
  Index,
} from './RouteOption.styles';
import { getGoogleMapsUrl } from '../../helpers/utils';

const MapRoute = ({ route, setRoute, active, history }) => {
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const googleMaps = getGoogleMapsUrl(route.origin, route.destination);
  const openSteps = () => {
    history.push('/route/'.concat(route.id));
  };

  return (
    <RouteContainer onClick={() => setRoute(route.id)}>
      <ContainerName>
        <Name fontSize={fontSize} font={font}>
          {route.name}
        </Name>
        <Index active={active}>{route.key}</Index>
      </ContainerName>
      <Distance fontSize={fontSize} font={font}>
        {route.distance}
      </Distance>
      <Ratings fontSize={fontSize} font={font}>
        <Rating>
          <Icon>
            <img src={ThubsUpIcon} alt="Likes" />
          </Icon>
          <Number color={colors.green}>{route.likes}</Number>
        </Rating>
        <Rating>
          <Icon>
            <img className="neutral" src={NeutralIcon} alt="Neutral" />
          </Icon>
          <Number color={colors.orange}>{route.neutrals}</Number>
        </Rating>
        <Rating>
          <Icon>
            <img src={ThubsDownIcon} alt="Dislikes" />
          </Icon>
          <Number color={colors.red}>{route.dislikes}</Number>
        </Rating>
      </Ratings>
      <CTA>
        <GoToMaps
          fontSize={fontSize}
          font={font}
          href={googleMaps}
          target="_blank"
        >
          <Icon>
            <img src={GoToIcon} alt="GoTo" />
          </Icon>
          {t('go_to_maps')}
        </GoToMaps>
        <Steps onClick={openSteps} fontSize={fontSize} font={font}>
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
