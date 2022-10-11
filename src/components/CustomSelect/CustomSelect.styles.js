import Select from 'react-select';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { SELECT_MODE } from './CustomSelect.constants';

export const StyledSelect = styled(Select)`
  .react-select__indicator-separator {
    visibility: hidden;
  }

  .react-select__control {
    height: 37px;
    min-height: 37px;
    width: 276px;
    outline: none;
    border-color: transparent;

    font-family: ${(props) =>
      props.mode === SELECT_MODE.light ? 'Rubik-Regular' : 'Rubik-Bold'};
    font-size: ${(props) =>
      props.mode === SELECT_MODE.light ? '13px' : '16px'};
    background-color: ${(props) =>
      props.mode === SELECT_MODE.light ? '#fff' : colors.darkBlue};

    .react-select__value-container {
      padding-left: 14px;
      padding-right: 14px;

      .react-select__placeholder {
        color: ${(props) =>
          props.mode === SELECT_MODE.light ? colors.grey : '#fff'};
      }

      .react-select__single-value {
        color: ${(props) =>
          props.mode === SELECT_MODE.light ? colors.grey : '#fff'};
      }

      .react-select__input {
        color: ${(props) =>
          props.mode === SELECT_MODE.light ? colors.grey : '#fff'};
      }
    }

    .react-select__indicators,
    .react-select__dropdown-indicator {
      color: ${(props) =>
        props.mode === SELECT_MODE.light ? colors.grey : '#fff'};
    }
  }

  .react-select__control--is-focused {
    box-shadow: none;
    border: none;
  }

  .react-select__menu {
    font-family: ${(props) =>
      props.mode === SELECT_MODE.light ? 'Rubik-Regular' : 'Rubik-Bold'};
    font-size: ${(props) =>
      props.mode === SELECT_MODE.light ? '13px' : '16px'};
    color: ${colors.grey};

    .react-select__option--is-selected {
      background-color: ${colors.green};
    }
  }
`;
