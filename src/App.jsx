import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PWAPrompt from 'react-ios-pwa-prompt';
import GlobalStyles from './globalStyles';
import GlobalRoutes from './routes/routes';
import DarkOverlay from './components/DarkOverlay/DarkOverlay';

const App = () => {
  const { t } = useTranslation();
  const font = useSelector((state) => state.accessibility.font);
  const underline = useSelector((state) => state.accessibility.underline);
  const highlight = useSelector((state) => state.accessibility.highlight);
  const textColor = useSelector((state) => state.accessibility.textColor);
  const lightsOffMode = useSelector(
    (state) => state.accessibility.lightsOffMode,
  );

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
      <GlobalStyles
        font={font}
        underline={underline}
        highlight={highlight}
        textColor={textColor}
      />
      <DarkOverlay lightsOffMode={lightsOffMode} />
      <GlobalRoutes />
    </>
  );
};

export default App;
