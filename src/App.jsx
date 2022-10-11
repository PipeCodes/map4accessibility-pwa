import React from 'react';
import { useTranslation } from 'react-i18next';
import PWAPrompt from 'react-ios-pwa-prompt';
import GlobalStyles from './globalStyles';
import GlobalRoutes from './routes/routes';

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <PWAPrompt
        copyBody={t('pwa_prompt_message')}
        copyTitle={t('add_to_home_screen')}
        copyShareButtonLabel={t('press_share_button')}
        copyAddHomeButtonLabel={t('press_add_to_home_screen')}
        copyClosePrompt={t('cancel')}
        permanentlyHideOnDismiss={false}
        timesToShow={100}
      />
      <GlobalStyles />
      <GlobalRoutes />
    </>
  );
};

export default App;
