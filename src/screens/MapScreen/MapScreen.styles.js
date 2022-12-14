import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: '100%';
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};
`;

export const Container = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 55;
  width: 100%;
  padding-bottom: 92px;
  margin-top: 30px;

  .fullDiv {
    height: 100%;
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  justify-content: space-between;
  display: flex;
  bottom: 82px;
  width: 100%;
  max-width: 820px;
  z-index: 55;
  padding: 0 15px;
  align-items: flex-end;
`;

export const ButtonCreate = styled.button`
  border-radius: 50%;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px #00000029;
  border: 1px solid ${colors.lightGrey};
  color: ${colors.primaryColor};
  margin: 0;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonDirections = styled.button`
  border-radius: 50%;
  background: ${colors.orange} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px #00000029;
  border: 1px solid ${colors.lightGrey};
  color: white;
  margin: 0;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonLocation = styled.button`
  border-radius: 50%;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px #00000029;
  border: 1px solid ${colors.lightGrey};
  color: ${colors.primaryColor};
  margin: 0;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;