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
    updateValue(colors.transparent, props.backgroundColor)};
`;

export const Container = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
  height: 100%;

  .fullDiv {
    height: auto;
    margin-top: auto;
    margin-bottom: auto;
    gap: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  height: 210px;
  width: 210px;
  border-radius: 100%;
  background-color: ${colors.grey};
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryColorText};
  margin-bottom: 10px;
  max-width: 90%;
  span {
    font-size: ${(props) => updateFontSize(22, props.fontSize)};
    color: ${colors.primaryColor};
    margin-left: 5px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: auto;
  width: 100%;
  margin-bottom: 20px;

  button {
    width: 100%;
  }
`;
