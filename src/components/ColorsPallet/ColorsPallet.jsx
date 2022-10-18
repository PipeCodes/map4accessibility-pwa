import React from 'react';
import { useDispatch } from 'react-redux';
import { setBackgroundColor } from '../../store/actions/accessibility';
import { ColorsPalletContainer, Color } from './ColorsPallet.styles';

const ColorsPallet = (props) => {
  const { open } = props;
  const dispatch = useDispatch();
  return (
    <ColorsPalletContainer open={open}>
      <Color
        color="black"
        onClick={() => dispatch(setBackgroundColor('black'))}
      />
      <Color
        color="grey"
        onClick={() => dispatch(setBackgroundColor('grey'))}
      />
      <Color
        color="green"
        onClick={() => dispatch(setBackgroundColor('green'))}
      />
      <Color
        color="blue"
        onClick={() => dispatch(setBackgroundColor('blue'))}
      />
      <Color color="red" onClick={() => dispatch(setBackgroundColor('red'))} />
      <Color
        color="orange"
        onClick={() => dispatch(setBackgroundColor('orange'))}
      />
      <Color
        color="yellow"
        onClick={() => dispatch(setBackgroundColor('yellow'))}
      />
      <Color
        color="purple"
        onClick={() => dispatch(setBackgroundColor('purple'))}
      />
    </ColorsPalletContainer>
  );
};

export default ColorsPallet;
