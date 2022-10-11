import styled, { css } from 'styled-components';
import { ANSWER_STATE } from './Answer.constants';
import { colors } from '../../constants/colors';

export const Container = styled.div`
  height: auto;
  display: flex;
  padding: 10px 22px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  overflow: hidden;

  ${(props) =>
    props.state === ANSWER_STATE.DEFAULT &&
    css`
      background-color: #fff;
    `}

  ${(props) =>
    props.state === ANSWER_STATE.WRONG &&
    css`
      background-color: ${colors.red};
    `}

  ${(props) =>
    props.state === ANSWER_STATE.CORRECT &&
    css`
      background-color: ${colors.green};
    `}
`;

export const Text = styled.span`
  font-family: 'Rubik-Regular';
  font-size: 16px;

  ${(props) =>
    props.state === ANSWER_STATE.DEFAULT
      ? css`
          color: ${colors.grey};
        `
      : css`
          color: #fff;
        `}
`;
