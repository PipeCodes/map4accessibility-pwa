import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Container = styled.div`
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 820px;
  z-index: 60;
`;

export const PopUp = styled.div`
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 0;
  position: relative;
  border-radius: 4px;
  top: 100px;
  width: 95%;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
  button {
    img {
      rotate: ;
    }
  }
`;

export const Close = styled.div`
  height: 30px;
  width: 30px;
  background-color: white;
  display: flex;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  margin-top: 3px;
  margin-left: auto;
  cursor: pointer;
  img {
    height: 13px;
    width: 13px;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  padding: bottom;
`;

export const DarkOverlayContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  max-width: 820px;
  margin: 0px auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

export const Question = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Answer = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Title = styled.div`
  position: absolute;
  left: 15px;
  color: ${colors.primaryColor};
  font-size: ${(props) => updateFontSize(24, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;
