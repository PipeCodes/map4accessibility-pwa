import { useTranslation } from 'react-i18next';
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
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const { t } = useTranslation();
  return (
    <ItemContainer backgroundColor={backgroundColor}>
      <Rank fontSize={fontSize} font={font}>
        {rank + 1}
      </Rank>
      {item.medias[0] ? (
        <Image src={item.medias[0]} />
      ) : (
        <Image src={placeImage} />
      )}
      <TextWrapper>
        <Name fontSize={fontSize} font={font}>
          {item.name}
        </Name>
        {item.city ? (
          <City fontSize={fontSize} font={font}>
            {item.city}
          </City>
        ) : (
          <City fontSize={fontSize} font={font}>
            {t('obstacle')}
          </City>
        )}
      </TextWrapper>
      {ascDescActive ? (
        <DislikesWrapper>
          <Icon>
            <img src={ThubsDownIcon} alt="Dislikes" />
          </Icon>
          <Number fontSize={fontSize} font={font}>
            {item.thumbs_down_count}
          </Number>
        </DislikesWrapper>
      ) : (
        <LikesWrapper>
          <Icon>
            <img src={ThubsUpIcon} alt="Likes" />
          </Icon>
          <Number fontSize={fontSize} font={font}>
            {item.thumbs_up_count}
          </Number>
        </LikesWrapper>
      )}
    </ItemContainer>
  );
};

export default RankingItem;
