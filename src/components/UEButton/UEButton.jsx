import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import UELogo from '../../assets/images/ue_logo.jpg';
import { ContainerUEButton, DialogImage } from './UEButton.styles';
import UEContent from '../UEContent/UEContent';
import Dialog from '../CustomDialog/CustomDialog';

const UEButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showDialog]);

  return (
    <ContainerUEButton onClick={() => setShowDialog(!showDialog)}>
      <DialogImage src={UELogo} alt="ue_logo" />
      {showDialog &&
        createPortal(
          <Dialog closeDialog={setShowDialog} dialogContent={<UEContent />} />,
          document.body,
        )}
    </ContainerUEButton>
  );
};

export default UEButton;
