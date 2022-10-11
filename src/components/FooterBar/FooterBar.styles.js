import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const FooterBarContainter = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  padding: 0px 34px;
  width: 100%;
  height: 50px;
  z-index: 9999;
`;

export const FooterButton = styled.button`
  background-color: transparent;
  border: 0;
  position: relative;
`;

export const Overlay = styled.div`
  background-color: ${(props) => props.color ? props.color : colors.bgBlue2 };
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  mix-blend-mode: overlay;
  filter: saturate(250%);
`;

export const Saturation = styled.div`
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  mix-blend-mode: overlay;
  filter: saturate(250%);
`;

export const Icon = styled.img`
  object-fit: scale-down;
`;
