import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const StyledToast = styled.div`
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  border: none;
  color: ${colors.primaryTextColor};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
`;
