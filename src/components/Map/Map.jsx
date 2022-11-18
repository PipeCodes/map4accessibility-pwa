import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import CustomMarker from '../CustomMarker/CustomMarker';
import { Routes } from './Map.styles';
import MapRoute from '../MapRoute/MapRoute';
import markers from '../../helpers/DemoData/MarkerList.json';
import { colors } from '../../constants/colors';

// Needs to be called from the API in the future
const markerList = markers;

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const options = ['A', 'B', 'C', 'D', 'E']; // List for Route Keys

const Map = ({ origin, destination, userLocation }) => {
  // const [center, setCenter] = useState({ lat: 38.0, lng: -9.0 }); // Default Center is LX
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directions, setDirections] = useState(null); // Possible Routes from google maps api
  // const [markers, setMarkers] = useState([]); // Markers Around the route
  const [routes, setRoutes] = useState(null); // Fills List on the bottom of the page
  const [selectedRoute, setSelectedRoute] = useState(0); // Route thats active

  const [generatingRoutes, setGeneratingRoutes] = useState(false);

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
      name: 'Route '.concat(options[i]),
      distance: route.legs[0].distance.text,
      likes: 234,
      dislikes: 197,
      steps: [route.legs[0].steps],
    }));

  // Draws the routes in the map using the directions from Dirtections Service and resets the variables
  const drawRoute = (originRoute, destinationRoute, selectedRouteId) => {
    // setMarkers(markerList);
    setGeneratingRoutes(true);

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
    return <>test</>;
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
      </GoogleMap>
      <Routes>
        {routes &&
          routes.length > 0 &&
          routes.map((route, i) => (
            <MapRoute
              route={route}
              setRoute={(routeId) => drawRoute(origin, destination, routeId)}
              keyProp={i}
              key={i}
            />
          ))}
      </Routes>
    </div>
  );
};

export default Map;
