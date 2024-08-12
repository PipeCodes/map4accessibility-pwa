import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// import ModalContent from './ModalContent';
import CloseIconColored from '../../assets/icons/close-colored.svg';
import UELogo from '../../assets/images/ue_logo.jpg';
import {
  DialogButton,
  DialogContainer,
  DialogImage,
  BlurredScreen,
  DialogCard,
  CloseButton,
  InnerDiv,
  DialogCardImage,
} from './DialogContainer.styles';

const Dialog = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  return (
    <DialogContainer>
      <DialogButton onClick={() => setShowModal(!showModal)}>
        <DialogImage src={UELogo} alt="ue_logo" />
      </DialogButton>
      {showModal &&
        createPortal(
          <BlurredScreen>
            <DialogCard>
              <CloseButton onClick={() => setShowModal(!showModal)}>
                <DialogImage src={CloseIconColored} alt="Close" />
              </CloseButton>
              <InnerDiv>
                <DialogCardImage src={UELogo} alt="ue_logo" />
              </InnerDiv>
              <p>
                This project has received funding from the European Union&apos;s
                Erasmus+ programme under grant agreement No.
                2021-1-IT02-KA220-HED-00003032. Views and opinions expressed are
                however those of the author(s) only and do not necessarily
                reflect those of the European Union or the European Education
                and Culture Executive Agency (EACEA). Neither the European Union
                nor EACEA can be held responsible for them.
              </p>
            </DialogCard>
          </BlurredScreen>,
          document.body,
        )}
    </DialogContainer>
  );
};

export default Dialog;
