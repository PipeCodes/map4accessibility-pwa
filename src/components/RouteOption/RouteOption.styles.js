import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const RouteContainer = styled.div`
  background-color: ${(props) =>
    updateValue(colors.background, props.backgroundColor)};
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  padding: 10px;
  min-width: 236px;
  min-height: 160px;
  margin: 20px 0;
`;

export const ContainerName = styled.div`
  width: 100%;
  display: flex;
`;
export const Name = styled.div`
  color: ${colors.primaryTextColor};
  font-size: ${(props) => updateFontSize(18, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin-right: 5px;
`;
export const Index = styled.div`
  width: 26px;
  color: white;
  background: ${(props) =>
    props.active === true ? colors.primaryColor : colors.grey};
  border: 1px solid ${colors.white};
  border-radius: 3px;
  text-align: center;
`;
export const Distance = styled.div`
  color: ${colors.grey};
  padding: 8px 0;
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;
export const Ratings = styled.div`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  display: flex;
  gap: 12px;
`;

export const Rating = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  margin-right: 5px;
  align-self: center;

  img {
    vertical-align: unset;
  }

  &.neutral-icon {
    background-color: ${colors.white};
    padding: 6px;
    border-radius: 3px;
    border: 1px solid ${colors.orange};
  }
  .neutral {
    color: ${colors.orange};
    width: 12px;
  }
`;

export const Number = styled.span`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${(props) => props.color};
`;

export const CTA = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;
export const GoToMaps = styled.a`
  background-color: ${colors.primaryColor};
  padding: 0 10px;
  border: none;
  border-radius: 16px;
  color: white !important;
  opacity: 1;
  display: flex;
  align-items: center;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
`;
export const Steps = styled.button`
  background-color: white;
  border: 1px solid ${colors.lightGrey};
  border-radius: 16px;
  opacity: 1;
  display: flex;
  align-items: center;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
`;
