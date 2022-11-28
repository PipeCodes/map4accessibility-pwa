import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import CustomMarker from '../CustomMarker/CustomMarker';
import { Routes } from './Map.styles';
import MapRoute from '../MapRoute/MapRoute';

import { colors } from '../../constants/colors';
import { getPlacesRadiusMarkers } from '../../store/actions/places';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const options = ['A', 'B', 'C', 'D', 'E']; // List for Route Keys

const Map = ({ origin, destination, userLocation }) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directions, setDirections] = useState(null); // Possible Routes from google maps api
  const [markers, setMarkers] = useState([]);
  const [routes, setRoutes] = useState(null); // Fills List on the bottom of the page
  const [selectedRoute, setSelectedRoute] = useState(0); // Route thats active
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [generatingRoutes, setGeneratingRoutes] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const polylineOptions = useCallback(
    (index) => {
      if (index === selectedRoute) {
        return {
          strokeColor: '#34518d',
          strokeOpacity: 1,
          strokeWeight: 6,
        };
      }
      return {
        strokeColor: colors.grey,
        strokeOpacity: 0.4,
        strokeWeight: 6,
      };
    },
    [selectedRoute],
  );

  // Formats routes extracted from the directions given by GoogleMaps API to have info to show in list
  const formatRoutes = (routes) =>
    routes.map((route, i) => ({
      key: options[i],
      name: t('route'),
      distance: route.legs[0].distance.text,
      likes: 234,
      dislikes: 197,
      steps: [route.legs[0].steps],
      origin,
      destination,
    }));

  // Draws the routes in the map using the directions from Dirtections Service and resets the variables
  const drawRoute = (originRoute, destinationRoute, selectedRouteId) => {
    setGeneratingRoutes(true);
    setMarkers([]);
    const directionsService = new google.maps.DirectionsService();

    directionsService
      .route({
        origin: originRoute,
        destination: destinationRoute,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((results) => {
        setDirections(results);
        setSelectedRoute(selectedRouteId);
        // Requests markers from API using the center coords of
        // the directions and a radius thats half the distance +25% margin for error
        const radius = Math.round(results.routes[0].legs[0].distance.value / 2);
        const middle = Math.round(results.routes[0].legs[0].steps.length / 2);
        const latitude =
          results.routes[0].legs[0].steps[middle].start_location.lat();
        const longitude =
          results.routes[0].legs[0].steps[middle].start_location.lng();
        dispatch(
          getPlacesRadiusMarkers(
            latitude,
            longitude,
            Math.round(radius + radius / 4),
          ),
        ).then((markersList) => {
          setMarkers(markersList);
        });
      });
  };

  useEffect(() => {
    setRoutes(directions ? [...formatRoutes(directions.routes)] : []);
  }, [directions]);

  useEffect(() => {
    if (routes) {
      setGeneratingRoutes(false);
    }
  }, [routes]);

  useEffect(() => {
    if (
      !(
        origin === null ||
        origin === '' ||
        destination === null ||
        destination === ''
      )
    ) {
      drawRoute(origin, destination, 0);
    }
  }, [origin, destination]);

  if (!destination) {
    return <>ADD LOCALSTORAGE LIST HERE</>;
  }

  return (
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
        center={userLocation || { lat: 38.0, lng: -9.0 }}
        zoom={8}
        onLoad={(map) => setMap(map)}
        onUnmount={() => setMap(null)}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
      >
        {!generatingRoutes &&
          routes?.length > 0 &&
          routes?.map((route, i) => (
            <DirectionsRenderer
              directions={directions}
              routeIndex={i}
              key={route.key}
              options={{
                polylineOptions: polylineOptions(i),
              }}
            />
          ))}
        {markers &&
          markers.length > 0 &&
          markers.map((marker, i) => <CustomMarker marker={marker} key={i} />)}
      </GoogleMap>
      <Routes backgroundColor={backgroundColor}>
        {routes &&
          routes.length > 0 &&
          routes.map((route, i) => (
            <MapRoute
              route={route}
              setRoute={(routeId) => drawRoute(origin, destination, routeId)}
              keyProp={i}
              key={i}
              active={selectedRoute === i}
            />
          ))}
      </Routes>
    </div>
  );
};

export default Map;
