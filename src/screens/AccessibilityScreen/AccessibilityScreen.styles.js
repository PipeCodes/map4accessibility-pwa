import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    updateValue(colors.primaryColor, props.backgroundColor)};
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  z-index: 54;
`;

export const Container = styled.div`
  display: flex;
  padding: 10px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
`;

export const Box = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 0;
  border-top: 0.5px solid white;
  opacity: 1;
`;

export const BoxHalf = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 0;
  border-top: 0.5px solid white;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BoxTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: white;
`;

export const EraserButton = styled.button`
  border-radius: 50%;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: none;
  margin: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
