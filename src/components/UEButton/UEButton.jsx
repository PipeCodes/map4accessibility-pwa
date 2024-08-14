import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import UELogo from '../../assets/images/ue_logo.jpg';
import { ContainerUEButton, DialogImage } from './UEButton.styles';
import UEContentContainer from '../UEContentContainer/UEContentContainer';

const UEButton = () => {
  const [showUEModal, setShowUEModal] = useState(false);

  useEffect(() => {
    if (showUEModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showUEModal]);

  return (
    <ContainerUEButton onClick={() => setShowUEModal(!showUEModal)}>
      <DialogImage src={UELogo} alt="ue_logo" />
      {showUEModal &&
        createPortal(
          <UEContentContainer
            showUEModal={showUEModal}
            setShowUEModal={setShowUEModal}
            UELogo={UELogo}
          />,
          document.body,
        )}
    </ContainerUEButton>
  );
};

export default UEButton;
