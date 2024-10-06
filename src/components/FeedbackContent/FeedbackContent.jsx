import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormLinkButton } from './FeedbackContent.styles';

const FeedbackContent = () => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: '15px' }}>
      {t('thanks_for_feedback')}
      <FormLinkButton>{t('proceed_to_google_form')}</FormLinkButton>
    </div>
  );
};

export default FeedbackContent;
