import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: ${(props) => updateValue('#f4f6f9', props.backgroundColor)};
`;

export const Title = styled.div`
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 13px;
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  backgroundcolor: ${colors.grey};
`;

export const Name = styled.div`
  margin-left: 10px;
  margin-right: auto;
  color: ${colors.primaryTextColor};
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Status = styled.div`
  margin-right: 15px;
`;

export const Accessible = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 15px;
  align-items: center;
  box-shadow: 0px 2px 2px #0000000a;
  background-color: ${(props) => updateValue('#e0e5ee', props.backgroundColor)};
`;

export const Icon = styled.img`
  width: 33px;
  height: 33px;
`;

export const Label = styled.div`
  margin-left: 10px;
  color: ${colors.gray};
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Body = styled.div`
  width: 100%;
  padding: 10px 15px;
  color: ${colors.grey};
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const ShowAll = styled.button`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  border: none;
  background: transparent;
  padding-bottom: 15px;
`;
