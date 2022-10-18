import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Title = styled.span`
  color: white;
  font-size: ${(props) => updateFontSize(28, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  display: flex;

  img {
    margin-right: 10px;
  }
`;

export const TopBarContainer = styled.div`
  position: relative;
  display: flex;
  z-index: 51;
  width: 100%;
  min-height: 42px;
  align-items: center;
  justify-content: left;
  background-color: ${(props) =>
    updateValue(colors.primaryColor, props.backgroundColor)};
  padding: 10px 15px;
  height: auto;

  &.accessibility {
    background: unset;
    box-shadow: unset;
    border-radius: unset;
  }

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 4px #00000005;
  border-radius: 0 0 100% 100%;
`;

export const LeftButton = styled.button`
  color: white;
  background-color: transparent;
  border: 0;
  margin: 0;
  position: absolute;
  top: 30px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 5px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 25px;
  }
`;

export const AccessibilityButton = styled.button`
  border-radius: 50%;
  background: #34518d 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px #00000029;
  border: 1px solid ${colors.primaryColor};
  color: white;
  margin: 0;
  position: absolute;
  top: 30px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 15px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 0px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding-right: 15px;
  justify-content: flex-end;
`;

export const Logo = styled.div`
  margin-top: 20px;
  margin-bottom: 22px;
  margin-left: auto;
  margin-right: auto;
  justify-self: center;
`;
