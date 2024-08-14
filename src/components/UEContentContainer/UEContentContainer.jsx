import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIconColored from '../../assets/icons/close-colored.svg';
import { DialogImage } from '../UEButton/UEButton.styles';
import {
  BlurredScreen,
  InnerDiv,
  DialogCard,
  CloseButton,
  DialogCardImage,
} from './UEContentContainer.styles';

const ModalContent = ({ showUEModal, setShowUEModal, UELogo }) => {
  const { t } = useTranslation();
  return (
    <BlurredScreen>
      <DialogCard>
        <CloseButton onClick={() => setShowUEModal(!showUEModal)}>
          <DialogImage src={CloseIconColored} alt="Close" />
        </CloseButton>
        <InnerDiv>
          <DialogCardImage src={UELogo} alt="ue_logo" />
        </InnerDiv>
        {t('ue_content_text')}
      </DialogCard>
    </BlurredScreen>
  );
};

export default ModalContent;
