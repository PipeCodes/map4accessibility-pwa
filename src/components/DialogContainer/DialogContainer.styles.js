import styled from 'styled-components';

export const DialogContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border: none;
  padding: 24px;
  z-index: 100;
`;

export const BlurredScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  z-index: 100;
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
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;
  width: 80%;
  overflow-y: auto;
  max-height: 100vh;

  @media (min-width: 600px) {
    width: 70%;
    padding: 24px;
  }
  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }

  @media (min-width: 1280px) {
    width: 30%;
  }
`;

export const InnerDiv = styled.div`
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const DialogButton = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  background-color: transparent;
  z-index: 101;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 101;
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
`;

export const DialogImage = styled.img`
  height: 100%;
  z-index: 100;
`;

export const DialogCardImage = styled.img`
  justify-content: center;
  z-index: 101;
  height: 100%;
`;
