import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import BackIcon from '../../assets/icons/back.svg';
import LocationIcon from '../../assets/icons/maps/location.svg';
import DestinationIcon from '../../assets/icons/maps/destination.svg';
import ArrowsIcon from '../../assets/icons/arrows.svg';
import RoutesMap from '../../components/RoutesMap/RoutesMap';
import PlacePopUp from '../../components/PlacePopUp/PlacePopUp';
import {
  getPlace,
  getGooglePlace,
  getMorePlaceInfo,
} from '../../store/actions/places';
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
import { GOOGLE_MAPS_OPTIONS } from '../../constants';
import { getCurrentLocation } from '../../services/geolocation';

const RoutePlannerScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Accessibility
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Google Maps API Loader
  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);

  // Place pop-up
  const [popUp, setPopUp] = useState(false);

  // Gets place from reducer
  const place = useSelector((state) => state.place.place);
  const loading = useSelector((state) => state.place.loading);
  const routesMap = useSelector((state) => state.directions.routes);
  const [userLocation, setUserLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);

  // Asks and sets user position (lat, long) at the beggining
  useEffect(() => {
    getCurrentLocation()
      .then((position) => {
        if ((origin === null || origin === '') && !routesMap) {
          setOrigin(position);
          setUserLocation(position);
          if (originInputRef.current) {
            originInputRef.current.value = t('your_location');
          }
        }
      })
      // eslint-disable-next-line no-undef
      .catch((error) => alert(error));
  });

  // If saved Route Loads data into fields
  useEffect(() => {
    if (routesMap) {
      setOrigin(routesMap[0].origin);
      setDestination(routesMap[0].destination);
      if (originInputRef?.current && destinationInputRef?.current && isLoaded) {
        originInputRef.current.value = routesMap[0]?.origin;
        if (typeof routesMap[0]?.origin !== 'string') {
          originInputRef.current.value = t('your_location');
        }
        destinationInputRef.current.value = routesMap[0].destination;
      }
    }
  }, [routesMap, originInputRef, destinationInputRef, isLoaded, t]);

  // Click handlers
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  // Opens Place PopUp
  const openPlaceInfo = (marker) => {
    if (marker?.google_place_id) {
      dispatch(getGooglePlace(marker?.google_place_id));
      if (marker?.id) {
        dispatch(getMorePlaceInfo(marker?.id));
      }
    } else {
      dispatch(getPlace(marker?.id));
    }
    setPopUp(true);
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <PlacePopUp
        history={history}
        display={popUp}
        place={place}
        setPopUp={setPopUp}
      />
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
                  ref={destinationInputRef}
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
        {loading && (
          <Spinner animation="border" variant="dark" className="spinner" />
        )}
        <RoutesMap
          origin={origin}
          destination={destination}
          userLocation={userLocation}
          history={history}
          routes={routesMap}
          openPlaceInfo={openPlaceInfo}
        />
      </Container>
    </Page>
  );
};

export default withRouter(RoutePlannerScreen);
