import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue, updateFontSize } from '../../helpers/utils';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${(props) => (props.editActive === true ? '100%' : '100vh')};

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
