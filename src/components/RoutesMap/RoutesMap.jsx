import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Routes } from './RoutesMap.styles';
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
import { getMarkerColor } from '../../helpers/utils';
import { MARKER_COLOR } from '../../constants';
import { getCurrentLocation } from '../../services/geolocation';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const Map = (props) => {
  const { origin, destination, routes, userLocation, history, openPlaceInfo } =
    props;
  const dispatch = useDispatch();

  // Accessibility
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Saved directions
  const directions = useSelector((state) => state.directions.directions);
  const selectedRoute = useSelector((state) => state.directions.selectedRoute);
  const [generatingRoutes, setGeneratingRoutes] = useState(false);
  const [liveLocation, setLiveLocation] = useState(null);

  // Map and route colours options
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        getCurrentLocation().then((value) => setLiveLocation(value));
      } catch (error) {
        console.log(error);
        alert(t('denied_geo'));
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Click Handlers
  // Change Route
  const changeRoute = (id) => {
    if (id !== selectedRoute) {
      setGeneratingRoutes(true);
    }
    dispatch(changeRouteId(id));
  };

  // Using Dirtections Service gets directions for current origin and destination
  const setDirections = useCallback(
    (originRoute, destinationRoute) => {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService(); // Direction Service
      setGeneratingRoutes(true);
      directionsService
        .route({
          origin: originRoute,
          destination: destinationRoute,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.WALKING,
          provideRouteAlternatives: true,
        })
        .then((results) => {
          let i = 1; // Counter to stop when all results were iterated
          const verifiedRatings = []; // Array for Verified Ratings
          const verifiedMarkers = []; // Arrau for Verified Markers

          // Iterates each route from the results that Directions Service returned
          results.routes.forEach((route, routeId) => {
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
              // Requests markers from API using the center coords of the current overview Path and a radius thats half the distance
              getPlacesRadiusMarkers(latitude, longitude, Math.round(radius)),
            )
              .then((markersList) => {
                // References for checking if point is inside the tolerance area near the route (currently 15m)
                // https://googlemaps.github.io/android-maps-utils/javadoc/com/google/maps/android/PolyUtil.html#isLocationOnEdge-LatLng-java.util.List-boolean-double-
                // https://developers.google.com/maps/documentation/javascript/reference#poly
                // https://stackoverflow.com/questions/47860177/google-maps-js-api-b-get-is-not-a-function-errorislocationonedge

                // Sets up route polyline and isLocationOnEdge function
                const isLocationOnEdge =
                  // eslint-disable-next-line no-undef
                  google.maps.geometry.poly.isLocationOnEdge;
                // eslint-disable-next-line no-undef
                const routePoly = new google.maps.Polyline({
                  path: route.overview_path,
                });

                // Local Variables to sum verified results
                let likes = 0;
                let dislikes = 0;
                let neutrals = 0;
                const markersLocal = [];

                // Iterates Markers
                markersList.forEach((marker) => {
                  // Checks if the marker is 2m around each point of the route
                  const check = isLocationOnEdge(
                    // eslint-disable-next-line no-undef
                    new google.maps.LatLng(marker.latitude, marker.longitude),
                    routePoly,
                    0.0002,
                  );
                  // If the marker is near the route it is added to the array,
                  // and likes/dislikes are counted
                  if (check) {
                    markersLocal.push(marker);
                    if (
                      marker.accessible_count !== null &&
                      marker.accessible_count !== undefined
                    ) {
                      likes += marker.accessible_count;
                    }
                    if (
                      marker.neutral_count !== null &&
                      marker.neutral_count !== undefined
                    ) {
                      neutrals += marker.neutral_count;
                    }
                    if (
                      marker.inaccessible_count !== null &&
                      marker.inaccessible_count !== undefined
                    ) {
                      dislikes += marker.inaccessible_count;
                    }
                  }
                });

                // Once all markers all markers for a route are checked the objects
                // are pushed to the correpondent arrays
                verifiedRatings[routeId] = { likes, dislikes, neutrals };
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
    },
    [dispatch],
  );

  // If there are loaded routes sets Generating routes to false
  useEffect(() => {
    if (routes) {
      setGeneratingRoutes(false);
    }
  }, [routes]);

  // If Route Changes sets Generate Route to false
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
  }, [origin, destination, routes, setDirections]);

  const markerColor = (marker) => {
    const color = getMarkerColor({
      green: marker?.accessible_count,
      yellow: marker?.neutral_count,
      red: marker?.inaccessible_count,
    });
    return color;
  };

  if (!destination) {
    return <PlacesVisited history={history} />;
  }

  return (
    <Container
      style={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '820px',
        position: 'relative',
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 38.736946, lng: -9.142685 }}
        zoom={8}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: false,
          disableDefaultUI: true,
          mapTypeControlOptions: {
            // eslint-disable-next-line no-undef
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            // eslint-disable-next-line no-undef
            position: google.maps.ControlPosition.TOP_LEFT,
          },
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
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
              onClick={() => openPlaceInfo(marker)}
              info
              markerColor={markerColor(marker)}
            />
          ))}

        {liveLocation && (
          <CustomMarker
            onClick={() => {}}
            markerColor={MARKER_COLOR.CURRENT_LOCATION}
            marker={{
              latitude: liveLocation?.lat,
              longitude: liveLocation?.lng,
            }}
          />
        )}
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
    </Container>
  );
};

export default Map;
