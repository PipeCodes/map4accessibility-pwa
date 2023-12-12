import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue } from '../../helpers/utils';

export const FooterBarContainter = styled.div`
  padding: 10px 15px;
  bottom: 0;
  position: fixed;
  width: 100%;
  max-width: 820px;
  min-height: 72px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 4px ${colors.shadow};
  border-radius: 100% 100% 0 0;
  padding: 20px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 55;
  background-color: ${(props) =>
    updateValue(colors.white, props.backgroundColor)};
`;

export const MenuButton = styled.button`
  background: ${colors.transparent};
  top: 30px;
  border: none;
`;
