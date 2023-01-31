import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import { enUSLanguage } from 'localization/language/en-us';
import { taINLanguage } from 'localization/language/ta-IN';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enUSLanguage,
    },
    'ta-IN': {
      translation: taINLanguage,
    },
  },
  debug: Boolean(process.env.IS_DEV),
  lng: 'ta-IN', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
