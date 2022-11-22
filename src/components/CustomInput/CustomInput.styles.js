import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

const InputStyle = styled.input`
  background-color: #ffffff;
  height: 40px;
  min-height: 40px;
  width: 100%;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  padding-left: 15px;
  padding-right: 15px;
  color: ${colors.grey};
  border: 1px solid ${colors.lightGrey};
  border-radius: 21px;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.grey};
    opacity: 1; /* Firefox */
  }
`;

export default InputStyle;
