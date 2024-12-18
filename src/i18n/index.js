import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enGBTranslation from './en/translation.json';
import ptPTTranslation from './ptPT/translation.json';
import deDETranslation from './deDE/translation.json';
import bgBGTranslation from './bgBG/translation.json';
import itTranslation from './it/translation.json';

const resources = {
  'pt-PT': {
    translation: ptPTTranslation,
  },
  'de-DE': {
    translation: deDETranslation,
  },
  'bg-BG': {
    translation: bgBGTranslation,
  },
  it: {
    translation: itTranslation,
  },
  'en-GB': {
    translation: enGBTranslation,
  },
};

// For more info about this configuration check https://react.i18next.com/latest/using-with-hooks
i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next .
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en-GB',
    detection: {
      order: ['navigator'],
      caches: [],
    },
    debug: false,
  });

export default i18n;
