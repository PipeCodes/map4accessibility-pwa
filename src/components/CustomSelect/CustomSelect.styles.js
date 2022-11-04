import Select from 'react-select';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const StyledSelect = styled(Select)`
  .react-select__indicator-separator {
    visibility: hidden;
  }

  .react-select__control {
    height: 31px;
    min-height: 31px;
    width: 100%;
    outline: none;
    border-color: transparent;
    flex-wrap: nowrap;

    font-size: 16px;
    background-color: ${colors.white};

    .react-select__value-container {
      padding-left: 10px;
      padding-right: 10px;
      flex-wrap: nowrap;
      display: flex;

      .react-select__placeholder {
        color: ${colors.grey};
      }

      .react-select__single-value {
        color: ${colors.grey};
      }

      .react-select__input {
        color: ${colors.grey};
      }
    }

    .react-select__indicators,
    .react-select__dropdown-indicator {
      color: primaryColor;
    }
  }

  .react-select__control--is-focused {
    box-shadow: none;
    border: none;
  }

  .react-select__menu {
    font-size: 16px;
    color: ${colors.grey};

    .react-select__option--is-selected {
      background-color: ${colors.primaryColor};
    }
  }
`;
