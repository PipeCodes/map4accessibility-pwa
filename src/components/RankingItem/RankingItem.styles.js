import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  min-height: 50px;
  border-bottom: 5px solid ${colors.bgBlue};
  padding-left: 14px;
  padding-right: 19px;
  background-color: ${colors.darkBlue};

  ${(props) =>
    props.isLoggedUser &&
    css`
      background-color: ${colors.lightDarkBlue};
      border-bottom: 0;
    `}
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Position = styled.div`
  align-items: center;
  display: flex;
  color: #fff;
  font-family: 'Rubik-Bold';
  font-size: 15px;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  justify-content: center;
  margin-right: 18px;

  ${(props) =>
    props.position === 1 &&
    css`
      background-color: ${colors.gold};
      color: #fff;
    `}

  ${(props) =>
    props.position === 2 &&
    css`
      background-color: ${colors.silver};
      color: #fff;
    `}

    ${(props) =>
    props.position === 3 &&
    css`
      background-color: ${colors.bronze};
      color: #fff;
    `}

    ${(props) =>
    props.position > 3 &&
    css`
      background-color: transparent;
      color: #000;
      font-family: 'Rubik-Regular';
    `}

    ${(props) =>
    props.isLoggedUser &&
    css`
      color: #fff;
      font-family: 'Rubik-Regular';
      background-color: transparent;
    `}
`;

export const Avatar = styled.img`
  margin-right: 18px;
  color: white;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 16px;
`;

export const Username = styled.span`
  font-family: 'Rubik-Regular';
  font-size: 15px;
  margin-right: 18px;
  color: #fff;
`;

export const Points = styled.span`
  font-family: 'Rubik-Bold';
  font-size: 13px;
  justify-self: flex-end;
  color: #fff;
`;
