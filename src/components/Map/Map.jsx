import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import CustomMarker from '../CustomMarker/CustomMarker';
import { Routes } from './Map.styles';
import MapRoute from '../MapRoute/MapRoute';
import markers from '../../helpers/DemoData/MarkerList.json';

// Needs to be called from the API in the future
const markerList = markers;

const Map = ({ origin, destination, isLoaded, location }) => {
  const dispatch = useDispatch();
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(location || { lat: 38.0, lng: -9.0 });
  const [routes, setRoutes] = useState(null);
  const [map, setMap] = useState(null);
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };
  const options = ['A', 'B', 'C'];

  const formatRoutes = (routes) =>
    routes.map((route, i) => ({
      name: 'Route '.concat(options[i]),
      distance: route.legs[0].distance.text,
      likes: 234,
      dislikes: 197,
      steps: [route.legs[0].steps],
    }));

  const drawRoute = async (origin, destination) => {
    setCenter(null);
    setDirections(null);
    setRoutes(null);

    const directionsService = new window.google.maps.DirectionsService();
    const directions = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.WALKING,
      provideRouteAlternatives: true,
    });

    setRoutes(formatRoutes(directions.routes));
    setCenter(directions.routes[0].bounds.getCenter());
    setDirections(directions);
    //
  };

  // Loads Map
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  // Unmounts Map
  const onUnmount = useCallback((_) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (
      origin === null ||
      origin === '' ||
      destination === null ||
      destination === ''
    ) {
      return;
    }

    drawRoute(origin, destination);
  }, [origin, destination]);

  /* MARKERS FROM API */
  useEffect(() => {
    setMarkers([]);
    if (!directions) {
      return;
    }
    setMarkers(markerList);
  }, [map, directions]);

  return isLoaded ? (
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
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <DirectionsRenderer direction={directions} />

        {markers &&
          markers.length > 0 &&
          markers.map((marker, i) => <CustomMarker marker={marker} key={i} />)}
      </GoogleMap>
      <Routes>
        {routes &&
          routes.length > 0 &&
          routes.map((route, i) => <MapRoute route={route} key={i} />)}
      </Routes>
    </div>
  ) : (
    <p>Problems with google maps</p>
  );
};

export default Map;
