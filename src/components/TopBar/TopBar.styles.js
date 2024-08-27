import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Title = styled.h1`
  color: ${colors.white};
  font-size: ${(props) => updateFontSize(28, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  display: flex;
  line-height: 38px;

  img {
    margin-right: 10px;
  }

  &.page {
    color: ${colors.primaryTextColor};
    align-self: flex-start;
  }
`;

export const TopBarContainer = styled.div`
  position: relative;
  display: flex;
  z-index: 56;
  width: 100%;
  min-height: 92px;
  align-items: center;
  justify-content: left;
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  padding: 10px 15px;
  height: auto;
  top: 0;
  position: sticky;

  &.accessibility {
    background: unset;
    box-shadow: unset;
    border-radius: unset;
    background-color: ${(props) =>
      updateValue(colors.primaryColor, props.backgroundColor)};
  }

  box-shadow: 0px 2px 4px ${colors.shadow};
  border-radius: 0 0 100% 100%;
`;

export const LeftButton = styled.button`
  color: ${colors.white};
  background-color: ${colors.transparent};
  border: 0;
  margin: 0;
  top: 30px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
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
  color: ${colors.white};
  margin: 0;
  position: absolute;
  top: 30px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 15px;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MagnifierButton = styled.button`
  display: flex;
  all: unset;
  margin: 8px 60px auto auto;
`;

export const CloseButton = styled.button`
  background: ${colors.transparent};
  color: ${colors.white};
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 0px;
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

  &.aligned {
    margin-top: 0px;
  }
`;
