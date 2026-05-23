import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frAbout from './locales/fr/about.json';
import jaCommon from './locales/ja/common.json';
import jaHome from './locales/ja/home.json';
import jaAbout from './locales/ja/about.json';

export const SUPPORTED_LANGS = ['en', 'fr', 'ja'] as const;
export type Lang = typeof SUPPORTED_LANGS[number];

export const isSupportedLang = (l: string | undefined): l is Lang =>
  !!l && (SUPPORTED_LANGS as readonly string[]).includes(l);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    ns: ['common', 'home', 'about'],
    defaultNS: 'common',
    resources: {
      en: { common: enCommon, home: enHome, about: enAbout },
      fr: { common: frCommon, home: frHome, about: frAbout },
      ja: { common: jaCommon, home: jaHome, about: jaAbout },
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
