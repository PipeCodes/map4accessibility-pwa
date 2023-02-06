import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import x from '../../assets/icons/close-colored.svg';

import {
  PopUp,
  DarkOverlayContainer,
  Close,
  Container,
  Content,
  Question,
  Answer,
  Title,
} from './QuestionsPopUp.styles';

const QuestionPopUp = (props) => {
  const { questions, setPopUp } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  return (
    <Container>
      <DarkOverlayContainer />
      <PopUp backgroundColor={backgroundColor}>
        <Title fontSize={fontSize} font={font}>
          {t('questions')}
        </Title>
        <Close onClick={() => setPopUp(null)}>
          <img src={x} alt="back" />
        </Close>
        {questions?.length ? (
          <Content>
            {questions?.map((question, index) => (
              <>
                <Question fontSize={fontSize} font={font}>
                  {index + 1}. {question?.question}
                </Question>
                <Answer fontSize={fontSize} font={font}>
                  - {question?.answer}
                </Answer>
              </>
            ))}
          </Content>
        ) : (
          <Content>
            <span>NO RESULTS</span>
          </Content>
        )}
      </PopUp>
    </Container>
  );
};

export default QuestionPopUp;
