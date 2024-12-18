import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import { InnerDiv } from './CoordinatesForm.styles';

const CoordinatesForm = ({ setCoords }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleLatChange = (e) => setLat(e.target.value);
  const handleLngChange = (e) => setLng(e.target.value);

  const { t } = useTranslation();

  return (
    <InnerDiv>
      <CustomInput
        style={{
          borderRadius: '50px',
          marginBottom: '15px',
        }}
        placeholder={t('latitude')}
        name="lat"
        value={lat}
        onChange={handleLatChange}
      />

      <CustomInput
        style={{ borderRadius: '50px', marginBottom: '15px' }}
        placeholder={t('longitude')}
        name="lng"
        value={lng}
        onChange={handleLngChange}
      />
      <CustomButton
        text={t('submit')}
        altText="submit"
        style={{ borderRadius: '50px' }}
        backgroundColor={colors.facebook_blue}
        onClick={() => {
          setCoords({ lat, lng });
        }}
      />
    </InnerDiv>
  );
};

export default CoordinatesForm;
