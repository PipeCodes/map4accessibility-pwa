import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/colors';
import { IMAGE_TYPES, PROVIDERS } from '../../constants';
import { Img, Media } from './ImageSlider.styles';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  backgroundColor: colors.backgroundColor,
};

const ImageSlider = ({ photos }) => {
  const { t } = useTranslation();
  let fileType;

  return (
    <Slider {...settings}>
      {photos?.map((media, index) => {
        if (media?.file_url) {
          const type = media?.file_url?.split('.').pop();

          if (type === 'mp3' || type === 'wav') {
            fileType = 'audio'.concat('/').concat(type);
          } else if (type === 'mp4') {
            fileType = 'video'.concat('/').concat(type);
          } else {
            fileType = 'image'.concat('/').concat(type);
          }
        }
        if (fileType === undefined) {
          return (
            <Img key={index} src={media} alt={t('alt_text.place_image')} />
          );
        }
        if (media?.type === PROVIDERS.GOOGLE) {
          return (
            <Img
              key={index}
              src={media?.file_url ?? media}
              alt={t('alt_text.place_image')}
            />
          );
        }
        if (!IMAGE_TYPES.includes(fileType)) {
          return (
            <Media controls className={fileType.split('/', 1)}>
              <source src={media?.file_url} type={fileType} />
            </Media>
          );
        }
        return <Img key={index} src={media?.file_url ?? media} />;
      })}
    </Slider>
  );
};

export default ImageSlider;
