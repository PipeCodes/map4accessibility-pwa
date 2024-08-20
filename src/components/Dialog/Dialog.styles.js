import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const BlurredScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
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
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  padding: 20px;
  max-width: 280px;
  max-height: 100vh;
  overflow-y: auto;
  pointer-events: auto;
  position: relative;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
`;

export const DialogImage = styled.img`
  height: 100%;
`;

export const FormLinkButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  background-color: ${colors.facebook_blue};
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  padding: 0 16px;
  white-space: nowrap;
  margin-top: 10px;
`;
