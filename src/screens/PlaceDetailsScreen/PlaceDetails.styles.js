import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue, updateFontSize } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  z-index: 54;
  background-color: ${(props) =>
    updateValue(colors.transparent, props.backgroundColor)};

  .slick-slider {
    width: 100%;

    .slick-dots {
      bottom: 0;
      li {
        button:before {
          opacity: 0.5;
          color: white !important;
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

  .card {
    background: ${colors.white};
    width: 100%;
    border: transparent;
    box-shadow: 0px 2px 2px #0000000a;
    border-radius: 4px;
    opacity: 1;

    .header-row {
      padding: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-shadow: 0px 2px 2px #0000000a;
    }
    .comments {
      margin-left: auto;
      background: ${colors.orange};
      box-shadow: 0px 2px 2px #00000029;
      border: 1px solid #d3d2da;
      padding: 10px;
      border-radius: 25px;
      button {
        all: unset;
      }
    }
  }
  .fullDiv {
    height: 100%;
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PlaceInformation = styled.div`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin: 15px;
  display: flex;
  flex-direction: column;
  color: ${colors.primaryTextColor};
`;

export const Accessible = styled.div`
  margin-right: 15px;
  align-self: start;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.green};
  text-align: right;

  .up {
    color: ${colors.green};
  }
  .down {
    color: ${colors.red};
  }
`;

export const Evaluations = styled.div`
  width: 100%;
  .evaluations-header {
    font-size: ${(props) => updateFontSize(18, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      margin-left: 15px;
    }
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
