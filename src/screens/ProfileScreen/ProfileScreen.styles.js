import styled from 'styled-components';
import BackgroundImage from '../../assets/images/bg_blue.svg';
import { colors } from '../../constants/colors';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background: url(${BackgroundImage}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: ${colors.bgBlue};
`;

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  justify-content: space-between;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ScoreImg = styled.img`
  height: 21px;
  margin-left: 5px;
`;

export const Score = styled.span`
  font-family: 'Rubik-Bold';
  font-size: 42px;
  color: #fff;
`;

export const EditableContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 32px;
`;

export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export const Username = styled.span`
  color: #fff;
  font-size: 22px;
  font-family: 'Rubik-Regular';
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 200px;

  @media (max-width: 375px) {
    max-width: 185px;
  }

  @media (max-width: 320px) {
    max-width: 120px;
  }
`;

export const Region = styled.span`
  color: #fff;
  font-size: 14px;
  font-family: 'Rubik-Regular';
`;

export const EditButton = styled.img`
  display: flex;
  justify-self: flex-end;
`;

export const StatsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatsItemCount = styled.span`
  color: #fff;
  font-family: 'Rubik-Bold';
  font-size: 24px;
  margin-bottom: 5px;
`;

export const StatsItemTitle = styled.span`
  color: #fff;
  font-family: 'Rubik-Regular';
  font-size: 14px;
  text-align: center;
`;

export const PrivacyPolicyLink = styled.button`
  color: #fff;
  outline: none;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-family: 'Rubik-Regular';
  font-size: 13px;
  margin-bottom: 40px;

  &:hover {
    color: #fff;
  }
`;

export const LogoutButton = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    color: #fff;
    text-decoration: underline;
    font-family: 'Rubik-Bold';
    font-size: 20px;
    margin-left: 10px;
  }
`;
