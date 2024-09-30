import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

const ButtonStyle = styled.button`
  background-color: ${(props) => props.backgroundColor};
  box-shadow: ${(props) =>
    props.boxShadow ? props.boxShadow : '0px 2px 2px #00000029'};
  color: ${(props) => (props.color ? props.color : colors.white)};
  border: ${(props) => (props.border ? props.border : 0)};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  margin: ${(props) => (props.margin ? props.margin : 'unset')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
  width: ${(props) => (props.width ? props.width : '189px')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  min-height: ${(props) => (props.minHeight ? props.minHeight : '48px')};
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .spinner-border {
    color: ${colors.primaryColor} !important;
    margin: 0;
    margin-right: 10px;
    height: 20px;
    width: 20px;
  }

  img {
    margin-right: 10px;
  }

  &:focus {
    outline: 0;
  }
`;

export default ButtonStyle;
