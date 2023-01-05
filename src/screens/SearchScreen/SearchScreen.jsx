import React, { useCallback, useState } from 'react';
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
import { getPlaceByParams } from '../../store/actions/places';
import BackIcon from '../../assets/icons/back.svg';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import Magnifier from '../../assets/icons/places/magnifier.svg';
import CustomInput from '../../components/CustomInput/CustomInput';
import { filterTypes } from '../../constants/placeTypes';

const SearchScreen = (props) => {
  const { backTarget, history, routes } = props;
  const [searchText, setSearchText] = useState('');

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value?.length >= 4) {
      dispatch(getPlaceByParams({ name: value }));
    }
  };

  return (
    <Page>
      <SearchHeader>
        <LeftButton type="button" onClick={backTarget || history.goBack}>
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
        <SearchFilters>
          <Text fontSize={fontSize} font={font}>
            {t('filters')}
          </Text>
          <FiltersContainer fontSize={fontSize} font={font}>
            {filterTypes?.map((filter, index) => (
              <div key={index} className="filter">
                <button type="button">
                  <img src={filter?.icon} alt={`icon-${filter?.label}`} />
                  {filter?.label}
                </button>
              </div>
            ))}
          </FiltersContainer>
        </SearchFilters>
      </Container>
    </Page>
  );
};

export default withRouter(SearchScreen);
