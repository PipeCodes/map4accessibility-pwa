import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Wrapper = styled.div`
  padding: 20px 15px;
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  width: 100%;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.lightGrey};
`;

export const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 13px;
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Place = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.lightGrey};
`;

export const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: ${colors.grey};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Name = styled.div`
  margin-right: auto;
  color: ${colors.grey};
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const City = styled.div`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  opacity: 0.5;
`;

export const NoResults = styled.div`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin-top: 15px;
`;

export const Button = styled.div`
  border-radius: 100%;
  background: ${colors.primaryColor} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.primaryColor};
  color: ${colors.white};
  padding: 9px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

export const ShowAll = styled.button`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
  border: none;
  background: transparent;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
`;
