import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import pinIcon from '../../assets/icons/places/pin.svg';
import { getFirstImage } from '../../helpers/utils';
import { resetHistory } from '../../store/actions/history';
import {
  Wrapper,
  Title,
  TopWrapper,
  PlacesContainer,
  Place,
  Name,
  Image,
  TextWrapper,
  City,
  Button,
  ShowAll,
  NoResults,
} from './PlacesList.styles';

const PlacesList = ({ places, history, routes, searchText }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const [viewAll, setViewAll] = useState(false);
  const [placesList, setPlacesList] = useState([]);

  useEffect(() => {
    if (typeof places === 'string') {
      dispatch(resetHistory());
    }
    if (viewAll) {
      setPlacesList(places);
    } else {
      setPlacesList(places?.slice(0, 5));
    }
  }, [viewAll, places]);

  const viewAllHandler = () => {
    setViewAll((prevState) => !prevState);
  };

  const showPlaceOnMap = (lat, lng) => {
    history.push(routes.MAP.path, {
      search: { location: { lat: +lat, lng: +lng }, text: searchText },
    });
  };

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <TopWrapper>
        <Title fontSize={fontSize} font={font}>
          {t('results')}
        </Title>
      </TopWrapper>
      <PlacesContainer>
        {places && placesList?.length !== 0 ? (
          placesList?.map((place, key) => {
            const image = getFirstImage(place);
            return (
              <Place key={key}>
                {image?.file_url ? (
                  <Image className="1" src={image?.file_url} />
                ) : (
                  <Image className="2" src={image} />
                )}
                <TextWrapper>
                  <Name fontSize={fontSize} font={font}>
                    {place?.name}
                  </Name>
                  <City fontSize={fontSize} font={font}>
                    {place?.city}
                  </City>
                </TextWrapper>
                <Button
                  type="button"
                  onClick={() =>
                    showPlaceOnMap(place?.latitude, place?.longitude)
                  }
                >
                  <img src={pinIcon} alt={place.id} />
                </Button>
              </Place>
            );
          })
        ) : (
          <NoResults fontSize={fontSize} font={font}>
            {t('no_results')}
          </NoResults>
        )}
        {places?.length > 5 && (
          <ShowAll
            fontSize={fontSize}
            font={font}
            type="button"
            onClick={() => viewAllHandler()}
          >
            {' '}
            {viewAll ? t('show_less') : t('view_all')}
          </ShowAll>
        )}
      </PlacesContainer>
    </Wrapper>
  );
};

export default PlacesList;
