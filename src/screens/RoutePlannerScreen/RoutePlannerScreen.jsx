import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
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

const RoutePlannerScreen = (props) => {
  const { history, routes } = props;
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [location, setLocation] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ lat: latitude, lng: longitude });
        setOrigin({ lat: latitude, lng: longitude });
        document.querySelector('#origin').value = 'Your Location';
      },
      (error) => {
        console.error(`Error Code = ${error.code} - ${error.message}`);
      },
    );
  }, []);

  // Click handlers
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopContainer>
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
                  fontSize={fontSize}
                  id="origin"
                  type="text"
                  onBlur={(e) => setOrigin(e.target.value)}
                />
              </Autocomplete>
              <Autocomplete>
                <Input
                  fontSize={fontSize}
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
        {destination !== null ? (
          <Map
            origin={origin === 'Your Location' ? location : origin}
            destination={destination}
            isLoaded={isLoaded}
            location={location}
          />
        ) : (
          <div>RECENTLY VISITED COMPONENT PLACEHOLDER</div>
        )}
      </Container>
    </Page>
  );
};

export default RoutePlannerScreen;
