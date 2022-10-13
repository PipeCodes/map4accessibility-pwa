import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  padding: 10px 15px;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.primaryColor};
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export const Box = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 0;
  border-top: 0.5px solid white;
  opacity: 1;

`;

export const BoxHalf = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 0;
  border-top: 0.5px solid white;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BoxTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Text = styled.span`
  font-size: 24px;
  text-font: 'EasyReadingPRO';
  color: white;
`;

export const EraserButton = styled.button`
  border-radius: 50%;
  background: white 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px #00000029;
  border:none;
  margin: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
