import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Img } from './ImageSlider.styles';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const ImageSlider = ({ photos }) => (
  <Slider {...settings}>
    {photos?.map((photo, index) => (
      <Img key={index} src={photo.file_url ? photo.file_url : photo} />
    ))}
  </Slider>
);

export default ImageSlider;
