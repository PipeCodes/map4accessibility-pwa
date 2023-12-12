import styled from 'styled-components';
import { updateValue, updateFontSize } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-top: 1px solid ${colors.lightGrey};
`;
export const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Maneuver = styled.img`
  margin-right: 15px;
  height: 20px;
  width: 20px;
  align-self: center;
`;
export const Instructions = styled.div`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
`;
export const Distance = styled.div`
  margin-left: 35px;
  font-size: ${(props) => updateFontSize(12, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  opacity: 0.5;
`;
