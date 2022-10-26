import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { updateValue } from '../../helpers/utils';

export const FooterBarContainter = styled.div`
  padding: 10px 15px;
  bottom: 0;
  position: absolute;
  display flex;
  width: 100%;
  max-width: 820px;
  min-height: 72px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 4px #00000005;
  border-radius: 100% 100% 0 0;
  padding: 20px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) =>
    updateValue(colors.white, props.backgroundColor)};
`;

export const MenuButton = styled.button`
  background: ${colors.transparent};
  top: 30px;
  border: none;
`;
