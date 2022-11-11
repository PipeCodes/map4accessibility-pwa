import styled, { css } from 'styled-components';
import { updateFontSize, updateValue } from '../../helpers/utils';
import { colors } from '../../constants/colors';

export const RouteContainer = styled.div`
  background-color: ${colors.background};
  border-radius: 4px;
  padding: 10px;
  min-width: 236px;
  min-height: 160px;
  margin: 20px 0;
`;
export const Name = styled.div`
  color: ${colors.primaryTextColor};
  font-size: ${(props) => updateFontSize(18, props.fontSize)};
`;
export const Distance = styled.div`
  color: ${colors.grey};
  padding: 8px 0;
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
`;
export const Ratings = styled.div`
  font-size: ${(props) => updateFontSize(16, props.fontSize)};
  display: flex;
  gap: 12px;
`;

export const Rating = styled.div`
  display: flex;
`;

export const Image = styled.img`
  height: 35px;
  border-radius: 50%;
  backgroundcolor: ${colors.grey};
`;

export const Icon = styled.div`
  margin-right: 5px;
  align-self: flex-start;
`;

export const Number = styled.span`
  font-size: ${(props) => updateFontSize(14, props.fontSize)};
  color: ${(props) => props.color};
`;

export const CTA = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;
export const GoToMaps = styled.button`
  background-color: ${colors.primaryColor};
  padding: 0 10px;
  border: none;
  border-radius: 16px;
  color: white;
  opacity: 1;
  display: flex;
  align-items: center;
`;
export const Steps = styled.button`
  background-color: white;
  border: 1px solid ${colors.lightGrey};
  border-radius: 16px;
  opacity: 1;
  display: flex;
  align-items: center;
`;
