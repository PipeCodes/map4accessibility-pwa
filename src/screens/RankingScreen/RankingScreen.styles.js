import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: ${colors.bgBlue};
`;

export const Container = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;
