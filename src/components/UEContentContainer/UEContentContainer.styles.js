import styled from 'styled-components';

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  padding: 16px;
  max-width: 800px;
  max-height: 100vh;
  overflow-y: auto;
  pointer-events: auto;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
`;

export const DialogImage = styled.img`
  height: 100%;
`;

export const DialogCardImage = styled.img`
  justify-content: center;
  height: 100%;
`;

export const InnerDiv = styled.div`
  height: 100px;
  width: 100%;
`;
