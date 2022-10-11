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

export const QuizTitle = styled.span`
  color: white;
  font-size: 26px;
  font-family: 'Rubik-Bold';
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  z-index: 9999;
  overflow-y: scroll;
`;

export const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 280px;
  width: 280px;
  align-items: center;
`;

export const QuestionsCounter = styled.span`
  font-family: 'Rubik-Regular';
  font-size: 19px;
  color: #fff;
  margin-top: 5px;
`;

export const Question = styled.span`
  text-align: center;
  font-family: 'Rubik-Regular';
  color: #fff;
  font-size: 19px;
  margin-top: 15px;
`;

export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AnswerWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 23px;
`;

export const AnswerFeedbackWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswerFeedbackIcon = styled.img`
  width: ${(props) => (props.isCorrect ? '34px' : '30px')};
  width: ${(props) => (props.isCorrect ? '25px' : '30px')};
  object-fit: scale-down;
`;

export const AnswerFeedback = styled.span`
  text-align: center;
  font-family: 'Rubik-Regular';
  color: #fff;
  font-size: 26px;
`;
