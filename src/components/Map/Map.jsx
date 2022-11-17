import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import CustomMarker from '../CustomMarker/CustomMarker';
import { Routes } from './Map.styles';
import MapRoute from '../MapRoute/MapRoute';
import markers from '../../helpers/DemoData/MarkerList.json';
import { colors } from '../../constants/colors';

// Needs to be called from the API in the future
const markerList = markers;

const Map = ({ origin, destination, isLoaded, location }) => {
  const [directions, setDirections] = useState(null); // Possible Routes from google maps api
  const [markers, setMarkers] = useState([]); // Markers Around the route
  const [center, setCenter] = useState(location || { lat: 38.0, lng: -9.0 }); // Default Center is LX
  const [routes, setRoutes] = useState(null); // Fills List on the bottom of the page
  const [selectedRoute, setSelectedRoute] = useState(0); // Route thats active
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // Map styling
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };
  const options = ['A', 'B', 'C', 'D', 'E']; // List for Route Keys

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

  // Resets the all the variables around the map state
  const resetRoutes = () => {
    setCenter(null);
    setDirections(null);
    setRoutes(null);
    setMarkers([]);
  };

  // Draws the routes in the map using the directions from Dirtections Service and resets the variables
  const drawRoute = async (origin, destination, selectedRoute) => {
    resetRoutes();
    setMarkers(markerList);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin,
      destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
      provideRouteAlternatives: true,
    });
    console.log(results);
    console.log(map);
    setDirections(results);
    setSelectedRoute(selectedRoute);
    setRoutes(formatRoutes(results.routes));
  };

  useEffect(() => {
    if (
      (origin === null || origin === '') &&
      (destination === null || destination === '')
    ) {
      return;
    }
    drawRoute(origin, destination, selectedRoute);
  }, [origin, destination, selectedRoute]);

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
        zoom={8}
        onLoad={(map) => setMap(map)}
        onUnmount={(_) => setMap(null)}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
      >
        {directions &&
          routes.length > 0 &&
          routes.map((route, i) =>
            i === selectedRoute ? (
              <DirectionsRenderer
                directions={directions}
                routeIndex={i}
                key={route.key}
                options={{
                  polylineOptions: {
                    strokeColor: '#34518d',
                    strokeOpacity: 1,
                    strokeWeight: 6,
                  },
                }}
              />
            ) : (
              <DirectionsRenderer
                directions={directions}
                routeIndex={i}
                key={route.key}
                options={{
                  polylineOptions: {
                    strokeColor: colors.grey,
                    strokeOpacity: 0.4,
                    strokeWeight: 6,
                  },
                }}
              />
            ),
          )}
        {markers &&
          markers.length > 0 &&
          markers.map((marker, i) => <CustomMarker marker={marker} key={i} />)}
      </GoogleMap>
      <Routes>
        {routes &&
          routes.length > 0 &&
          routes.map((route, i) => (
            <MapRoute
              route={route}
              setRoute={setSelectedRoute}
              keyProp={i}
              key={i}
            />
          ))}
      </Routes>
    </div>
  ) : (
    <p>Problems with google maps</p>
  );
};

export default Map;
