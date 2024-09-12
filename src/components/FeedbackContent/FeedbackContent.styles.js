import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const FormLinkButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  background-color: ${colors.facebook_blue};
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.palleteWhite};
  padding: 0 16px;
  white-space: nowrap;
  margin-top: 10px;
`;
