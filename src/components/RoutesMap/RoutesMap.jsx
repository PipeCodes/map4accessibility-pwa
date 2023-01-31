import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { Routes } from './RoutesMap.styles';
import { getPlacesRadiusMarkers } from '../../store/actions/places';
import {
  changeRouteId,
  changeDirections,
} from '../../store/actions/directions';
import { colors } from '../../constants/colors';
import RouteOption from '../RouteOption/RouteOption';
import CustomMarker from '../CustomMarker/CustomMarker';
import PlacesVisited from '../PlacesVisited/PlacesVisited';
import MapZoom from '../MapZoom/MapZoom';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const Map = ({ origin, destination, routes, userLocation, history }) => {
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const directions = useSelector((state) => state.directions.directions);
  const selectedRoute = useSelector((state) => state.directions.selectedRoute);
  const [generatingRoutes, setGeneratingRoutes] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const dispatch = useDispatch();

  const polylineOptions = useCallback(
    (index) => {
      if (index === selectedRoute) {
        return {
          strokeColor: colors.primaryColor,
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

  // Using Dirtections Service gets directions for current origin and destination
  const setDirections = (originRoute, destinationRoute) => {
    setGeneratingRoutes(true);

    const directionsService = new google.maps.DirectionsService(); // Direction Service

    directionsService
      .route({
        origin: originRoute,
        destination: destinationRoute,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((results) => {
        let i = 1; // Counter to stop when all results were iterated
        const verifiedRatings = []; // Array for Verified Ratings
        const verifiedMarkers = []; // Arrau for Verified Markers

        // Iterates each route from the results that Directions Service returned
        results.routes.forEach((route, routeId) => {
          // Requests markers from API using the center coords of
          // the current overview Path and a radius thats half the distance

          // Radius to make a circumference around the route to find markers
          const radius = Math.round(route.legs[0].distance.value / 2);

          // Latitude point of the center of the route
          const latitude =
            route.overview_path[
              Math.round(route.overview_path.length / 2)
            ]?.lat();

          // Longitude point of the center of the path
          const longitude =
            route.overview_path[
              Math.round(route.overview_path.length / 2)
            ]?.lng();

          // Uses previous data "radius", "latitude" and longitude to find markers around route
          dispatch(
            getPlacesRadiusMarkers(latitude, longitude, Math.round(radius)),
          )
            .then((markersList) => {
              // References for checking if point is inside the tolerance area near the route (currently 15m)
              // https://googlemaps.github.io/android-maps-utils/javadoc/com/google/maps/android/PolyUtil.html#isLocationOnEdge-LatLng-java.util.List-boolean-double-
              // https://developers.google.com/maps/documentation/javascript/reference#poly
              // https://stackoverflow.com/questions/47860177/google-maps-js-api-b-get-is-not-a-function-errorislocationonedge

              // Sets up route polyline and isLocationOnEdge function
              const isLocationOnEdge =
                google.maps.geometry.poly.isLocationOnEdge;
              const routePoly = new google.maps.Polyline({
                path: route.overview_path,
              });

              // Local Variables to sum verified results
              let likes = 0;
              let dislikes = 0;
              const markersLocal = [];

              // Iterates Markers
              markersList.forEach((marker) => {
                // Checks if the marker is 15m around each point of the route
                const check = isLocationOnEdge(
                  new google.maps.LatLng(marker.latitude, marker.longitude),
                  routePoly,
                  0.0015,
                );
                // If the marker is near the route it is added to the array,
                // and likes/dislikes are counted
                if (check) {
                  markersLocal.push(marker);
                  likes += marker.thumbs_up_count;
                  dislikes += marker.thumbs_down_count;
                }
              });

              // Once all markers all markers for a route are checked the objects
              // are pushed to the correpondent arrays
              verifiedRatings[routeId] = { likes, dislikes };
              verifiedMarkers[routeId] = markersLocal;

              // If it has iterated all results the directions are saved with redux
              if (results.routes.length === i) {
                dispatch(
                  changeDirections(
                    results,
                    verifiedRatings,
                    verifiedMarkers,
                    originRoute,
                    destinationRoute,
                  ),
                );
                return;
              }
              i += 1;
            })
            .catch((err) => {
              alert(err);
            });
        });
      });
  };

  const openDetails = useCallback(
    (id) => {
      history.push('/place-details/'.concat(id));
    },
    [history],
  );

  const changeRoute = (id) => {
    if (id !== selectedRoute) {
      setGeneratingRoutes(true);
    }

    dispatch(changeRouteId(id));
  };

  useEffect(() => {
    if (routes) {
      setGeneratingRoutes(false);
    }
  }, [routes]);

  useEffect(() => {
    setGeneratingRoutes(false);
  }, [selectedRoute]);

  useEffect(() => {
    if (
      !(
        origin === null ||
        origin === '' ||
        destination === null ||
        destination === ''
      ) &&
      (!routes ||
        !(routes[0].origin === origin && routes[0].destination === destination))
    ) {
      setDirections(origin, destination);
    }
  }, [origin, destination]);

  if (!destination) {
    return <PlacesVisited history={history} />;
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
        center={userLocation || { lat: 38.736946, lng: -9.142685 }}
        zoom={8}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
        onLoad={(map) => {
          setMap(map);
        }}
      >
        {!generatingRoutes &&
          routes?.length > 0 &&
          routes?.map((route) => (
            <DirectionsRenderer
              directions={directions}
              routeIndex={route.id}
              key={route.id}
              options={{
                polylineOptions: polylineOptions(route.id),
              }}
            />
          ))}

        {routes &&
          routes[selectedRoute]?.markers &&
          routes[selectedRoute]?.markers?.length > 0 &&
          routes[selectedRoute]?.markers?.map((marker, i) => (
            <CustomMarker
              marker={marker}
              key={i}
              onClick={() => openDetails(marker.id)}
              info
            />
          ))}
      </GoogleMap>
      <MapZoom
        zoomIn={() => {
          map.setZoom(map.getZoom() + 1);
        }}
        zoomOut={() => {
          map.setZoom(map.getZoom() - 1);
        }}
      />
      <Routes backgroundColor={backgroundColor}>
        {routes &&
          routes.length > 0 &&
          routes.map((route) => (
            <RouteOption
              route={route}
              setRoute={(id) => changeRoute(id)}
              keyProp={route.id}
              key={route.id}
              active={selectedRoute === route.id}
              history={history}
            />
          ))}
      </Routes>
    </div>
  );
};

export default Map;
