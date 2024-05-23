import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  LeftButton,
  SearchHeader,
  AccessibilityButton,
  SearchButton,
  InputLabel,
} from './SearchBar.styles';
import BackIcon from '../../assets/icons/back.svg';
import AccessibilityIcon from '../../assets/icons/accessibility.svg';
import Magnifier from '../../assets/icons/places/magnifier.svg';
import CustomInput from '../CustomInput/CustomInput';

const SearchBar = ({
  searchData,
  setSearchData,
  history,
  routes,
  searchText,
  handleSearch,
  handleSearchAction,
}) => {
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const handleBackButton = useCallback(() => {
    if (searchData) {
      setSearchData(null);
    } else {
      return history.goBack();
    }
  }, [searchData, history, setSearchData]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <SearchHeader>
      <LeftButton type="button" onClick={() => handleBackButton()}>
        <img src={BackIcon} alt="back" />
      </LeftButton>
      <InputLabel htmlFor="search-input" className="input-label">
        {t('search')}
      </InputLabel>
      <CustomInput
        fontSize={fontSize}
        font={font}
        style={{
          borderRadius: '4px',
          marginRight: '50px',
        }}
        placeholder={t('search')}
        type="text"
        alt
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        icon={Magnifier}
        id="search-input"
      />
      <SearchButton type="button" onClick={handleSearchAction}>
        <img src={Magnifier} alt="Search Icon" />
      </SearchButton>
      <AccessibilityButton type="button" onClick={openAccessibility}>
        <img src={AccessibilityIcon} alt="Accessibility" />
      </AccessibilityButton>
    </SearchHeader>
  );
};

export default SearchBar;
