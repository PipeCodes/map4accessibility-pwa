import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

export const BackgroundWaves = styled.img`
  position: absolute;
  width: 100%;
  height: 85%;
  object-fit: cover;
  bottom: 0;
  left: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  z-index: 9999;
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

export const Feedback = styled.div`
  color: white;
  font-size: 38px;
  font-family: 'Rubik-Bold';
  margin-top: 30px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  object-fit: cover;
`;

export const Username = styled.span`
  margin-top: 15px;
  color: white;
  font-size: 24px;
  font-family: 'Rubik-Regular';
`;

export const ScoreTitle = styled.span`
  color: white;
  font-size: 32px;
  font-family: 'Rubik-Bold';
  margin-top: 30px;
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Score = styled.span`
  color: white;
  font-size: 42px;
  font-family: 'Rubik-Bold';
`;

export const ScoreIcon = styled.img`
  height: 30px;
  object-fit: scale-down;
  margin-left: 9px;
  margin-top: -3px;
`;
