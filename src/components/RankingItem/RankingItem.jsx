import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import ThubsUpIcon from '../../assets/icons/maps/up.svg';
import ThubsDownIcon from '../../assets/icons/maps/down.svg';
import {
  ItemContainer,
  Rank,
  Image,
  TextWrapper,
  Name,
  City,
  LikesWrapper,
  DislikesWrapper,
  Icon,
  Number,
} from './RankingItem.styles';
import placeImage from '../../assets/images/place.png';

const RankingItem = (props) => {
  const { item, ascDescActive, rank } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);

  return (
    <ItemContainer>
      <Rank fontSize={fontSize}>{rank + 1}</Rank>
      {item.medias[0] ? (
        <Image src={item.medias[0]} />
      ) : (
        <Image src={placeImage} />
      )}
      <TextWrapper>
        <Name fontSize={fontSize}>{item.name}</Name>
        {item.city ? (
          <City fontSize={fontSize}>{item.city}</City>
        ) : (
          <City fontSize={fontSize}>{t('obstacle')}</City>
        )}
      </TextWrapper>
      {ascDescActive ? (
        <DislikesWrapper>
          <Icon>
            <img src={ThubsDownIcon} alt="Dislikes" />
          </Icon>
          <Number fontSize={fontSize}>{item.thumbs_down_count}</Number>
        </DislikesWrapper>
      ) : (
        <LikesWrapper>
          <Icon>
            <img src={ThubsUpIcon} alt="Likes" />
          </Icon>
          <Number fontSize={fontSize}>{item.thumbs_up_count}</Number>
        </LikesWrapper>
      )}
    </ItemContainer>
  );
};

export default RankingItem;
