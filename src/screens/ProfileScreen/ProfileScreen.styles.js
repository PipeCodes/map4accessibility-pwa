import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${(props) => (props.editActive === true ? '100%' : '100vh')};
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

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    border: none;
    border-radius: 4px;
    box-shadow: 0px 2px 2px ${colors.shadow};
    -webkit-appearance: none;
    -webkit-box-shadow: 0px 2px 2px ${colors.shadow};
    padding: 5px;
    padding-left: 10px;
    color: ${colors.grey};
    margin-bottom: 10px;
    margin-top: 5px;
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Link = styled.a`
  color: ${colors.grey};
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
  margin-bottom: 10px;
`;

export const RankingButton = styled.button`
  border-radius: 100%;
  background: ${colors.primaryColor};
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: none;
  color: ${colors.white};
  margin: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  img {
    height: 25px;
    width: 25px;
  }
`;

export const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid ${colors.primaryColor};
`;

export const Name = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  margin-top: 5px;
  text-align: center;
`;

export const EditButton = styled.button`
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
  padding: 0;

  &.active {
    background: ${colors.primaryColor};
  }
`;

export const InputLabel = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  place-self: start;
  margin-top: 10px;
`;

export const Error = styled.div`
  font-size: ${(props) => updateFontSize(10, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
  place-self: start;
  color: ${colors.orange};
  margin-left: 10px;
`;
