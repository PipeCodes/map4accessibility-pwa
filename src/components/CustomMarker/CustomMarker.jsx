import React, { useMemo } from 'react';
import { Marker, InfoBox } from '@react-google-maps/api';
import DangerIcon from '../../assets/icons/maps/red-alert-icon.svg';
import DefaultIcon from '../../assets/icons/maps/destination.svg';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';

import classes from './CustomMarker.module.css';

const CustomMarker = ({ marker }) => {
  const icon = useMemo(() => {
    if (marker?.placeType === 'danger') {
      return DangerIcon;
    }

    return DefaultIcon;
  }, [marker]);

  return (
    <Marker icon={icon} position={marker.coords}>
      <InfoBox
        options={{
          pixelOffset: new window.google.maps.Size(-40, -80),
        }}
        position={marker.coords}
      >
        <div className={classes.Marker}>
          <span className={classes.Title}>{marker.name}</span>
          <div className={classes.LikesAndDislikes}>
            <div className={`${classes.Statistics} ${classes.Likes}`}>
              <img src={ThumbsUp} alt="up" />
              <span>{marker.likes}</span>
            </div>
            <span className={`${classes.Statistics} ${classes.Dislikes}`}>
              <img src={ThumbsDown} alt="down" />
              <span>{marker.dislikes}</span>
            </span>
          </div>
        </div>
      </InfoBox>
    </Marker>
  );
};

export default CustomMarker;
