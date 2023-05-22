import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const ButtonContainer = styled.div`
  position: fixed;

  padding: 1px 10px 3.5px 10px;
  background-color: ${colors.primaryColor};
  z-index: 100;
  display: flex;
  color: white;
  gap: 6px;
  border-radius: 0 0 20px 20px;
  align-items: center;
  flex-direction: row;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  img {
    height: 10px;
    width: 10px;
  }

  div {
    font-size: 14px;
  }
`;
