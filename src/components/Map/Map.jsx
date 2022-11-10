import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import CustomMarker from '../CustomMarker/CustomMarker';

// Needs to be called from the API in the future
const markerList = [
  {
    name: 'Place 1',
    placeType: 'danger',
    likes: 152,
    dislikes: 0,
    coords: {
      lat: 46.122,
      lng: 4.144,
    },
  },
  {
    name: 'Place 2',
    placeType: 'danger',
    likes: 14,
    dislikes: 771,
    coords: {
      lat: 48.122,
      lng: 2.144,
    },
  },
];

const Map = ({ origin, destination, isLoaded, location }) => {
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [center, setCenter] = useState(
    location || {
      lat: 15.0,
      lng: 15.0,
    },
  );

  const drawRoute = async (origin, destination) => {
    setCenter(null);
    setDirections(null);
    setMarkers([]);
    const directionsService = new window.google.maps.DirectionsService();
    const directions = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.WALKING,
    });

    setCenter(directions.routes[0].bounds.getCenter());
    setDirections(directions);
  };

  // Loads Map
  const onLoad = useCallback((/** @type google.maps.Map */ map) => {
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
    if (!directions) {
      return;
    }

    const newCenter = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
    };

    setMarkers(markerList);
  }, [map, directions, location]);

  return isLoaded ? (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {markers &&
          markers.length > 0 &&
          markers.map((marker, i) => <CustomMarker marker={marker} key={i} />)}
      </GoogleMap>
    </div>
  ) : (
    <p>Problems with google maps</p>
  );
};

export default Map;
