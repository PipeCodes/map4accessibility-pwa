import React from 'react';
import { CardContainer, Title, Subtitle } from './CycleListCard.styles';

const CycleListCard = (props) => {
  const { onItemClick, item } = props;

  return (
    <CardContainer backgroundColor={item.color} onClick={() => onItemClick(item)}>
      <Title>{item.name}</Title>
      <Subtitle>{item.subtitle}</Subtitle>
    </CardContainer>
  );
};

export default CycleListCard;
