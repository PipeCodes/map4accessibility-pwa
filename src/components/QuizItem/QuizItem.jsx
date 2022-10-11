import React from 'react';
import { QuizListItem, Lock, Check }  from './QuizItem.styles';

const QuizItem = (props) => {
  const { cycleColor, quiz, onQuizClick } = props;

  const check = quiz.is_completed ? <Check /> : null;

  return (
    <QuizListItem 
      cycleColor={cycleColor} 
      isCompleted={quiz.is_completed} 
      onClick={quiz.is_unlocked ? () => onQuizClick(quiz) : null}>
      {quiz.is_unlocked ? quiz.level : <Lock />}
      {check}
    </QuizListItem>
  );
}

export default QuizItem;