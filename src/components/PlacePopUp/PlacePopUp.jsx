import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ArrowRight from '../../assets/icons/arrow-right-colored.svg';
import x from '../../assets/icons/close-colored.svg';
import placeholder from '../../assets/images/photo-stock-1.png';
import Pin from '../../assets/icons/places/details/pin.svg';
import Phone from '../../assets/icons/places/details/phone.svg';
import Clock from '../../assets/icons/places/details/clock.svg';
import Email from '../../assets/icons/places/details/email.svg';
import Pointer from '../../assets/icons/places/details/mouse-pointer.svg';
import Path from '../../assets/icons/places/details/path.svg';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
import Neutral from '../../assets/icons/places/neutral.svg';
import {
  PopUp,
  DarkOverlayContainer,
  Close,
  Container,
  Image,
  Content,
  TextWrapper,
  Name,
  City,
  Accessible,
  PlaceInformation,
  Header,
} from './PlacePopUp.styles';
import CustomButton from '../CustomButton/CustomButton';

import { colors } from '../../constants/colors';
import { ACCESSIBILITY } from '../../constants';

const PlacePopUpComponent = (props) => {
  const { history, place, display, setPopUp } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [isAccessible, setIsAccessible] = useState('');

  // Sets Accessibility
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
    return '';
  }, [place, t]);

  // Open Page Details
  const openDetails = () => {
    history.push(
      '/place-details/'
        .concat(place?.id)
        .concat('/')
        .concat(place?.google_place_id),
    );
  };

  // Gets Place Media
  const getMedia = (place) => {
    if (place?.media) {
      return place?.media;
    }
    if (place?.media_evaluations.length) {
      return place?.media_evaluations[0].file_url;
    }
    return placeholder;
  };

  const getAccessibilityColor = useMemo(() => {
    switch (isAccessible) {
      case ACCESSIBILITY.ACCESSIBLE:
        return 'accessible';
      case ACCESSIBILITY.NOT_ACCESSIBLE:
        return 'not-accessible';
      case ACCESSIBILITY.NEUTRAL:
        return 'neutral';
      default:
        break;
    }
  }, [isAccessible]);

  return (
    <Container>
      {display && (
        <>
          <DarkOverlayContainer />
          <PopUp backgroundColor={backgroundColor}>
            <Close onClick={() => setPopUp(false)}>
              <img src={x} alt="back" />
            </Close>
            <Image src={getMedia(place)} />
            <Content>
              <Header>
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
                  <span className={getAccessibilityColor}>
                    {getAccessibility}
                  </span>
                  <div>
                    <span className="up">
                      <img src={ThumbsUp} alt={t('positive')} />{' '}
                      {place?.accessible_count || 0}
                    </span>
                    <span className="neutral ms-2">
                      <img src={Neutral} alt={t('neutral')} />{' '}
                      {place?.neutral_count || 0}
                    </span>
                    <span className="down ms-2">
                      <img src={ThumbsDown} alt={t('negative')} />{' '}
                      {place?.inaccessible_count || 0}
                    </span>
                  </div>
                </Accessible>
              </Header>
              <hr />
              <PlaceInformation fontSize={fontSize} font={font}>
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
                    <img src={Clock} alt={t('schedule')} />
                  </span>
                )}
                {place?.schedule &&
                  place?.schedule?.map((line) => <span>{line}</span>)}
              </PlaceInformation>

              <CustomButton
                style={{
                  marginTop: 30,
                  marginBottom: 20,
                  width: '100%',
                  borderRadius: '25px',
                  color: colors.grey,
                  border: '1px solid grey',
                }}
                backgroundColor={colors.transparent}
                text={t('view_more')}
                onClick={() => openDetails()}
                buttonicon
                icon={ArrowRight}
              />
            </Content>
          </PopUp>
        </>
      )}
    </Container>
  );
};

export default PlacePopUpComponent;
