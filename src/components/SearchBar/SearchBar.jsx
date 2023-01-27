import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  LeftButton,
  SearchHeader,
  AccessibilityButton,
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
  }, [searchData]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
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
  );
};

export default SearchBar;
