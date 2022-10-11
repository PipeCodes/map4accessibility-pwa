import styled from 'styled-components';
import { colors } from '../../constants/colors';

const ButtonStyle = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => (props.small ? colors.grey : '#ffffff')};
  border: 0;
  font-family: 'Rubik-Bold';
  margin-top: ${(props) => props.marginTop};
  font-size: ${(props) => (props.small ? '13px' : '23px')};
  width: ${(props) => (props.small ? '100px' : '189px')};
  height: ${(props) => (props.small ? '20px' : '42px')};
  min-height: ${(props) => (props.small ? '20px' : '42px')};
  border-radius: ${(props) => (props.small ? '2px' : '5px')};
  &:focus {
    outline: 0;
  }
`;

export default ButtonStyle;
