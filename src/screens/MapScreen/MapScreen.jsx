import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerClusterer,
} from '@react-google-maps/api';
import { Spinner } from 'react-bootstrap';
import { debounce, getMarkerColor } from '../../helpers/utils';
import {
  getPlacesRadiusMarkers,
  getPlace,
  getGooglePlace,
  getMorePlaceInfo,
} from '../../store/actions/places';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import CustomMarker from '../../components/CustomMarker/CustomMarker';
import PlacePopUp from '../../components/PlacePopUp/PlacePopUp';
import SearchBar from '../../components/SearchBar/SearchBar';
import LocationIcon from '../../assets/icons/maps/locate.svg';
import AddIcon from '../../assets/icons/maps/add.svg';
import ClusterImg from '../../assets/icons/maps/clusters/m1.svg';
import DirectionsIcon from '../../assets/icons/maps/directions.svg';
import { getCurrentLocation } from '../../services/geolocation';
import {
  Page,
  Container,
  ButtonsContainer,
  ButtonCreate,
  ButtonDirections,
  ButtonLocation,
  ToolTip,
} from './MapScreen.styles';
import { GOOGLE_MAPS_OPTIONS } from '../../constants';
import MapZoom from '../../components/MapZoom/MapZoom';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  maxWidth: '820px',
  top: '0',
};

// https://stackoverflow.com/questions/68638475/my-map-bounds-appears-to-be-calculating-a-radius-outside-of-my-visible-area
const getRadius = (map) => {
  const bounds = map?.getBounds();
  if (!bounds) return null;

  // computeDistanceBetween returns meters
  // eslint-disable-next-line no-undef
  const radius = window.google.maps.geometry.spherical.computeDistanceBetween(
    bounds.getCenter(),
    bounds.getSouthWest(),
  );

  return Number(radius.toFixed(0));
};

const MapScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Gets place from reducer
  const place = useSelector((state) => state.place.place);
  const loading = useSelector((state) => state.place.loading);

  // Place pop-up
  const [popUp, setPopUp] = useState(false);

  // Google Maps
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [add, setAdd] = useState(null);
  const [radius, setRadius] = useState(null);

  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);

  // Cluster Options
  const options = {
    maxZoom: 15,
  };

  // Gets Position and sets Location
  useEffect(() => {
    if (isLoaded) {
      // Asks and sets user position (lat, long)
      getCurrentLocation()
        .then((position) => {
          if (history?.location?.state?.search?.location) {
            setLocation(history?.location?.state?.search?.location);
          } else if (history?.location?.state?.returnToMap) {
            setLocation(history?.location?.state?.returnToMap?.location);
          } else {
            setLocation(position);
          }
        })
        .catch((error) => {
          setLocation({ lat: 38.736946, lng: -9.142685 });
          // eslint-disable-next-line no-undef
          alert(error);
        });
    }
  }, [
    isLoaded,
    history?.location?.state?.search?.location,
    t,
    history?.location?.state?.returnToMap,
  ]);

  // If coords are selected opens Add Place Screen
  useEffect(() => {
    if (coords) {
      history.push(routes.ADD_PLACE.path, coords);
    }
  }, [coords, history, routes.ADD_PLACE.path]);

  // Buttons onClicks
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const openAddPlace = () => {
    setAdd((prev) => !prev);
  };

  const openRoutes = useCallback(() => {
    history.push(routes.ROUTE_PLANNER.path);
  }, [history, routes]);

  const setCenterMap = () => {
    if (isLoaded) {
      // Asks and sets user position (lat, long)
      getCurrentLocation()
        .then((position) => setLocation(position))
        // eslint-disable-next-line no-undef
        .catch((error) => alert(error));
    }
  };

  // Debounce when moves on map

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetCenter = useCallback(
    debounce((value, radius) => {
      if (
        center &&
        center.lat === value.lat &&
        center.lng === value.lng &&
        radius !== getRadius(map)
      ) {
        return;
      }
      setRadius(getRadius(map));
      setCenter(value);
    }, 400),
    [center, map],
  );

  // Opens and closes places
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

  const markerColor = (marker) => {
    const color = getMarkerColor({
      green: marker?.accessible_count,
      yellow: marker?.neutral_count,
      red: marker?.inaccessible_count,
    });
    return color;
  };

  // Gets all Markers
  useEffect(() => {
    if (center && radius) {
      dispatch(getPlacesRadiusMarkers(center.lat, center.lng, radius))
        .then((list) => {
          setMarkers(list);
        })
        .catch((err) => {
          // eslint-disable-next-line no-undef
          alert.error(err);
        });
    }
  }, [center, dispatch, radius]);

  const handleSearch = (value) => {
    history.push(routes.SEARCH.path, { search: value });
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <PlacePopUp
        history={history}
        display={popUp}
        place={place}
        setPopUp={setPopUp}
      />
      {history.location?.state?.search ? (
        <SearchBar
          handleSearch={handleSearch}
          history={history}
          searchText={history?.location?.state?.search?.text}
        />
      ) : (
        <TopBar
          aligned
          page
          magnifier
          routes={routes}
          backgroundColor={backgroundColor}
          hasAccessibilityButton={openAccessibility}
          title={add ? t('click_to_mark') : t('map')}
        />
      )}
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
            {loading && (
              <Spinner animation="border" variant="dark" className="spinner" />
            )}
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={history.location?.state?.search ? 20 : 14}
              onClick={(e) => {
                if (add) {
                  setCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                }
              }}
              onCenterChanged={() => {
                if (!map) {
                  return;
                }
                const center = map.getCenter().toJSON();
                debounceSetCenter(center, radius);
              }}
              onLoad={(map) => {
                setMap(map);
              }}
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
                    // https://developers.google.com/maps/documentation/javascript/examples/event-poi
                  },
                ],
              }}
            >
              <MarkerClusterer
                autoPan={false}
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
                      markerColor={markerColor(marker)}
                      marker={marker}
                      key={marker.id || marker.google_place_id}
                      clusterer={clusterer}
                      onClick={() => openPlaceInfo(marker)}
                    />
                  ))
                }
              </MarkerClusterer>
            </GoogleMap>
          </div>
        )}
      </Container>
      <MapZoom
        zoomIn={() => {
          map.setZoom(map.getZoom() + 1);
        }}
        zoomOut={() => {
          map.setZoom(map.getZoom() - 1);
        }}
      />
      <ButtonsContainer>
        <ToolTip>
          <span>{add ? t('click_map') : t('add_new')}</span>
        </ToolTip>
        <ButtonCreate type="button" add={add} onClick={() => openAddPlace()}>
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
