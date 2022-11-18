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
import PlaceholderIcon from '../../assets/icons/avatar_1.png';
import LocationIcon from '../../assets/icons/location.svg';
import TopBar from '../../components/TopBar/TopBar';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import RankingItem from '../../components/RankingItem/RankingItem';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { countries } from '../../constants';

const resultsArray = [
  {
    id: '1',
    image: PlaceholderIcon,
    name: 'Green City Park',
    city: 'Lisboa',
    likes: 321,
  },
  {
    id: '2',
    image: PlaceholderIcon,
    name: 'Tropic Hotel',
    city: 'Algarve',
    likes: 312,
  },
  {
    id: '3',
    image: PlaceholderIcon,
    name: 'Museum Of Fine Arts',
    city: 'Porto',
    likes: 311,
  },
  {
    id: '4',
    image: PlaceholderIcon,
    name: 'Seaview Hotel',
    city: 'Lisboa',
    likes: 231,
  },
  {
    id: '5',
    image: PlaceholderIcon,
    name: 'Contemporary Museum',
    city: 'Lisboa',
    likes: 213,
  },
  {
    id: '6',
    image: PlaceholderIcon,
    name: 'Round Table Restaurant',
    city: 'Braga',
    likes: 212,
  },
  {
    id: '7',
    image: PlaceholderIcon,
    name: 'Carlos Rogers Park',
    city: 'Lisboa',
    likes: 193,
  },
  {
    id: '8',
    image: PlaceholderIcon,
    name: 'Parque Las dunas',
    city: 'Porto',
    likes: 191,
  },
  {
    id: '9',
    image: PlaceholderIcon,
    name: 'Miradouro Ourique',
    city: 'Ourique',
    likes: 189,
  },
  {
    id: '10',
    image: PlaceholderIcon,
    name: 'AlgarvShoping',
    city: 'Faro',
    likes: 188,
  },
];

const RankingScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [ascDescActive, setAscDescActive] = useState(false);
  const [sliderActive, setSliderActive] = useState(false);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (country) {
      console.log('Call API');
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
    <Page>
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
          <SliderFilter>
            <SliderButon
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

          {!sliderActive && (
            <CustomSelect
              style={{ width: '100%' }}
              defaultValue={filterCountries[0]}
              options={filterCountries}
              onChange={(value) => setCountry(value)}
            />
          )}
        </FiltersWrapper>
        <RanksContainer>
          {ascDescActive
            ? [...resultsArray]
                .reverse()
                .map((item) => (
                  <RankingItem
                    key={`key_${item.id}_${item.ranking_order}`}
                    item={item}
                  />
                ))
            : resultsArray.map((item) => (
                <RankingItem
                  key={`key_${item.id}_${item.ranking_order}`}
                  item={item}
                />
              ))}
        </RanksContainer>
      </Container>

      <FooterMenu routes={routes} profile />
    </Page>
  );
};

export default RankingScreen;
