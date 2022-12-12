import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 35px 1fr auto;
  align-items: center;
  width: 100%;
  flex-direction: row;
  min-height: 50px;
  border-bottom: 1px solid ${colors.grey};
  padding: 8px 14px;
  justify-content: space-evenly;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};
`;

export const Rank = styled.span`
  margin-right: 15px;
  justify-self: center;
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Image = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  backgroundcolor: ${colors.grey};
`;

export const TextWrapper = styled.div`
  min-width: 200px;
  padding: 0 20px;
`;

export const Name = styled.div`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
`;

export const City = styled.div`
  font-size: ${(props) => updateFontSize(12, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
`;

export const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  color: ${colors.green};
`;

export const DislikesWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  color: ${colors.google_red};
`;

export const Icon = styled.div`
  margin-right: 5px;
`;

export const Number = styled.span`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
`;
