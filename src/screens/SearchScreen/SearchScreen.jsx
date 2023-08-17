import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import {
  Page,
  Container,
  Text,
  SearchFilters,
  FiltersContainer,
  Filter,
  HeaderText,
  HeaderWrapper,
  DisabilityFilters,
  FilterToggleHeader,
  FilterToggleContent,
  FilterToggleArrow,
} from './SearchScreen.styles';
import { getPlaceByParams, resetPlaceState } from '../../store/actions/places';

import FilterIcon from '../../assets/icons/filters/filter.svg';
import FilterIconArrow from '../../assets/icons/back.svg';

import { types } from '../../constants/placeTypes';
import { disabilityTypes } from '../../constants/disabilityTypes';
import PlacesList from '../../components/PlacesList/PlacesList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setDisability, setText, setType } from '../../store/actions/search';

const SearchScreen = ({ history, routes }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const places = useSelector((state) => state?.place?.place);
  const loading = useSelector((state) => state?.place?.loading);
  const searchText = useSelector((state) => state?.search?.text);
  const filterType = useSelector((state) => state?.search?.placeType);
  const disabilityType = useSelector((state) => state?.search?.disabilityType);
  const [searchData, setSearchData] = useState(null);
  const [filterCollapsed, setFilterCollapsed] = useState(true);

  useEffect(() => {
    dispatch(resetPlaceState());
  }, [dispatch]);

  useEffect(() => {
    setSearchData(places);
    setFilterCollapsed(true);
  }, [places]);

  const handleSearch = (value) => {
    dispatch(setText(value));
  };

  const setFilterType = (value) => {
    dispatch(setType(value));
  };

  const setDisabilityType = (value) => {
    dispatch(setDisability(value));
  };

  useEffect(() => {
    if (searchText?.length >= 4 || filterType || disabilityType) {
      dispatch(
        getPlaceByParams({
          name: searchText?.length >= 4 ? searchText : undefined,
          placeType: filterType ?? undefined,
          disabilityType: disabilityType ?? undefined,
        }),
      );
    } else {
      setSearchData(null);
    }
  }, [filterType, disabilityType, searchText, dispatch]);

  return (
    <Page>
      <SearchBar
        searchData={searchData}
        setSearchData={setSearchData}
        history={history}
        routes={routes}
        searchText={searchText}
        handleSearch={handleSearch}
      />
      <Container backgroundColor={backgroundColor}>
        <FilterToggleHeader
          onClick={() => {
            setFilterCollapsed(!filterCollapsed);
          }}
        >
          <Text fontSize={fontSize} font={font}>
            <img src={FilterIcon} alt="filter-icon" /> {t('filters')}
          </Text>
          <FilterToggleArrow collapsed={filterCollapsed}>
            <img src={FilterIconArrow} alt="arrow-filter-icon" />
          </FilterToggleArrow>
        </FilterToggleHeader>
        <FilterToggleContent collapsed={filterCollapsed}>
          <SearchFilters>
            <HeaderWrapper>
              <HeaderText fontSize={fontSize} font={font}>
                {t('place_types')}
              </HeaderText>
            </HeaderWrapper>
            <FiltersContainer fontSize={fontSize} font={font}>
              {types?.map((filter, index) =>
                filter?.placeType === filterType ? (
                  <Filter fontSize={fontSize} font={font} key={index}>
                    <button
                      className="active"
                      type="button"
                      onClick={() => {
                        setFilterType(filter?.placeType);
                      }}
                    >
                      <img src={filter?.icon} alt={filter?.label} />
                      {filter?.label}
                    </button>
                  </Filter>
                ) : (
                  <Filter key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterType(filter?.placeType);
                      }}
                    >
                      <img src={filter?.icon} alt={filter?.label} />
                      {filter?.label}
                    </button>
                  </Filter>
                ),
              )}
            </FiltersContainer>
          </SearchFilters>
          <DisabilityFilters>
            <HeaderText fontSize={fontSize} font={font}>
              {t('disability_types')}
            </HeaderText>
            <FiltersContainer fontSize={fontSize} font={font}>
              {disabilityTypes?.map((disability, index) =>
                disability?.type === disabilityType ? (
                  <Filter fontSize={fontSize} font={font} key={index}>
                    <button
                      className="active tall-btn"
                      type="button"
                      onClick={() => {
                        setDisabilityType(disability?.type);
                      }}
                    >
                      <img src={disability?.icon} alt={disability?.label} />
                      {disability?.label}
                    </button>
                  </Filter>
                ) : (
                  <Filter key={index}>
                    <button
                      className="tall-btn"
                      type="button"
                      onClick={() => {
                        setDisabilityType(disability?.type);
                      }}
                    >
                      <img src={disability?.icon} alt={disability?.label} />
                      {disability?.label}
                    </button>
                  </Filter>
                ),
              )}
            </FiltersContainer>
          </DisabilityFilters>
        </FilterToggleContent>
        {loading && <Spinner animation="border" variant="dark" />}
        {searchData && (
          <PlacesList
            places={searchData}
            history={history}
            routes={routes}
            filterType={filterType}
            searchText={searchText}
          />
        )}
      </Container>
    </Page>
  );
};

export default withRouter(SearchScreen);
