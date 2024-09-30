import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormLinkButton } from './FeedbackContent.styles';

const FeedbackContent = () => {
  const { t } = useTranslation();

  return (
    <>
      {t('thanks_for_feedback')}
      <FormLinkButton>{t('proceed_to_google_form')}</FormLinkButton>
    </>
  );
};

export default FeedbackContent;
