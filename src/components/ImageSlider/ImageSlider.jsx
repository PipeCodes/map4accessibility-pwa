import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { colors } from '../../constants/colors';
import { IMAGE_TYPES } from '../../constants';
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
  let fileType;

  return (
    <Slider {...settings}>
      {photos?.map((media, index) => {
        if (media?.file_url) {
          const type = media?.file_url?.split('.').pop();
          fileType = media?.file_type.concat('/').concat(type);
        }
        if (fileType === undefined) {
          return <Img key={index} src={media} />;
        }
        if (!IMAGE_TYPES.includes(fileType)) {
          return (
            <Media controls className={fileType.split('/', 1)}>
              <source src={media?.file_url} type={fileType} />
            </Media>
          );
        }
        return (
          <Img key={index} src={media.file_url ? media.file_url : media} />
        );
      })}
    </Slider>
  );
};

export default ImageSlider;
