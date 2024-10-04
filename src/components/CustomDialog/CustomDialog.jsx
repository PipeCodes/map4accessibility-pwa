import React from 'react';

import CloseIconColored from '../../assets/icons/close-colored.svg';
import {
  BlurredScreen,
  DialogCard,
  CloseButton,
  DialogImage,
  Title,
} from './CustomDialog.styles';

const CustomDialog = ({ closeDialog, title, dialogContent }) => (
  <BlurredScreen>
    <DialogCard>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          marginBottom: '10px',
        }}
      >
        <Title>{title}</Title>
        <CloseButton
          onClick={() => {
            closeDialog();
          }}
        >
          <DialogImage src={CloseIconColored} alt="Close" />
        </CloseButton>
      </div>
      {dialogContent}
    </DialogCard>
  </BlurredScreen>
);

export default CustomDialog;
