import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue, updateFontSize } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};
`;

export const Container = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
  padding-bottom: 92px;
  margin-top: 30px;

  .fullDiv {
    height: 100%;
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro-Bold', props.font)};
  color: ${colors.primaryTextColor};
  margin-bottom: 10px;
  align-self: start;
  span {
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    color: ${colors.primaryColor};
    margin-left: 5px;
  }
`;

export const MyArea = styled.div`
  width: 100%;
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  box-shadow: 0px 2px 2px ${colors.shadow};
`;
