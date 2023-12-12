import React from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../constants/colors';
import { setBackgroundColor } from '../../store/actions/accessibility';
import { ColorsPalletContainer, Color } from './ColorsPallet.styles';

const ColorsPallet = () => {
  const dispatch = useDispatch();

  return (
    <ColorsPalletContainer>
      <Color
        color="black"
        onClick={() => dispatch(setBackgroundColor('black'))}
      />
      <Color
        color={colors.palleteWhite}
        onClick={() => dispatch(setBackgroundColor(colors.palleteWhite))}
      />
      <Color
        color={colors.green}
        onClick={() => dispatch(setBackgroundColor(colors.palleteGreen))}
      />
      <Color
        color={colors.palleteBlue}
        onClick={() => dispatch(setBackgroundColor(colors.palleteBlue))}
      />
      <Color color="red" onClick={() => dispatch(setBackgroundColor('red'))} />
      <Color
        color={colors.palleteOrange}
        onClick={() => dispatch(setBackgroundColor(colors.palleteOrange))}
      />
      <Color
        color={colors.palleteYellow}
        onClick={() => dispatch(setBackgroundColor(colors.palleteYellow))}
      />
      <Color
        color={colors.palletePurple}
        onClick={() => dispatch(setBackgroundColor(colors.palletePurple))}
      />
    </ColorsPalletContainer>
  );
};

export default ColorsPallet;
