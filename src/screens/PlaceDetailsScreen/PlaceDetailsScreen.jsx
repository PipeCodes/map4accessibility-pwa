import React, { useEffect, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ThumbsUp from '../../assets/icons/maps/up.svg';
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
  EvaluationsContainer,
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

  const comments = [
    {
      id: 6,
      thumb_direction: false,
      comment: 'first comment',
      questions_answers: null,
      created_at: '2022-12-07T18:29:15.000000Z',
      updated_at: '2022-12-07T18:29:15.000000Z',
      deleted_at: null,
      media_url: null,
    },
    {
      id: 7,
      thumb_direction: true,
      comment: 'second comment',
      questions_answers: null,
      created_at: '2022-12-07T18:29:15.000000Z',
      updated_at: '2022-12-07T18:29:15.000000Z',
      deleted_at: null,
      media_url: null,
    },
    {
      id: 8,
      thumb_direction: true,
      comment: 'third comment',
      questions_answers: null,
      created_at: '2022-12-07T18:29:15.000000Z',
      updated_at: '2022-12-07T18:29:15.000000Z',
      deleted_at: null,
      media_url: null,
    },
  ];

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
              <span className="fw-bold">{place?.place_type}</span>
            )}
            {place?.address && <span>{place?.address}</span>}
            {place?.phone && <span>{place?.phone}</span>}
            {place?.email && <span>{place?.email}</span>}
            {place?.website && <span>{place?.website}</span>}
            {place?.schedule && <span>{place?.schedule}</span>}
          </PlaceInformation>
        </div>
        <Evaluations fontSize={fontSize} className="mt-3">
          <div className="evaluations-header card">
            <span>{t('latest_evaluations')}</span>
          </div>
          <EvaluationsContainer fontSize={fontSize}>
            {comments?.map((comment, index) => (
              <div id={index}>
                <div className="user-info">
                  <span>user name</span>
                </div>
                <div className="rate-banner">
                  {comment?.thumb_direction ? (
                    <>
                      <img src={ThumbsUp} alt={t('positive')} />
                      <span>Accessible</span>
                    </>
                  ) : (
                    <>
                      <img src={ThumbsDown} alt={t('negative')} />
                      <span>Not accessible</span>
                    </>
                  )}
                </div>
                <div className="">
                  <span>{comment?.comment}</span>
                </div>
              </div>
            ))}
          </EvaluationsContainer>
        </Evaluations>
      </Container>
    </Page>
  );
};

export default withRouter(PlaceDetailsScreen);
