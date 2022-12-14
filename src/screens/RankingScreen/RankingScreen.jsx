import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Page,
  Container,
  AscDescButton,
  FiltersWrapper,
  SliderFilter,
  SliderButon,
  RanksContainer,
} from './RankingScreen.styles';
import ArrowsIcon from '../../assets/icons/arrows.svg';
import ArrowsActiveIcon from '../../assets/icons/arrows-active.svg';
import FlagIcon from '../../assets/icons/flag.svg';
import LocationIcon from '../../assets/icons/location.svg';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import RankingItem from '../../components/RankingItem/RankingItem';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { countries } from '../../constants';
import { getPlacesCountry, getPlacesRadius } from '../../store/actions/places';

const RankingScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const [ascDescActive, setAscDescActive] = useState(false);
  const [sliderActive, setSliderActive] = useState(false);
  const [country, setCountry] = useState(countries[0]);
  const ranking = useSelector((state) => state.placesRanking.ranking);

  useEffect(() => {
    const order = ascDescActive ? 'thumbs_down_count' : 'thumbs_up_count';
    const radius = 5000; // Default radius for location, needs to be discussed and set in another place
    if (sliderActive) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(getPlacesRadius(latitude, longitude, order, radius));
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        },
      );
    } else if (country) {
      dispatch(getPlacesCountry(country.label, order));
    }
  }, [sliderActive, country, ascDescActive, dispatch]);

  const filterCountries = useMemo(() => {
    const formatted = countries.map((option) => ({
      value: option.id,
      label: t(option.label),
      icon: option.icon,
    }));

    return [...formatted];
  }, [t]);

  // Click handlers
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const openDetails = useCallback(
    (id) => {
      history.push('/place-details/'.concat(id));
    },
    [history, routes],
  );

  const ascDescHandler = () => {
    setAscDescActive((prevState) => !prevState);
  };

  const setCountryHandler = () => {
    setSliderActive(false);
  };

  const setLocationHandler = () => {
    setSliderActive(true);
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        hasBackButton
        aligned
        page
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
        title={t('ranking')}
      />
      <Container>
        <FiltersWrapper>
          <AscDescButton
            className={ascDescActive ? 'active' : ''}
            onClick={() => ascDescHandler()}
          >
            <img
              src={ascDescActive ? ArrowsActiveIcon : ArrowsIcon}
              alt="Asc-Desc"
            />
          </AscDescButton>
          <SliderFilter backgroundColor={backgroundColor}>
            <SliderButon
              font={font}
              fontSize={fontSize}
              onClick={setCountryHandler}
              className={sliderActive ? '' : 'active'}
            >
              <img src={FlagIcon} alt="Asc-Desc" />
              <span>{t('country')}</span>
            </SliderButon>
            <SliderButon
              onClick={setLocationHandler}
              className={sliderActive ? 'active' : ''}
            >
              <img src={LocationIcon} alt="Asc-Desc" />
              <span>{t('location')}</span>
            </SliderButon>
          </SliderFilter>

          <CustomSelect
            style={sliderActive ? { display: 'none' } : { width: '100%' }}
            defaultValue={filterCountries[0]}
            options={filterCountries}
            onChange={(value) => setCountry(value)}
          />
        </FiltersWrapper>
        <RanksContainer>
          {ranking && Object.keys(ranking).length
            ? ranking.map((item, id) => (
                <RankingItem
                  ascDescActive={ascDescActive}
                  key={id}
                  rank={id}
                  item={item}
                  onClick={(id) => openDetails(id)}
                />
              ))
            : t('no_results')}
        </RanksContainer>
      </Container>

      <FooterMenu routes={routes} profile />
    </Page>
  );
};

export default RankingScreen;
