import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

const InputStyle = styled.input`
  background-color: ${colors.white};
  height: 45px;
  min-height: 5px;
  width: 100%;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  padding-left: 15px;
  padding-right: ${(props) => (props.icon ? '40px' : '15px')};
  color: ${colors.grey};
  border: 1px solid ${colors.dark_shadow};
  border-radius: 21px;
  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.grey};
    opacity: 1; /* Firefox */
  }
`;

export default InputStyle;
