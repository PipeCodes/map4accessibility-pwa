import styled from 'styled-components';
import { colors } from '../../constants/colors';
import LockIllustration from '../../assets/images/lock.svg';
import CheckIcon from '../../assets/images/correct_answer.svg';

export const QuizListItem = styled.div`
  position: relative;
  font-family: 'Rubik-Bold';
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${props => props.isCompleted ? colors.green : colors.lightBlue};
  width: 65px;
  height: 65px;
  z-index: 10;
  font-size: 35px;
  color: ${props => props.isCompleted ? '#FFF' : props.cycleColor };
`;

export const Lock = styled.img`
  content: url(${LockIllustration});
`;

export const Check = styled.img`
  position: absolute;
  right: -12px;
  top: -12px;
  z-index: 50;
  content: url(${CheckIcon});
  width: 35px;
  height: auto;
`;