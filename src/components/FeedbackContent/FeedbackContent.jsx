import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormLinkButton } from './FeedbackContent.styles';

const FeedbackContent = () => {
  const { t } = useTranslation();

  const openGoogleForm = () => {
    window.open('https://forms.gle/wuF32Qpmcq7CJfg4A', '_blank');
  };

  return (
    <div style={{ marginTop: '15px' }}>
      {t('thanks_for_feedback')}
      <FormLinkButton onClick={openGoogleForm}>
        {t('proceed_to_google_form')}
      </FormLinkButton>
    </div>
  );
};

export default FeedbackContent;
