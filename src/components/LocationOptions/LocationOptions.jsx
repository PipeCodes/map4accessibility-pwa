import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentLocation } from '../../services/geolocation';
import CustomButton from '../CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import { InnerDiv } from './LocationOptions.styles';

const LocationOptions = ({
  closeDialog,
  openAddPlace,
  setCoords,
  setCenterMap,
  handleSearch,
  handleCoordinatesFormClose,
}) => {
  const [location, setLocation] = useState(null);
  const { t } = useTranslation();

  // const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocation().then((locationData) => {
      setLocation(locationData);
    });
    // .catch((error) => {
    //   setError(error);
    // });
  }, [location]);

  return (
    <InnerDiv>
      <CustomButton
        text={t('search_location')}
        altText="search_location"
        style={{ borderRadius: '50px', marginBottom: '10px', width: '235px' }}
        backgroundColor={colors.facebook_blue}
        onClick={() => {
          handleSearch();
        }}
      />

      <CustomButton
        text={t('pick_on_the_map')}
        altText="pick_on_the_map"
        style={{ borderRadius: '50px', marginBottom: '10px', width: '235px' }}
        backgroundColor={colors.facebook_blue}
        onClick={() => {
          // after clicking the button continues the flow to add a place to the map
          openAddPlace();
          closeDialog();
        }}
      />

      <CustomButton
        text={t('add_on_my_location')}
        altText="add_on_my_location"
        style={{ borderRadius: '50px', marginBottom: '10px', width: '235px' }}
        backgroundColor={colors.facebook_blue}
        onClick={() => {
          // centers the view of the map to the user's location
          setCenterMap();
          closeDialog();
          // returns the user's current location corrdinates
          setCoords({ lat: location.lat, lng: location.lng });
        }}
      />

      <CustomButton
        text={t('insert_coordinates')}
        altText="insert_coordinates"
        style={{ borderRadius: '50px', marginBottom: '10px', width: '235px' }}
        backgroundColor={colors.facebook_blue}
        onClick={() => {
          handleCoordinatesFormClose(true);
        }}
      />
    </InnerDiv>
  );
};

export default LocationOptions;
