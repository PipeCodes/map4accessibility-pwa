import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};
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
  border-top: 1px solid ${colors.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  margin-top: 30px;
`;

export const TextSecondary = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
`;
