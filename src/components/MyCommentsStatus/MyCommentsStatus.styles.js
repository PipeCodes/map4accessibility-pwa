import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Wrapper = styled.div`
  padding: 20px 15px;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid ${colors.lightGrey};
`;

export const Title = styled.h3`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
`;

export const Counter = styled.span`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  span {
    color: ${colors.primaryTextColor};
    margin-left: 5px;
    font-size: ${(props) => updateFontSize(20, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  }
`;

export const BotWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.h4`
  font-size: ${(props) => updateFontSize(18, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  padding-top: 20px;
  color: ${colors.primaryTextColor};
`;

export const BoxWrapper = styled.div`
  border-bottom: 1px solid ${colors.lightGrey};
  padding-bottom: 30px;
`;

export const Box = styled.span`
  width: 150px;
`;

export const Line = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin-right: 7px;
    height: 13px;
    width: 13px;
  }

  span {
    font-size: ${(props) => updateFontSize(16, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
    color: ${colors.grey};
  }
`;

export const Count = styled.span`
  font-size: ${(props) => updateFontSize(30, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${(props) => props.color};
  margin-left: 23px;
`;
