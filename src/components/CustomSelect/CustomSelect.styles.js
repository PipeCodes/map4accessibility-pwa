import Select from 'react-select';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const StyledSelect = styled(Select)`
  .react-select__indicator-separator {
    visibility: hidden;
  }

  .react-select__control {
    height: auto;
    min-height: 31px;
    width: 100%;
    outline: none;
    border-color: 0.5px solid ${colors.lightGrey};
    flex-wrap: nowrap;

    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
    background-color: ${colors.white};
    background-color: ${(props) =>
      updateValue(colors.white, props.backgroundColor)};

    .react-select__option {
      padding: 4px 12px;
    }

    .react-select__value-container {
      padding-left: 10px;
      padding-right: 10px;
      flex-wrap: nowrap;
      display: flex;
      padding: 0;

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
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
    color: ${colors.grey};
    background-color: ${(props) =>
      updateValue(colors.white, props.backgroundColor)};

    .react-select__option--is-selected {
      background-color: ${colors.primaryColor};
    }
  }
`;
