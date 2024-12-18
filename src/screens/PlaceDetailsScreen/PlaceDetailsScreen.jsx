import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
import Pin from '../../assets/icons/places/details/pin.svg';
import Phone from '../../assets/icons/places/details/phone.svg';
import Clock from '../../assets/icons/places/details/clock.svg';
import Email from '../../assets/icons/places/details/email.svg';
import Pointer from '../../assets/icons/places/details/mouse-pointer.svg';
import Path from '../../assets/icons/places/details/path.svg';
import Comment from '../../assets/icons/places/comment.svg';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
import Neutral from '../../assets/icons/places/neutral.svg';
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
import {
  getPlace,
  deletePlace,
  getGooglePlace,
  getMorePlaceInfo,
} from '../../store/actions/places';
import LatestComments from '../../components/LatestComments/LatestComments';

import { storePlace } from '../../store/actions/history';
import { getMedia, isDefined } from '../../helpers/utils';
import { ACCESSIBILITY, GOOGLE_MAPS_OPTIONS } from '../../constants';
import QuestionPopUp from '../../components/QuestionsPopUp/QuestionsPopUp';

const PlaceDetailsScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);
  const [isAccessible, setIsAccessible] = useState('');
  // Accessibility settings with redux from the reducer
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const user = useSelector((state) => state.auth.user);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const visitedHistory = useSelector((state) => state.history.history);
  const [popUp, setPopUp] = useState(null);

  // Gets place from reducer
  const place = useSelector((state) => state.place.place);
  // Gets params from URL using ReactRouter
  const params = useParams();

  // Gets Place from API to have the info
  useEffect(() => {
    if (isLoaded) {
      if (isDefined(params?.google_place_id)) {
        dispatch(getGooglePlace(params?.google_place_id));
        if (isDefined(params?.id)) {
          dispatch(getMorePlaceInfo(params?.id));
        }
      } else {
        dispatch(getPlace(params?.id)).catch(() => {
          // eslint-disable-next-line no-undef
          alert(t('no_place'));
          dispatch(history.goBack());
        });
      }
    }
  }, [dispatch, params.google_place_id, params.id, t, history, isLoaded]);

  useEffect(() => {
    if (place && visitedHistory) {
      if (
        visitedHistory[0]?.id !== place?.id &&
        visitedHistory[0]?.google_place_id !== place?.google_place_id
      ) {
        dispatch(storePlace(place, visitedHistory));
      }
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
    // eslint-disable-next-line no-undef
    const confirmPopUp = confirm(t('are_you_sure'));
    if (confirmPopUp) {
      dispatch(deletePlace(user?.id, place.id))
        .then(() => {
          // eslint-disable-next-line no-undef
          alert(t('request_sent_delete_place'));
          dispatch(getPlace(params.id));
        })
        .catch(() => {
          // eslint-disable-next-line no-undef
          alert(t('problem_request_delete_place'));
        });
    }
  };

  // Opens accessibility screen (button on the top-right of the page)
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const openComments = useCallback(() => {
    if (history?.location?.state?.googlePlace) {
      history.push(`/rate-place/${params?.id}/${params?.google_place_id}`);
    } else {
      history.push(`/rate-place/${params?.id}/${params?.google_place_id}`);
    }
  }, [history, params]);

  const getAccessibility = useMemo(() => {
    const sortedComments = place?.place_evaluations?.sort(
      (a, b) => moment(b.updated_at) - moment(a.updated_at),
    );
    if (sortedComments?.length) {
      switch (sortedComments[0].evaluation) {
        case ACCESSIBILITY.ACCESSIBLE:
          setIsAccessible(ACCESSIBILITY.ACCESSIBLE);
          return t('accessible');
        case ACCESSIBILITY.NOT_ACCESSIBLE:
          setIsAccessible(ACCESSIBILITY.NOT_ACCESSIBLE);
          return t('not_accessible');
        case ACCESSIBILITY.NEUTRAL:
          setIsAccessible(ACCESSIBILITY.NEUTRAL);
          return t('neutral');
        default:
          break;
      }
    }
    setIsAccessible(ACCESSIBILITY.NEUTRAL);
    return t('neutral');
  }, [place, t]);

  const getAccessibilityColor = useMemo(() => {
    switch (isAccessible) {
      case ACCESSIBILITY.ACCESSIBLE:
        return 'accessible';
      case ACCESSIBILITY.NOT_ACCESSIBLE:
        return 'not-accessible';
      case ACCESSIBILITY.NEUTRAL:
        return 'neutral';
      default:
        return 'neutral';
    }
  }, [isAccessible]);

  return (
    <Page backgroundColor={backgroundColor}>
      {popUp && <QuestionPopUp questions={popUp} setPopUp={setPopUp} />}
      <TopBar
        aligned
        page
        hasBackButton
        backTarget={() => backClickHandler()}
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('place_details')}
      />
      {place && <ImageSlider photos={getMedia(place)} />}
      <Container>
        <div className="card">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div className="header-row" onClick={() => openComments()}>
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
            <Accessible fontSize={fontSize} font={font}>
              <span className={getAccessibilityColor}>{getAccessibility}</span>
              <div className="rates">
                <span className="up">
                  <img src={ThumbsUp} alt={t('positive')} />
                  <div>{place?.accessible_count || 0}</div>
                </span>
                <span className="neutral">
                  <img src={Neutral} alt={t('neutral')} />
                  <div>{place?.neutral_count || 0}</div>
                </span>
                <span className="down">
                  <img src={ThumbsDown} alt={t('negative')} />
                  <div>{place?.inaccessible_count || 0}</div>
                </span>
              </div>
            </Accessible>
          </div>
          <PlaceInformation fontSize={fontSize} font={font}>
            {place?.place_type && (
              <span className="fw-bold">
                <img src={Path} alt={t('place')} /> {t(place?.place_type)}
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
                <img src={Pointer} alt={t('website')} />{' '}
                <a href={place?.website} target="_blank" rel="noreferrer">
                  {place?.website}
                </a>
              </span>
            )}
            {place?.schedule && (
              <span>
                <img src={Clock} alt={t('schedule')} />
              </span>
            )}
            {place?.schedule &&
              place?.schedule?.map((line, key) => (
                <span key={key}>{line}</span>
              ))}
          </PlaceInformation>
          {place?.id &&
            place?.place_deletion &&
            !(place?.place_deletion[0]?.status === 'closed') &&
            place?.place_deletion?.find(
              (request) => request.app_user_id === user.id,
            ) && (
              <Button fontSize={fontSize} font={font} className="closed">
                {t('marked_as_closed')}
              </Button>
            )}
          {place?.id &&
            place?.place_deletion &&
            place?.place_deletion[0]?.status === 'closed' && (
              <Button fontSize={fontSize} font={font} className="closed">
                {t('place_closed')}
              </Button>
            )}
          {place?.id &&
            place?.place_deletion &&
            !(place?.place_deletion[0]?.status === 'closed') &&
            !place?.place_deletion?.find(
              (request) => request.app_user_id === user.id,
            ) && (
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
          <Evaluations fontSize={fontSize} font={font} className="mt-3">
            <LatestComments
              comments={place?.place_evaluations}
              setPopUp={setPopUp}
            />
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
