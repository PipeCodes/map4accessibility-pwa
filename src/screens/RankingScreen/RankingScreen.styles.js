import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};
`;

export const Container = styled.div`
  display: flex;
  padding: 15px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
  padding-bottom: 92px;

  .fullDiv {
    height: 100%;
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
  label {
    width: 100%;
  }
`;

export const SliderFilter = styled.div`
  background-color: ${(props) =>
    updateValue(colors.lightGrey, props.backgroundColor)};
  border: 0.5px solid ${colors.lightGrey};
  display: flex;
  flex-direction: row;
  padding: 5px;
  border-radius: 20px;
`;

export const SliderButon = styled.button`
  background: ${colors.transparent};
  border: none;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  color: ${colors.white};
  align-items: center;
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};

  img {
    height: 20px;
    width: 20px;
  }

  span {
    margin-left: 5px;
    margin-right: 10px;
  }

  &.active {
    background: ${colors.primaryColor};
  }
`;

export const AscDescButton = styled.button`
  border-radius: 100%;
  background: ${colors.transparent};
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 2px solid ${colors.primaryColor};
  color: ${colors.white};
  margin: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  align-self: flex-start;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }

  &.active {
    background: ${colors.primaryColor};
  }
`;

export const RanksContainer = styled.div`
  background-color: ${colors.white};
  margin-top: 20px;
  width: 100%;
`;
