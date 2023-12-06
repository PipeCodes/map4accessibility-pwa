import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: black;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Wrapper = styled.div`
  max-height: 94px;
  max-width: 94px;
`;

export const LikesAndDislikes = styled.div`
  background-color: white;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  padding: 1px;
  gap: 9px;
  width: fit-content;
`;

export const Likes = styled.span`
  display: flex;
  justify-content: center;
  padding: 4px;
  color: green;
  img {
    display: block !important;
    margin-right: 5px;
  }
`;

export const Dislikes = styled.span`
  display: flex;
  justify-content: center;
  padding: 4px;
  color: red;
  img {
    display: block !important;
    margin-right: 5px;
  }
`;
