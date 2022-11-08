import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.background, props.backgroundColor)};
`;

export const Container = styled.div`
  display: flex;
  padding: 10px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const MyMapComponent = styled.div`
  width: 100%;
`;

export const TopContainer = styled.div`
  display: flex;
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 54;
  width: 100%;
`;

export const RouteInputs = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
`;

export const LeftButton = styled.button`
  color: white;
  background-color: transparent;
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
  background: #34518d 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px #00000029;
  border: 1px solid ${colors.primaryColor};
  color: white;
  margin: 0;
  right: 15px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
