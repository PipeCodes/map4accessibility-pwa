import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Page,
  Container,
  Text,
  SearchFilters,
  FiltersContainer,
  Filter,
} from './SearchScreen.styles';
import { getPlaceByParams, resetPlaceState } from '../../store/actions/places';

import FilterIcon from '../../assets/icons/filters/filter.svg';
import { types } from '../../constants/placeTypes';
import PlacesList from '../../components/PlacesList/PlacesList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setText, setType } from '../../store/actions/search';

const SearchScreen = ({ history, routes }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const places = useSelector((state) => state?.place?.place?.data);
  const searchText = useSelector((state) => state?.search?.text);
  const filterType = useSelector((state) => state?.search?.placeType);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    dispatch(resetPlaceState());
  }, [dispatch]);

  useEffect(() => {
    setSearchData(places);
  }, [places]);

  const handleSearch = (value) => {
    dispatch(setText(value));
  };

  const setFilterType = (value) => {
    dispatch(setType(value));
  };

  useEffect(() => {
    if (searchText?.length >= 4 || filterType) {
      if (searchText?.length >= 4 && !filterType) {
        dispatch(getPlaceByParams({ name: searchText }));
      } else if (searchText < 4 && filterType) {
        dispatch(getPlaceByParams({ placeType: filterType }));
      } else {
        dispatch(getPlaceByParams({ name: searchText, placeType: filterType }));
      }
    } else {
      setSearchData(null);
    }
  }, [filterType, searchText, dispatch]);

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
        <SearchFilters>
          <Text fontSize={fontSize} font={font}>
            <img src={FilterIcon} alt="filter-icon" /> {t('filters')}
          </Text>
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
