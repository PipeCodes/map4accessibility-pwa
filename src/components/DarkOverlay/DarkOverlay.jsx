import React from 'react';
import { DarkOverlayContainer } from './DarkOverlay.styles';

const DarkOverlay = (props) => {
  const { lightsOffMode } = props;

  return <DarkOverlayContainer lightsOffMode={lightsOffMode} />;
};

export default DarkOverlay;
