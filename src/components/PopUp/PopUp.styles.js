import styled, { css } from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const PopUp = styled.div`
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 16px;
  position: absolute;
  z-index: 56;
  border-radius: 25px;
  left: calc(50% - 166px);
  top: 25%;
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  margin-top: 15px;
`;

export const Icon = styled.div`
  img {
    height: 42px;
    width: 42px;
  }
`;

export const TextSecondary = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  width: 300px;
  margin-top: 30px;
`;

export const DarkOverlayContainer = styled.div`
  position: fixed;
  z-index: 55;
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
