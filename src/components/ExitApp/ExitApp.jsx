import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonContainer } from './ExitApp.styles';
import CloseIcon from '../../assets/icons/close.svg';

const ExitApp = () => {
  const { t } = useTranslation();

  const close = () => {
    window.close();
  };

  return (
    <ButtonContainer onClick={() => close()}>
      <img src={CloseIcon} alt="back" />
      <div>{t('close')}</div>
    </ButtonContainer>
  );
};

export default ExitApp;
