import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const Dots = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Item = styled.span`
  background-color: ${colors.lightGrey};
  border-radius: 20px;
  height: 8px;
  width: 8px;

  &.selected {
    background-color: ${colors.primaryColor};
    width: 25px;
  }
`;
