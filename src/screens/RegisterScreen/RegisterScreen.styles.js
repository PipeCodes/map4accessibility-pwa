import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  z-index: 54;
`;

export const Container = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;

  .fullDiv {
    height: 100%;
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Error = styled.div`
  font-size: ${(props) => updateFontSize(10, props.fontSize)};
  place-self: start;
  color: orange;
  margin-left: 10px;
`;

export const Box = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0;
  border-top: 1px solid #d3d2da;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BackButton = styled.a`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 5px;
  }
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryColorText};
  margin-bottom: 10px;
  span {
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    color: ${colors.primaryColor};
    margin-left: 5px;
  }
`;

export const TextSecondary = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
`;

export const InputLabel = styled.div`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  place-self: start;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 10px;

  span {
    color: ${colors.orange};
  }
`;
