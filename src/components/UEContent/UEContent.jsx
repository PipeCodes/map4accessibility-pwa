import React from 'react';
import { useTranslation } from 'react-i18next';
import { InnerDiv, DialogCardImage } from './UEContent.styles';
import UELogo from '../../assets/images/ue_logo.jpg';

const UEContent = () => {
  const { t } = useTranslation();
  return (
    <>
      <InnerDiv>
        <DialogCardImage src={UELogo} alt="ue_logo" />
      </InnerDiv>
      {t('ue_content_text')}
    </>
  );
};

export default UEContent;
