import React from 'react';
import { Dots, Item } from './PageIndicator.styles';

const PageIndicator = ({ currentStep, total }) => (
  <Dots>
    {[...Array(total).keys()].map((index) => (
      <Item
        key={index}
        className={`${currentStep === index ? 'selected' : ''}`}
      />
    ))}
  </Dots>
);

export default PageIndicator;
