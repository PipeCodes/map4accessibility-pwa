import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateFontSize, updateValue } from '../../helpers/utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: ${(props) =>
    updateValue(colors.whiteSmoke, props.backgroundColor)};
`;

export const Title = styled.h5`
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 13px;
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 100%;
  background-color: ${colors.grey};
`;

export const Img = styled.img`
  max-height: 200px;
  width: 100%;
`;

export const Media = styled.div`
  max-width: 400px;
  object-fit: cover;

  &.audio {
    max-width: 100%;
    width: 100%;
  }

  .image {
    height: auto;
    left: 0;
    margin-right: auto;
    padding-top: 2px;
  }

  .audio {
    height: 60px;
    width: 100%;
  }
  .video {
    max-width: 100%;
    width: 400px;
    padding-top: 2px;
  }
`;

export const Box = styled.div`
  &.image {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &.audio {
    display: flex;
    flex-direction: column;
  }
  &.video {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Name = styled.div`
  margin-left: 10px;
  margin-right: auto;
  color: ${colors.primaryTextColor};
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const RemoveIcon = styled.img`
  margin-left: 10px;
  max-width: 18px;
  margin-top: -4px;
`;

export const Status = styled.div`
  margin-right: 15px;
`;

export const Accessible = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 15px;
  align-items: center;
  box-shadow: 0px 2px 2px ${colors.shadow};
  background-color: ${(props) =>
    updateValue(colors.mystic, props.backgroundColor)};
`;

export const Icon = styled.img`
  width: 33px;
  height: 33px;

  &.neutral-icon {
    background-color: ${colors.white};
    padding: 6px;
    border-radius: 3px;
    border: 1px solid ${colors.orange};
  }
`;

export const Label = styled.div`
  margin-left: 10px;
  color: ${colors.gray};
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const Body = styled.div`
  padding: 10px 15px;
  color: ${colors.grey};
  flex: 1;
  min-width: 150px;
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
`;

export const ShowAll = styled.button`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
  border: none;
  background: transparent;
  padding-bottom: 15px;
`;

export const ShowMore = styled.button`
  font-size: ${(props) => updateFontSize(12, props.fontSize)};
  font-family: ${(props) => updateValue('NotoSans-Regular', props.font)};
  border: none;
  background: transparent;
  padding-bottom: 15px;
  margin-left: 10px;
  color: ${colors.primaryColor};
`;
