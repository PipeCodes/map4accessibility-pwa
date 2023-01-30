import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const SearchHeader = styled.div`
  padding: 15px 15px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: absolute;
  z-index: 59;
  background-color: ${colors.background};
  max-width: 820px;
`;

export const LeftButton = styled.button`
  color: ${colors.white};
  background-color: ${colors.transparent};
  border: 0;
  margin: 0;
  top: 30px;
  left: 15px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    width: auto;
  }
`;

export const AccessibilityButton = styled.button`
  border-radius: 50%;
  background: ${colors.primaryColor} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.primaryColor};
  color: ${colors.white};
  margin: 0;
  position: absolute;
  right: 15px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;