import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Marker, InfoBox } from '@react-google-maps/api';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
import { markerIcon } from '../../helpers/utils';
import {
  Title,
  Likes,
  Dislikes,
  LikesAndDislikes,
} from './CustomMarker.styles';

const CustomMarker = ({ marker, onClick, clusterer }) => {
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const icon = useMemo(() => markerIcon(marker?.place_type), [marker]);
  const [markerLocal, setMarkerLocal] = useState(null);

  const offSet = useMemo(() => {
    if (marker?.place_type === 'danger') {
      return { x: -70, y: -100 };
    }
    return { x: 30, y: -90 };
  }, [marker]);

  const coords = {
    lat: parseFloat(marker.latitude),
    lng: parseFloat(marker.longitude),
  };

  return (
    <Marker
      key={marker.id}
      icon={icon}
      position={coords}
      clusterer={clusterer}
      onClick={() => onClick()}
      onLoad={(e) => {
        setMarkerLocal(e);
      }}
    >
      {markerLocal?.map !== null && (
        <InfoBox
          options={{
            pixelOffset: new window.google.maps.Size(offSet.x, offSet.y),
          }}
          position={coords}
          anchor={markerLocal}
        >
          <div>
            <Title font={font} fontSize={fontSize}>
              {marker.name}
            </Title>
            <LikesAndDislikes>
              <Likes>
                <img src={ThumbsUp} alt="up" />
                <span>{marker.thumbs_up_count}</span>
              </Likes>
              <Dislikes>
                <img src={ThumbsDown} alt="down" />
                <span>{marker.thumbs_down_count}</span>
              </Dislikes>
            </LikesAndDislikes>
          </div>
        </InfoBox>
      )}
    </Marker>
  );
};

export default CustomMarker;
