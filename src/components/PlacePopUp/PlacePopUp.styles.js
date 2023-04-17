import styled from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const Container = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 820px;
`;

export const PopUp = styled.div`
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 0;
  position: relative;
  z-index: 59;
  border-radius: 4px;
  top: 100px;
  width: 95%;
  max-width: 730px;
  margin-left: auto;
  margin-right: auto;
  button {
    img {
      rotate: ;
    }
  }
`;

export const Close = styled.div`
  height: 30px;
  width: 30px;
  background-color: white;
  display: flex;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  margin-top: 3px;
  margin-left: auto;
  z-index: 58;
  img {
    height: 13px;
    width: 13px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Content = styled.div`
  margin-top: 240px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
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

export const Accessible = styled.div`
  align-self: start;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};

  .accessible {
    color: ${colors.green};
  }
  .not-accessible {
    color: ${colors.red};
  }
  .neutral {
    color: ${colors.orange};
  }

  text-align: right;
  min-width: 100px;

  .up {
    color: ${colors.green};
  }
  .down {
    color: ${colors.red};
  }
  .neutral {
    color: ${colors.orange};
    img {
      width: 12px;
    }
  }
`;

export const TextWrapper = styled.div`
  min-width: 200px;
  align-self: start;
`;

export const PlaceInformation = styled.div`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  margin: 15px;
  display: flex;
  flex-direction: column;
  color: ${colors.primaryTextColor};
`;

export const Image = styled.img`
  width: 100%;
  max-height: 240px;
  position: absolute;
  object-fit: cover;
`;

export const DarkOverlayContainer = styled.div`
  position: fixed;
  z-index: 58;
  background: rgba(0, 0, 0, 0.8);
  max-width: 820px;
  margin: 0px auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;
