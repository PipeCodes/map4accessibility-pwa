import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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
  Button,
  ButtonComments,
} from './PlaceDetailsScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { getPlace, deletePlace } from '../../store/actions/places';
import placeholder from '../../assets/images/photo-stock-1.png';
import LatestComments from '../../components/LatestComments/LatestComments';
import { storePlace } from '../../store/actions/history';

const photos = [placeholder, placeholder, placeholder];

const PlaceDetailsScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isAccessible, setIsAccessible] = useState('');

  // Accessibility settings with redux from the reducer
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const user = useSelector((state) => state.auth.user);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const visitedHistory = useSelector((state) => state.history.history);

  // Gets place from reducer
  const place = useSelector((state) => state.place.place);

  // Gets params from URL using ReactRouter
  const params = useParams();

  const noPlace = () => {
    alert(t('no_place'));
    dispatch(history.goBack());
  };

  // Gets Place from API to have the info
  useEffect(() => {
    dispatch(getPlace(params.id)).catch(() => noPlace());
  }, [dispatch]);

  useEffect(() => {
    if (place) {
      dispatch(storePlace(place, visitedHistory));
    }
  }, [dispatch, place, visitedHistory]);

  const backClickHandler = () => {
    if (history?.location?.state?.newPlace) {
      history.replace(routes.MAP.path);
    } else if (history?.location?.state?.ratePlace) {
      history.go(-3);
    } else {
      history.goBack();
    }
  };

  const markPlaceAsClosed = () => {
    dispatch(deletePlace(user?.id, place.id))
      .then(() => {
        alert(t('request_sent_delete_place'));
        dispatch(getPlace(params.id));
      })
      .catch(() => {
        alert(t('problem_request_delete_place'));
      });
  };

  // Opens accessibility screen (button on the top-right of the page)
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const openComments = useCallback(() => {
    history.push(`/rate-place/${params?.id}`);
  }, [history, routes]);

  const getMedia = (place) => {
    const pictures = [];
    const mainPicture = {
      file_type: 'image',
      file_url: place?.media,
    };
    if (mainPicture?.file_url) pictures.push(mainPicture);
    place?.media_evaluations?.map((pic) => pictures.push(pic));
    return pictures?.length ? pictures : photos;
  };

  const getAccessibility = useMemo(() => {
    const sortedComments = place?.place_evaluations?.sort(
      (a, b) => moment(b.updated_at) - moment(a.updated_at),
    );
    if (sortedComments?.length) {
      if (sortedComments[0].thumb_direction) {
        setIsAccessible(true);
        return t('accessible');
      }
      setIsAccessible(false);
      return t('not_accessible');
    }
    return '';
  }, [setIsAccessible, place]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasBackButton
        backTarget={() => backClickHandler()}
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
              <span className={isAccessible ? 'accessible' : 'not-accessible'}>
                {getAccessibility}
              </span>
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
          {place?.place_deletion?.find(
            (request) => request.app_user_id === user.id,
          ) ? (
            <Button fontSize={fontSize} font={font} className="closed">
              {t('marked_as_closed')}
            </Button>
          ) : (
            <Button
              fontSize={fontSize}
              font={font}
              onClick={() => markPlaceAsClosed()}
            >
              {t('mark_as_closed')}
            </Button>
          )}
        </div>
        {place?.place_evaluations && (
          <Evaluations fontSize={fontSize} className="mt-3">
            <LatestComments comments={place?.place_evaluations} />
          </Evaluations>
        )}
        <ButtonComments onClick={() => openComments()}>
          <button type="button">
            <img src={Comment} alt="comment" />
          </button>
        </ButtonComments>
      </Container>
    </Page>
  );
};

export default withRouter(PlaceDetailsScreen);
