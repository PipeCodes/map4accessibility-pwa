import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const BlurredScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: ${colors.dark_shadow};
  z-index: 101;
  pointer-events: auto;
`;

export const DialogCard = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 ${colors.shadow}, 0 4px 6px 0 ${colors.shadow};
  text-align: center;
  padding: 20px;
  max-width: 280px;
  max-height: 100vh;
  overflow-y: auto;
  pointer-events: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  background-color: ${colors.transparent};
  border: none;
  cursor: pointer;
  margin-left: auto;
`;

export const DialogImage = styled.img`
  height: 100%;
`;
