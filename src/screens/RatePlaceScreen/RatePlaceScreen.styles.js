import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue, updateFontSize } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: '100%';
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};

  .slick-slider {
    width: 100%;

    .slick-dots {
      bottom: 10px;
      li {
        button:before {
          opacity: 0.5;
          color: ${colors.white} !important;
          font-size: 8px !important;
        }
      }

      .slick-active button:before {
        opacity: 1;
      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
  padding-bottom: 92px;
  margin-top: 30px;

  .fullDiv {
    height: 100%;
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const TextWrapper = styled.div`
  min-width: 200px;
  margin-left: 15px;
  align-self: start;
`;

export const Name = styled.div`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
`;

export const City = styled.div`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  margin-top: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  text-align: center;
  border-top: 1px solid ${colors.lightGrey};
`;

export const Vote = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ThumbsUp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: ${(props) => (props.thumbs === 2 ? '1px solid green' : 'none')};
  border-radius: 8px;
  width: 110px;
  text-align: center;

  img {
    cursor: pointer;
    max-height: 50px;
  }
  span {
    color: ${colors.green};
    margin-top: 5px;
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  }
`;

export const Neutral = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: ${(props) =>
    props.thumbs === 1 ? `1px solid ${colors.orange}` : 'none'};
  border-radius: 8px;
  width: 110px;
  text-align: center;
  align-items: center;

  img {
    cursor: pointer;
    max-height: 50px;
    max-width: 50px;
    background: white;
    border: 1px solid ${colors.orange};
    border-radius: 4px;
    padding: 12px;
  }
  span {
    color: ${colors.orange};
    margin-top: 5px;
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  }
`;

export const ThumbsDown = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: ${(props) => (props.thumbs === 0 ? '1px solid red' : 'none')};
  border-radius: 8px;
  width: 110px;
  text-align: center;

  img {
    cursor: pointer;
    max-height: 50px;
  }
  span {
    color: ${colors.red};
    margin-top: 5px;
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  width: 100%;
`;

export const Label = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const Question = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.span`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.grey};
  margin: 10px 0 15px 0;
`;

export const Options = styled.div`
  margin-top: 15px;
`;

export const Option = styled.div`
  border: 1px solid ${colors.primaryColor};
  border-radius: 4px;
  box-shadow: 0px 2px 2px ${colors.shadow};
  width: 100%;
  padding: 6px 12px;
  margin-bottom: 10px;
  display: flex;
`;

export const AnswerLabel = styled.label`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryColor};
  margin-left: 10px;
  width: 100%;
`;

export const Comment = styled.textarea`
  border: none;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border-radius: 3px;
`;

export const ButtonContainer = styled.div`
  background-color: ${colors.primaryColor};
  padding: 5px;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border-radius: 3px;
  margin-top: 20px;
  width: 100%;
`;

export const MediaLabel = styled.div`
  font-size: ${(props) => updateFontSize(12, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin-top: 10px;
  margin-bottom: 50px;
  color: ${colors.grey};
  span {
    color: ${colors.primaryColor};
  }
`;

export const Error = styled.div`
  font-size: ${(props) => updateFontSize(10, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  place-self: start;
  color: ${colors.orange};
  margin-left: 10px;
  margin-bottom: 10px;
`;
