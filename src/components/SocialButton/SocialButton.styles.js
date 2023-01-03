import styled from 'styled-components';
import { updateFontSize } from '../../helpers/utils';
import { colors } from '../../constants/colors';

const ButtonStyle = styled.button`
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  width: ${(props) => (props.width ? props.width : '189px')};
  box-shadow: 0px 2px 2px ${colors.shadow};
  color: white;
  border: 0;
  height: 'auto';
  min-height: 42px;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 10px;
  }

  &:focus {
    outline: 0;
  }
`;

export default ButtonStyle;
