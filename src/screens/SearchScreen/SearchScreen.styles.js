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

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.span`
  font-size: ${(props) => updateFontSize(22, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro-Bold', props.font)};
  color: ${colors.primaryTextColor};
  margin-bottom: 10px;
  align-self: start;
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

export const InputLabel = styled.span`
  font-size: ${(props) => updateFontSize(20, props.fontSize)};
  font-family: ${(props) => updateValue('EasyReadingPro', props.font)};
  color: ${colors.primaryTextColor};
  place-self: start;
  margin-top: 10px;
`;

export const SearchFilters = styled.div`
  padding: 20px 15px;
  background: ${colors.white};
  width: 100%;
  margin-top: 30px;
`;

export const DisabilityFilters = styled.div`
  padding: 20px 15px;
  background: ${colors.white};
  width: 100%;
  border-top: 1px solid ${colors.background};
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Filter = styled.div`
  flex-grow: 1;
  flex-basis: 25%;
  min-width: fit-content;
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
    display: flex;
    align-items: center;
    width: -webkit-fill-available;
    margin-right: 8px;
    padding: 0 12px;

    &.active {
      border: 1px solid ${colors.primaryTextColor};
      background: ${colors.background};
    }

    &.tall-btn {
      height: 55px;
    }

    img {
      padding-right: 6px;
    }
  }
`;

export const FilterToggleHeader = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const FilterToggleArrow = styled.div`
  img {
    transform: ${(props) =>
      props.collapsed ? 'rotate(270deg)' : 'rotate(90deg)'};
    float: right;
    margin-top: -23px;
    width: 27px;
  }
`;

export const FilterToggleContent = styled.div`
  display: ${(props) => (props.collapsed ? 'none' : 'inline-block')};
`;
