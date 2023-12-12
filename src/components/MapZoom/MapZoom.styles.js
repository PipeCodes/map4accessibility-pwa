import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const ButtonsWrapper = styled.div`
  z-index: 55;
  bottom: 200px;
  position: absolute;
  right: 15px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const PlusZoom = styled.div`
  border-radius: 100%;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.lightGrey};
  margin: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MinusZoom = styled.div`
  border-radius: 100%;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.lightGrey};
  margin: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
