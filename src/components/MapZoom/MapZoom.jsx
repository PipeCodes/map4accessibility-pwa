import React from 'react';
import { ButtonsWrapper, PlusZoom, MinusZoom } from './MapZoom.styles';
import ZoomInIcon from '../../assets/icons/maps/zoom-in.svg';
import ZoomOutIcon from '../../assets/icons/maps/zoom-out.svg';

const MapZoom = ({ zoomIn, zoomOut }) => (
  <ButtonsWrapper>
    <PlusZoom onClick={zoomIn}>
      <img src={ZoomInIcon} alt="zoom-in" />
    </PlusZoom>
    <MinusZoom onClick={zoomOut}>
      <img src={ZoomOutIcon} alt="zoom-out" />
    </MinusZoom>
  </ButtonsWrapper>
);

export default MapZoom;
