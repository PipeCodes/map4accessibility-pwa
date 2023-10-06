import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue, updateFontSize } from '../../helpers/utils';

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
  span {
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    color: ${colors.primaryColor};
    margin-left: 5px;
  }
`;
