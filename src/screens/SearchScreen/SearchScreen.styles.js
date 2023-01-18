import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

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

export const SearchHeader = styled.div`
  margin-top: 30px;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 54;
  width: 100%;
  padding-bottom: 30px;
  margin-top: 30px;
`;

export const Text = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro-Bold', props.font)};
  color: ${colors.primaryTextColor};
  margin-bottom: 10px;
  padding: 20px 0;
  align-self: start;
  span {
    font-size: ${(props) => updateFontSize(14, props.fontSize)};
    color: ${colors.primaryColor};
    margin-left: 5px;
  }
`;

export const LeftButton = styled.button`
  color: ${colors.white};
  background-color: ${colors.transparent};
  border: 0;
  margin: 0;
  top: 30px;
  left: 15px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    width: auto;
  }
`;

export const InputLabel = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  place-self: start;
  margin-top: 10px;
`;

export const AccessibilityButton = styled.button`
  border-radius: 50%;
  background: ${colors.primaryColor} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 2px ${colors.shadow};
  border: 1px solid ${colors.primaryColor};
  color: ${colors.white};
  margin: 0;
  position: absolute;
  top: 30px;
  right: 15px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchFilters = styled.div`
  padding: 20px 15px;
  background: ${colors.white};
  width: 100%;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  .filter {
    flex-grow: 1;
    flex-basis: 50%;
    margin-top: 10px;
    font-size: ${(props) => updateFontSize(16, props.fontSize)};
    font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
    button {
      color: ${colors.primaryTextColor};
      all: unset;
      border: 1px solid #d3d2da;
      border-radius: 18px;
      height: 35px;
      width: 150px;
      img {
        padding-left: 12px;
        padding-right: 6px;
      }
    }
  }
`;
