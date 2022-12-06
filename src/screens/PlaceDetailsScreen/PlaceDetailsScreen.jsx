import React, { useEffect, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyObject } from 'jquery';
import {
  Page,
  Container,
  TextWrapper,
  Name,
  City,
} from './PlaceDetails.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { getPlace } from '../../store/actions/places';
import placeholder from '../../assets/images/photo-stock-1.png';

const photos = [placeholder, placeholder, placeholder];

const PlaceDetailsScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Accessibility settings with redux from the reducer
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  // Gets place from reducer
  const place = useSelector((state) => state.place.place);

  // Gets params from URL using ReactRouter
  const params = useParams();

  // Gets Place from API to have the info
  useEffect(() => {
    dispatch(getPlace(params.id));
  }, [dispatch]);

  // Opens accessibility screen (button on the top-right of the page)
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasBackButton
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('place_details')}
      />
      <ImageSlider
        photos={
          place?.media_evaluations?.length ? place.media_evaluations : photos
        }
      />
      <Container>
        <TextWrapper>
          <Name fontSize={fontSize} font={font}>
            {place?.name}
          </Name>
          {place?.city ? (
            <City fontSize={fontSize} font={font}>
              {place?.city}
            </City>
          ) : (
            <City fontSize={fontSize} font={font}>
              {t('obstacle')}
            </City>
          )}
        </TextWrapper>
      </Container>
    </Page>
  );
};

export default withRouter(PlaceDetailsScreen);
