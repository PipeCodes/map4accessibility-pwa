import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ArrowRight from '../../assets/icons/arrow-right-colored.svg';
import x from '../../assets/icons/close-colored.svg';
import placeholder from '../../assets/images/photo-stock-1.png';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import Pin from '../../assets/icons/places/details/pin.svg';
import Phone from '../../assets/icons/places/details/phone.svg';
import Clock from '../../assets/icons/places/details/clock.svg';
import Email from '../../assets/icons/places/details/email.svg';
import Pointer from '../../assets/icons/places/details/mouse-pointer.svg';
import Path from '../../assets/icons/places/details/path.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
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
      if (sortedComments[0].thumb_direction) {
        setIsAccessible(true);
        return t('accessible');
      }
      setIsAccessible(false);
      return t('not_accessible');
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
                  <span
                    className={isAccessible ? 'accessible' : 'not-accessible'}
                  >
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
