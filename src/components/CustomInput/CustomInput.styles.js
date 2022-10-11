import styled from 'styled-components';
import { colors } from '../../constants/colors';

const InputStyle = styled.input`
  border-radius: 5px;
  background-color: #ffffff;
  height: 37px;
  min-height: 37px;
  width: 276px;
  font-size: 13px;
  padding-left: 16px;
  padding-right: 16px;
  outline: none;
  color: ${colors.grey};
  border-color: transparent;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.grey};
    opacity: 1; /* Firefox */
  }
`;

export default InputStyle;
