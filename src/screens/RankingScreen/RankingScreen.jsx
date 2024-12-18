import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
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
import { countries } from '../../constants/countries';
import {
  getPlacesCountry,
  getPlacesByLocation,
} from '../../store/actions/places';

const RankingScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [ascDescActive, setAscDescActive] = useState(false);
  const [sliderActive, setSliderActive] = useState(false);
  const [country, setCountry] = useState(countries[139]);
  const ranking = useSelector((state) => state.placesRanking.ranking);
  const loading = useSelector((state) => state.placesRanking.loading);

  useEffect(() => {
    const order = ascDescActive ? 'inaccessible_count' : 'accessible_count';
    const radius = 5000; // Default radius for location, needs to be discussed and set in another place
    if (sliderActive) {
      dispatch(getPlacesByLocation(order, radius)).catch((error) =>
        // eslint-disable-next-line no-undef
        alert(error),
      );
    } else if (country) {
      dispatch(getPlacesCountry(country.value, order));
    }
  }, [sliderActive, country, ascDescActive, dispatch]);

  const filterCountries = useMemo(() => {
    const formatted = countries.map((option) => ({
      value: option.value,
      label: t(option.label),
    }));

    return [...formatted];
  }, [t]);

  // Click handlers
  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  // Open Page Details
  const openDetails = (id) => {
    history.push('/place-details/'.concat(id).concat('/null'));
  };

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
              font={font}
              fontSize={fontSize}
              onClick={setLocationHandler}
              className={sliderActive ? 'active' : ''}
            >
              <img src={LocationIcon} alt="Asc-Desc" />
              <span>{t('location')}</span>
            </SliderButon>
          </SliderFilter>
          <label htmlFor="country-select">
            <CustomSelect
              id="country-select"
              style={sliderActive ? { display: 'none' } : { width: '100%' }}
              defaultValue={filterCountries[139]}
              options={filterCountries}
              onChange={(value) => setCountry(value)}
            />{' '}
          </label>
        </FiltersWrapper>
        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : (
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
        )}
      </Container>

      <FooterMenu routes={routes} profile />
    </Page>
  );
};

export default RankingScreen;
