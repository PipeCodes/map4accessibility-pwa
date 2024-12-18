import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
  height: 100%;

  .spinner {
    z-index: 1;
    position: absolute;
    margin: auto;
    align-self: center;
    height: 50px;
    width: 50px;
    margin-top: 100px;
  }
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
  align-items: flex-start;
  justify-content: space-between;
  z-index: 55;
  width: 100%;
  box-shadow: ${(props) => props.destination && '0px 2px 6px #00000029'};
`;

export const Inputs = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.lightGrey};
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  opacity: 1;
  padding: 6px 10px;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};

  @media (max-width: 450px) {
    width: 240px;
  }
`;

export const RouteInputs = styled.div`
  display: flex;
  flex-direction: row;
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
  border-radius: 100%;
  background: ${colors.primaryColor} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.primaryColor};
  color: white;
  margin: 0;
  right: 15px;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 5px;
  margin-right: 10px;
  img {
    height: 16px;
    width: 16px;
  }
`;
