import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/colors';
import ThubsUpIcon from '../../assets/icons/maps/up.svg';
import ThubsDownIcon from '../../assets/icons/maps/down.svg';
import NeutralIcon from '../../assets/icons/places/neutral.svg';
import { getGoogleMapsUrl } from '../../helpers/utils';
import GoToIcon from '../../assets/icons/maps/goTo.svg';
import RouteIcon from '../../assets/icons/maps/route.svg';
import Step from '../../components/Step/Step';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import LocationIcon from '../../assets/icons/maps/location.svg';
import {
  Page,
  TopWrapper,
  Container,
  CTA,
  Name,
  ContainerName,
  Distance,
  Ratings,
  Rating,
  Icon,
  Number,
  Index,
  GoToMaps,
  BackToRoutes,
  Title,
  AccessibilityButton,
  Text,
  Start,
} from './SingleRouteScreen.styles';

const SingleRouteScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();

  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  // Gets params from URL using ReactRouter and sets current route info
  const params = useParams();
  const routesMap = useSelector((state) => state.directions.routes);
  const route = routesMap[params.id];
  const googleMaps = getGoogleMapsUrl(route.origin, route.destination);

  const steps = route.steps[0];
  return (
    <Page backgroundColor={backgroundColor}>
      <TopWrapper backgroundColor={backgroundColor}>
        <ContainerName>
          <Name fontSize={fontSize} font={font}>
            {route?.name}
          </Name>
          <Index active>{route?.key}</Index>
        </ContainerName>
        <Distance fontSize={fontSize} font={font}>
          {route?.distance}
        </Distance>
        <Ratings fontSize={fontSize} font={font}>
          <Rating>
            <Icon>
              <img src={ThubsUpIcon} alt="Likes" />
            </Icon>
            <Number color={colors.green}>{route?.likes}</Number>
          </Rating>
          <Rating>
            <Icon>
              <img className="neutral" src={NeutralIcon} alt="Neutral" />
            </Icon>
            <Number color={colors.orange}>{route?.neutrals}</Number>
          </Rating>
          <Rating>
            <Icon>
              <img src={ThubsDownIcon} alt="Dislikes" />
            </Icon>
            <Number color={colors.red}>{route?.dislikes}</Number>
          </Rating>
        </Ratings>
        <AccessibilityButton type="button" onClick={openAccessibility}>
          <img src={AccessibilityIcon} alt="Accessibility" />
        </AccessibilityButton>
      </TopWrapper>
      <Container backgroundColor={backgroundColor}>
        <Title fontSize={fontSize} font={font}>
          {t('steps')}
        </Title>
        <Start>
          <Icon>
            <img src={LocationIcon} alt="Location" />
          </Icon>
          <Text fontSize={fontSize} font={font}>
            {t('your_location')}
          </Text>
        </Start>
        {steps.map((step, id) => (
          <Step
            key={id}
            instructions={step.instructions}
            distance={step.distance.text}
            maneuver={step.maneuver}
          />
        ))}
      </Container>
      <CTA backgroundColor={backgroundColor}>
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
        <BackToRoutes onClick={history.goBack} fontSize={fontSize} font={font}>
          <Icon>
            <img src={RouteIcon} alt="Steps" />
          </Icon>
          {t('show_route')}
        </BackToRoutes>
      </CTA>
    </Page>
  );
};

export default withRouter(SingleRouteScreen);
