import React from 'react';
import { useSelector } from 'react-redux';
import ThubsUpIcon from '../../assets/icons/maps/up.svg';

import {
  ItemContainer,
  Rank,
  Image,
  TextWrapper,
  Name,
  City,
  LikesWrapper,
  Icon,
  Number,
} from './RankingItem.styles';

const RankingItem = (props) => {
  const { item } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <ItemContainer>
      <Rank fontSize={fontSize}>{item.id}</Rank>
      <Image src={item.image} />

      <TextWrapper>
        <Name fontSize={fontSize}>{item.name}</Name>
        <City fontSize={fontSize}>{item.city}</City>
      </TextWrapper>
      <LikesWrapper>
        <Icon>
          <img src={ThubsUpIcon} alt="Likes" />
        </Icon>
        <Number fontSize={fontSize}>{item.likes}</Number>
      </LikesWrapper>
    </ItemContainer>
  );
};

export default RankingItem;
