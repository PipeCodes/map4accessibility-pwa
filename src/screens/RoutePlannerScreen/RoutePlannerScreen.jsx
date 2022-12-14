import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import BackIcon from '../../assets/icons/back.svg';
import LocationIcon from '../../assets/icons/maps/location.svg';
import DestinationIcon from '../../assets/icons/maps/destination.svg';
import ArrowsIcon from '../../assets/icons/arrows.svg';
import Map from '../../components/Map/Map';
import {
  Page,
  Container,
  TopContainer,
  LeftButton,
  AccessibilityButton,
  RouteInputs,
  Icons,
  Input,
  Inputs,
} from './RoutePlannerScreen.styles';

const libraries = ['places'];

const RoutePlannerScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();

  const originInputRef = useRef(null);

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const [origin, setOrigin] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      // Asks and sets user position (lat, long)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setOrigin({ lat: latitude, lng: longitude });
          setUserLocation({ lat: latitude, lng: longitude });

          if (originInputRef.current) {
            originInputRef.current.value = t('your_location');
          }
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        },
      );
    }
  }, [isLoaded, t]);

  // Click handlers
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopContainer destination={destination}>
        <LeftButton type="button" onClick={history.goBack}>
          <img src={BackIcon} alt="back" />
        </LeftButton>
        {isLoaded && (
          <RouteInputs>
            <Icons>
              <img src={LocationIcon} alt="back" />
              <img src={ArrowsIcon} alt="back" />
              <img src={DestinationIcon} alt="back" />
            </Icons>
            <Inputs>
              <Autocomplete>
                <Input
                  ref={originInputRef}
                  fontSize={fontSize}
                  font={font}
                  type="text"
                  onBlur={(e) => setOrigin(e.target.value)}
                />
              </Autocomplete>
              <Autocomplete>
                <Input
                  fontSize={fontSize}
                  font={font}
                  type="text"
                  onBlur={(e) => setDestination(e.target.value)}
                />
              </Autocomplete>
            </Inputs>
          </RouteInputs>
        )}
        <AccessibilityButton type="button" onClick={openAccessibility}>
          <img src={AccessibilityIcon} alt="Accessibility" />
        </AccessibilityButton>
      </TopContainer>
      <Container>
        <Map
          origin={origin}
          destination={destination}
          userLocation={userLocation}
          history={history}
        />
      </Container>
    </Page>
  );
};

export default withRouter(RoutePlannerScreen);
