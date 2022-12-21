import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerClusterer,
} from '@react-google-maps/api';
import { debounce } from '../../helpers/utils';
import { getPlacesRadiusMarkers } from '../../store/actions/places';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import CustomMarker from '../../components/CustomMarker/CustomMarker';
import LocationIcon from '../../assets/icons/maps/locate.svg';
import AddIcon from '../../assets/icons/maps/add.svg';
import ClusterImg from '../../assets/icons/maps/clusters/m1.svg';
import DirectionsIcon from '../../assets/icons/maps/directions.svg';
import {
  Page,
  Container,
  ButtonsContainer,
  ButtonCreate,
  ButtonDirections,
  ButtonLocation,
} from './MapScreen.styles';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  maxWidth: '820px',
  top: '0',
};

const libraries = ['places', 'geometry'];

const MapScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Google Maps
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [location, setLocation] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Map Options
  const mapOptions = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  // Cluster Options
  const options = {
    maxZoom: 15,
  };

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

  // https://stackoverflow.com/questions/68638475/my-map-bounds-appears-to-be-calculating-a-radius-outside-of-my-visible-area
  const getRadius = () => {
    const bounds = map?.getBounds();
    if (!bounds) return null;

    // computeDistanceBetween returns meters
    const radius = window.google.maps.geometry.spherical.computeDistanceBetween(
      bounds.getCenter(),
      bounds.getSouthWest(),
    );

    return Number(radius.toFixed(0));
  };

  // Open Page Details
  const openDetails = useCallback(
    (id) => {
      history.push('/place-details/'.concat(id));
    },
    [history],
  );

  // Buttons onClicks
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
  };

  useEffect(() => {
    if (center) {
      dispatch(
        getPlacesRadiusMarkers(center.lat, center.lng, getRadius() || 1000),
      )
        .then((list) => {
          setMarkers(list);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [center]);

  const debounceSetCenter = useCallback(
    debounce((value) => {
      if (center && center.lat === value.lat && center.lng === value.lng) {
        return;
      }
      setCenter(value);
    }, 1000),
    [center],
  );

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
              center={location || { lat: 38.736946, lng: -9.142685 }}
              zoom={location ? 14 : 10}
              onCenterChanged={() => {
                if (!map) {
                  return;
                }
                const center = map.getCenter().toJSON();
                debounceSetCenter(center);
              }}
              onLoad={(map) => {
                setMap(map);
              }}
              onUnmount={() => setMap(null)}
              options={mapOptions}
            >
              <MarkerClusterer
                options={options}
                averageCenter
                styles={[
                  {
                    url: ClusterImg,
                    height: 50,
                    lineHeight: 35,
                    width: 50,
                  },
                ]}
              >
                {(clusterer) =>
                  markers?.map((marker) => (
                    <CustomMarker
                      marker={marker}
                      key={marker.id}
                      clusterer={clusterer}
                      onClick={() => openDetails(marker.id)}
                    />
                  ))
                }
              </MarkerClusterer>
            </GoogleMap>
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
