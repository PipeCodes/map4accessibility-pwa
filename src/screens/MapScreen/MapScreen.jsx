import React, { useEffect, useState, useCallback } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import LocationIcon from '../../assets/icons/maps/locate.svg';
import AddIcon from '../../assets/icons/maps/add.svg';
import DirectionsIcon from '../../assets/icons/maps/directions.svg';

import {
  Page,
  Container,
  ButtonsContainer,
  ButtonCreate,
  ButtonDirections,
  ButtonLocation,
} from './MapScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  maxWidth: '820px',
  top: '0',
};
const libraries = ['places'];
const MapScreen = (props) => {
  const { history, routes } = props;

  // Google Maps
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [location, setLocation] = useState(null);
  const { t } = useTranslation();
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  useEffect(() => {
    if (isLoaded) {
      // Asks and sets user position (lat, long)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        },
      );
    }
  }, [isLoaded, t]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const openAddPlace = useCallback(() => {
    history.push(routes.ADD_PLACE.path);
  }, [history, routes]);

  const openRoutes = useCallback(() => {
    history.push(routes.ROUTE_PLANNER.path);
  }, [history, routes]);

  const setCenterMap = () => {
    console.log('Ill center you, dont worry.');
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('map')}
      />
      <Container>
        {isLoaded && (
          <div
            style={{
              width: '100vw',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '820px',
            }}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || { lat: 38.0, lng: -9.0 }}
              zoom={16}
              onLoad={(map) => setMap(map)}
              onUnmount={() => setMap(null)}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                disableDefaultUI: true,
              }}
            />
          </div>
        )}
      </Container>
      <ButtonsContainer>
        <ButtonCreate type="button" onClick={() => openAddPlace()}>
          <img src={AddIcon} alt={t('add_place')} />
        </ButtonCreate>
        <ButtonDirections type="button" onClick={() => openRoutes()}>
          <img src={DirectionsIcon} alt={t('route_planner')} />
        </ButtonDirections>
        <ButtonLocation type="button" onClick={() => setCenterMap()}>
          <img src={LocationIcon} alt={t('location')} />
        </ButtonLocation>
      </ButtonsContainer>
      <FooterMenu routes={routes} map />
    </Page>
  );
};

export default withRouter(MapScreen);
