import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Page,
  Container,
  Text,
  LeftButton,
  SearchHeader,
  AccessibilityButton,
  SearchFilters,
  FiltersContainer,
} from './SearchScreen.styles';
import { getPlaceByParams, resetPlaceState } from '../../store/actions/places';
import BackIcon from '../../assets/icons/back.svg';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import Magnifier from '../../assets/icons/places/magnifier.svg';
import FilterIcon from '../../assets/icons/filters/filter.svg';
import CustomInput from '../../components/CustomInput/CustomInput';
import { filterTypes } from '../../constants/placeTypes';
import PlacesList from '../../components/PlacesList/PlacesList';
import { getCurrentLocation } from '../../services/geolocation';

const SearchScreen = ({ history, routes }) => {
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState(null);
  const [locationReal, setLocationReal] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const places = useSelector((state) => state?.place?.place?.data);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  useEffect(() => {
    dispatch(resetPlaceState());
  }, []);

  useEffect(() => {
    setLocation(null);
    setSearchData(places);
  }, [places]);

  const handleBackButton = useCallback(() => {
    if (location) {
      setLocation(null);
    } else if (searchData) {
      setSearchData(null);
    } else {
      return history.goBack();
    }
  }, [location, searchData]);

  const handleClickFilter = useCallback(() => {
    getCurrentLocation()
      .then((position) => {
        setLocation(position);
        setLocationReal({ lat: position?.lat, lng: position?.lng });
      })
      .catch((error) => {
        setLocation({ lat: 38.736946, lng: -9.142685 });
        setLocationReal({ lat: 38.736946, lng: -9.142685 });
        alert(error);
      });
  }, [getCurrentLocation]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value?.length >= 4) {
      dispatch(getPlaceByParams({ name: value }));
    } else {
      setSearchData(null);
    }
  };

  return (
    <Page>
      <SearchHeader>
        <LeftButton type="button" onClick={() => handleBackButton()}>
          <img src={BackIcon} alt="back" />
        </LeftButton>
        <CustomInput
          fontSize={fontSize}
          font={font}
          style={{
            borderRadius: '4px',
            marginRight: '50px',
          }}
          placeholder={t('search')}
          type="text"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          icon={Magnifier}
        />
        <AccessibilityButton type="button" onClick={openAccessibility}>
          <img src={AccessibilityIcon} alt="Accessibility" />
        </AccessibilityButton>
      </SearchHeader>
      <Container backgroundColor={backgroundColor}>
        {searchData || location ? (
          <PlacesList
            places={searchData}
            history={history}
            routes={routes}
            location={location}
            setLocation={setLocation}
            locationReal={locationReal}
            setLocationReal={setLocationReal}
            filterType={filterType}
          />
        ) : (
          <SearchFilters>
            <Text fontSize={fontSize} font={font}>
              <img src={FilterIcon} alt="filter-icon" /> {t('filters')}
            </Text>
            <FiltersContainer fontSize={fontSize} font={font}>
              {filterTypes?.map((filter, index) => (
                <div key={index} className="filter">
                  <button
                    type="button"
                    onClick={() => {
                      handleClickFilter();
                      setFilterType(filter?.placeType);
                    }}
                  >
                    <img
                      src={filter?.icon}
                      alt={`icon/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html-${filter?.label}`}
                    />
                    {filter?.label}
                  </button>
                </div>
              ))}
            </FiltersContainer>
          </SearchFilters>
        )}
      </Container>
    </Page>
  );
};

export default withRouter(SearchScreen);
