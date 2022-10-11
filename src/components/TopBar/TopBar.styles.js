import styled from 'styled-components';

export const Title = styled.span`
  color: white;
  font-size: 32px;
  font-family: 'Rubik-Bold';
`;

export const TopBarContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor ?? props.darkTopbar};
  height: 60px;
  margin-bottom: 0;
`;

export const LeftButton = styled.button`
  color: white;
  background-color: transparent;
  border: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 5px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 25px;
  }
`;

export const RightButton = styled.button`
  color: white;
  background-color: transparent;
  border: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 5px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 25px;
  }
`;
