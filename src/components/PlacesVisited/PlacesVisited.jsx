import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import pinIcon from '../../assets/icons/places/pin.svg';
import { resetHistory } from '../../store/actions/history';
import {
  Wrapper,
  Title,
  TopWrapper,
  Place,
  Name,
  Image,
  TextWrapper,
  City,
  Button,
  ShowAll,
  NoResults,
} from './PlacesVisited.styles';

const PlacesVisited = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [viewAll, setViewAll] = useState(false);
  const places = useSelector((state) => state.history.history);
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

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <TopWrapper>
        <Title fontSize={fontSize} font={font}>
          {t('last_places_visited')}
        </Title>
      </TopWrapper>
      <>
        {places && placesList?.length !== 0 ? (
          placesList.map((place) => (
            <Place>
              <Image src={place?.place_image?.file_url} />
              <TextWrapper>
                <Name fontSize={fontSize} font={font}>
                  {place?.place_name}
                </Name>
                <City fontSize={fontSize} font={font}>
                  {place?.place_city}
                </City>
              </TextWrapper>
              <Button
                type="button"
                onClick={() => history.push('/place-details/'.concat(place.id))}
              >
                <img src={pinIcon} alt={place.id} />
              </Button>
            </Place>
          ))
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
      </>
    </Wrapper>
  );
};

export default PlacesVisited;
