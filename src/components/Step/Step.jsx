import React from 'react';
import { useSelector } from 'react-redux';
import arrowUp from '../../assets/icons/directions/arrowUp.svg';
import arrowLeft from '../../assets/icons/directions/arrowLeft.svg';
import arrowRight from '../../assets/icons/directions/arrowRight.svg';
import {
  StepWrapper,
  InstructionsWrapper,
  Maneuver,
  Instructions,
  Distance,
} from './Step.styles';

const Step = ({ instructions, distance, maneuver }) => {
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const maneuverRender = () => {
    if (maneuver.includes('right')) {
      return <Maneuver src={arrowRight} />;
    }
    if (maneuver.includes('left')) {
      return <Maneuver src={arrowLeft} />;
    }
    return <Maneuver src={arrowUp} />;
  };

  return (
    <StepWrapper>
      <InstructionsWrapper>
        {maneuverRender()}
        <Instructions
          font={font}
          fontSize={fontSize}
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      </InstructionsWrapper>
      <Distance font={font} fontSize={fontSize}>
        {distance}
      </Distance>
    </StepWrapper>
  );
};

export default Step;
