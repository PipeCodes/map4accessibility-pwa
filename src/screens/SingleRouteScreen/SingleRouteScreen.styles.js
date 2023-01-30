import styled from 'styled-components';
import { updateValue, updateFontSize } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.background, props.backgroundColor)};
`;

export const TopWrapper = styled.div`
  background-color: ${(props) =>
    updateValue(colors.background, props.backgroundColor)};
  padding: 15px;
  width: 100%;
  margin: 20px 0;
  position: relative;
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

export const Title = styled.div`
  color: ${colors.primaryTextColor};
  font-size: ${(props) => updateFontSize(18, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin-right: 5px;
  margin-bottom: 20px;
  margin-top: 15px;
`;

export const Text = styled.div`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
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
  align-self: flex-start;
`;

export const Number = styled.span`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${(props) => props.color};
`;

export const Container = styled.div`
  background-color: ${(props) =>
    updateValue(colors.white, props.backgroundColor)};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  border-top: 1px solid ${colors.lightGrey};
  padding-bottom: 80px;
`;

export const Start = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid ${colors.lightGrey};
  img {
    align-self: center;
    margin-right: 15px;
  }
`;

export const CTA = styled.div`
  background-color: ${(props) =>
    updateValue(colors.background, props.backgroundColor)};
  display: flex;
  width: 100%;
  max-width: 820px;
  padding: 15px;
  justify-content: space-between;
  gap: 20px;
  box-shadow: 0px -2px 6px #00000014;
  bottom: 0;
  position: fixed;
`;

export const GoToMaps = styled.a`
  background-color: ${colors.primaryColor};
  padding: 9px 26px;
  border: none;
  border-radius: 20px;
  color: white !important;
  opacity: 1;
  display: flex;
  align-items: center;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;
export const BackToRoutes = styled.button`
  background-color: white;
  border: 1px solid ${colors.lightGrey};
  border-radius: 20px;
  padding: 9px 26px;
  opacity: 1;
  display: flex;
  align-items: center;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const AccessibilityButton = styled.button`
  border-radius: 100%;
  background: ${colors.primaryColor} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.primaryColor};
  color: ${colors.white};
  margin: 0;
  position: absolute;
  top: 30px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 15px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
