import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  Title,
  Carousel,
  Arrow,
  Avatar,
} from './AvatarCarousel.styles';
import PreviousArrow from '../../assets/images/old_delete/previous_arrow.svg';
import NextArrow from '../../assets/images/old_delete/next_arrow.svg';
import { AVATARS } from '../../constants';

const AvatarCarousel = (props) => {
  const { defaultValue, onChange } = props;

  const { t } = useTranslation();

  const [index, setIndex] = useState(0);

  const previousAvatarClickHandler = () => {
    setIndex((prevState) => (prevState - 1 < 0 ? prevState : prevState - 1));
  };

  const nextAvatarClickHandler = () => {
    setIndex((prevState) =>
      prevState + 1 === AVATARS.length ? prevState : prevState + 1,
    );
  };

  useEffect(() => {
    onChange(AVATARS[index]);
  }, [index]);

  useEffect(() => {
    if (defaultValue) {
      const i = AVATARS.indexOf(defaultValue);

      setIndex(i < 0 ? 0 : i);
    }
  }, [defaultValue]);

  return (
    <Wrapper>
      <Title>{t('avatar')}</Title>
      <Carousel>
        <Arrow onClick={previousAvatarClickHandler}>
          <img alt="previous avatar" src={PreviousArrow} />
        </Arrow>
        <Avatar src={AVATARS[index].element} alt={AVATARS[index].id} />
        <Arrow onClick={nextAvatarClickHandler}>
          <img alt="next avatar" src={NextArrow} />
        </Arrow>
      </Carousel>
    </Wrapper>
  );
};

export default AvatarCarousel;
