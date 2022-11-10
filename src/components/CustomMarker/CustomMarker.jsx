import React from 'react';
import { Marker, InfoBox } from '@react-google-maps/api';
import Icon from '../../assets/icons/maps/red-alert-icon.svg';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';

import classes from './CustomMarker.module.css';

const CustomMarker = ({ marker }) => {
  let icon = null;

  switch (marker.placeType) {
    case 'danger':
      icon = Icon;
      break;
    default:
      icon = Icon;
  }

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
