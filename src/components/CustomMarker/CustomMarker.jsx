import React, { useMemo } from 'react';
import { Marker } from '@react-google-maps/api';
import { choosePlaceType, markerIcon } from '../../helpers/utils';

const CustomMarker = ({ marker, onClick, clusterer, isEvaluated }) => {
  const icon = useMemo(
    () => markerIcon(choosePlaceType(marker?.place_type), isEvaluated),
    [marker, isEvaluated],
  );

  const coords = {
    lat: parseFloat(marker.latitude),
    lng: parseFloat(marker.longitude),
  };

  return (
    <Marker
      autoPan={false}
      key={marker.id}
      icon={icon}
      position={coords}
      clusterer={clusterer}
      onClick={() => onClick()}
    />
  );
};

export default CustomMarker;
