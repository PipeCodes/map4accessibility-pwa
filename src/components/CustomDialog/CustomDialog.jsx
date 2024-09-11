import React from 'react';
import CloseIconColored from '../../assets/icons/close-colored.svg';
import {
  BlurredScreen,
  DialogCard,
  CloseButton,
  DialogImage,
} from './CustomDialog.styles';

const CustomDialog = ({ closeDialog, dialogContent }) => (
  <BlurredScreen>
    <DialogCard>
      <CloseButton
        onClick={() => {
          closeDialog();
        }}
      >
        <DialogImage src={CloseIconColored} alt="Close" />
      </CloseButton>
      {dialogContent}
    </DialogCard>
  </BlurredScreen>
);

export default CustomDialog;
