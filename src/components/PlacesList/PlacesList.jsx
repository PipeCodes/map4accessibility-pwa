import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerClusterer,
} from '@react-google-maps/api';
import pinIcon from '../../assets/icons/places/pin.svg';
import { resetHistory } from '../../store/actions/history';
import {
  Wrapper,
  Title,
  TopWrapper,
  PlacesContainer,
  Place,
  Name,
  Image,
  TextWrapper,
  City,
  Button,
  ShowAll,
  NoResults,
} from './PlacesList.styles';
import CustomMarker from '../CustomMarker/CustomMarker';
import ClusterImg from '../../assets/icons/maps/clusters/m1.svg';
import { GOOGLE_MAPS_OPTIONS } from '../../constants';
import { getPlacesRadiusMarkers } from '../../store/actions/places';

// Map styling
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  maxWidth: '820px',
};

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

const PlacesList = ({ places, history, location, setLocation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  // Google Maps
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [markers, setMarkers] = useState(null);
  const [locationReal, setLocationReal] = useState(null);

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [viewAll, setViewAll] = useState(false);
  const [placesList, setPlacesList] = useState([]);

  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);

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

  useEffect(() => {
    if (typeof places === 'string') {
      dispatch(resetHistory());
    }
    if (viewAll) {
      setPlacesList(places);
    } else {
      setPlacesList(places?.slice(0, 5));
    }
  }, [viewAll, places]);

  const viewAllHandler = () => {
    setViewAll((prevState) => !prevState);
  };

  const showPlaceOnMap = (lat, lng) => {
    setLocationReal({ lat, lng });
    setLocation(new google.maps.LatLng(lat, lng));
  };

  useEffect(() => {
    if (locationReal) {
      dispatch(
        getPlacesRadiusMarkers(
          locationReal.lat,
          locationReal.lng,
          getRadius() || 1000,
        ),
      )
        .then((list) => {
          setMarkers(list);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [location]);

  // Open Page Details
  const openDetails = useCallback(
    (id) => {
      history.push('/place-details/'.concat(id));
    },
    [history],
  );

  return (
    <Wrapper backgroundColor={backgroundColor}>
      {location && isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={14}
          onLoad={(map) => {
            setMap(map);
          }}
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
      ) : (
        <>
          <TopWrapper>
            <Title fontSize={fontSize} font={font}>
              {t('results')}
            </Title>
          </TopWrapper>
          <PlacesContainer>
            {places && placesList?.length !== 0 && !location ? (
              placesList?.map((place, key) => (
                <Place key={key}>
                  <Image src={place?.place_image?.file_url} />
                  <TextWrapper>
                    <Name fontSize={fontSize} font={font}>
                      {place?.name}
                    </Name>
                    <City fontSize={fontSize} font={font}>
                      {place?.city}
                    </City>
                  </TextWrapper>
                  <Button
                    type="button"
                    onClick={() =>
                      showPlaceOnMap(place?.latitude, place?.longitude)
                    }
                  >
                    <img src={pinIcon} alt={place.id} />
                  </Button>
                </Place>
              ))
            ) : (
              <NoResults fontSize={fontSize} font={font}>
                {t('no_results')}
              </NoResults>
            )}
            {!location && places?.length > 5 && (
              <ShowAll
                fontSize={fontSize}
                font={font}
                type="button"
                onClick={() => viewAllHandler()}
              >
                {' '}
                {viewAll ? t('show_less') : t('view_all')}
              </ShowAll>
            )}
          </PlacesContainer>
        </>
      )}
    </Wrapper>
  );
};

export default PlacesList;
