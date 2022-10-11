import React from 'react';
import { ANSWER_STATE } from './Answer.constants';
import { Container, Text } from './Answer.styles';

const Answer = (props) => {
  const { state = ANSWER_STATE.DEFAULT, answer, onSelect } = props;

  return (
    <Container state={state} onClick={() => onSelect(answer)}>
      <Text state={state}>{answer.answer}</Text>
    </Container>
  );
};

export default Answer;
