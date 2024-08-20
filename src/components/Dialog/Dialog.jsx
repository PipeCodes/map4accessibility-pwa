import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIconColored from '../../assets/icons/close-colored.svg';
import {
  BlurredScreen,
  DialogCard,
  CloseButton,
  DialogImage,
  FormLinkButton,
} from './Dialog.styles';

const Dialog = ({ setIsDialogOpen }) => {
  const { t } = useTranslation();

  return (
    <BlurredScreen>
      <DialogCard>
        <CloseButton onClick={() => setIsDialogOpen(false)}>
          <DialogImage src={CloseIconColored} alt="Close" />
        </CloseButton>
        {t('thanks_for_feedback')}
        <FormLinkButton>{t('proceed_to_google_form')}</FormLinkButton>
      </DialogCard>
    </BlurredScreen>
  );
};

export default Dialog;
