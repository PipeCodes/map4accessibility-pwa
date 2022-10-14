import styled from 'styled-components';
import { updateFontSize } from '../../helpers/utils';
import { colors } from '../../constants/colors';

const ButtonStyle = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => (props.color ? props.color : '#ffffff')};
  border: ${(props) => (props.border ? props.border : 0)};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  width: ${(props) => (props.width ? props.width : '189px')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  min-height: ${(props) => (props.minHeight ? props.minHeight : '42px')};
  padding-top: 12px;
  padding-bottom: 12px;
  &:focus {
    outline: 0;
  }
`;

export default ButtonStyle;
