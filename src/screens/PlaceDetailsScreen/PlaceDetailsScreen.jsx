import React, { useEffect, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import Pin from '../../assets/icons/places/details/pin.svg';
import Phone from '../../assets/icons/places/details/phone.svg';
import Clock from '../../assets/icons/places/details/clock.svg';
import Email from '../../assets/icons/places/details/email.svg';
import Pointer from '../../assets/icons/places/details/mouse-pointer.svg';
import Path from '../../assets/icons/places/details/path.svg';
import Comment from '../../assets/icons/places/comment.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
import {
  Page,
  Container,
  TextWrapper,
  Name,
  City,
  Accessible,
  Evaluations,
  PlaceInformation,
} from './PlaceDetailsScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { getPlace } from '../../store/actions/places';
import placeholder from '../../assets/images/photo-stock-1.png';
import LatestComments from '../../components/LatestComments/LatestComments';

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

  const openComments = useCallback(() => {
    history.push(`/rate-place/${params?.id}`);
  }, [history, routes]);

  const getMedia = (place) => {
    const pictures = place?.media_evaluations;
    const mainPicture = {
      file_type: 'image',
      file_url: place?.media,
    };

    if (mainPicture.file_url) pictures.unshift(mainPicture);

    return pictures?.length ? pictures : photos;
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasBackButton
        backgroundColor={backgroundColor}
        magnifier
        hasAccessibilityButton={openAccessibility}
        title={t('place_details')}
      />
      <ImageSlider photos={getMedia(place)} />
      <Container>
        <div className="card">
          <div className="header-row">
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
            <Accessible fontSize={fontSize}>
              <span>{t('accessible')}</span>
              <div>
                <span className="up">
                  <img src={ThumbsUp} alt={t('positive')} />{' '}
                  {place?.thumbs_up_count || 0}
                </span>
                <span className="down ms-2">
                  <img src={ThumbsDown} alt={t('negative')} />{' '}
                  {place?.thumbs_down_count || 0}
                </span>
              </div>
            </Accessible>
          </div>
          <PlaceInformation fontSize={fontSize}>
            {place?.place_type && (
              <span className="fw-bold">
                <img src={Path} alt={t('place')} /> {place?.place_type}
              </span>
            )}
            {place?.address && (
              <span>
                <img src={Pin} alt={t('address')} /> {place?.address}
              </span>
            )}
            {place?.phone && (
              <span>
                <img src={Phone} alt={t('phone')} /> {place?.phone}
              </span>
            )}
            {place?.email && (
              <span>
                <img src={Email} alt={t('email')} /> {place?.email}
              </span>
            )}
            {place?.website && (
              <span>
                <img src={Pointer} alt={t('website')} /> {place?.website}
              </span>
            )}
            {place?.schedule && (
              <span>
                <img src={Clock} alt={t('schedule')} /> {place?.schedule}
              </span>
            )}
          </PlaceInformation>
        </div>
        {place?.place_evaluations && (
          <Evaluations fontSize={fontSize} className="mt-3">
            <LatestComments comments={place?.place_evaluations} />
          </Evaluations>
        )}
        <div className="comments">
          <button type="button" onClick={() => openComments()}>
            <img src={Comment} alt="comment" />
          </button>
        </div>
      </Container>
    </Page>
  );
};

export default withRouter(PlaceDetailsScreen);
