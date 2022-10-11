import styled from 'styled-components';

export const CardContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  height: 64px;
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Title = styled.span`
  font-family: 'Rubik-Bold';
  font-size: 16px;
  color: #ffffff;
`;

export const Subtitle = styled.span`
  font-family: 'Rubik-Regular';
  font-size: 16px;
  color: #ffffff;
`;
