import styled from 'styled-components';

export const ColorsPalletContainer = styled.div`
  justify-content: space-evenly;
  margin-top: 30px;
  height: ${(props) => (props.open ? 'auto' : 0)};
  display: ${(props) => (props.open ? 'flex' : 'none')};
`;

export const Color = styled.button`
  background-color: ${(props) => props.color};
  border-radius: 20px;
  height: 30px;
  width: 30px;
  border: 2px solid black;
`;
