import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enContact from './locales/en/contact.json';
import enProjects from './locales/en/projects.json';
import enSkills from './locales/en/skills.json';
import enBlog from './locales/en/blog.json';
import enCaseStudies from './locales/en/caseStudies.json';
import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frAbout from './locales/fr/about.json';
import frContact from './locales/fr/contact.json';
import frProjects from './locales/fr/projects.json';
import frSkills from './locales/fr/skills.json';
import frBlog from './locales/fr/blog.json';
import frCaseStudies from './locales/fr/caseStudies.json';
import jaCommon from './locales/ja/common.json';
import jaHome from './locales/ja/home.json';
import jaAbout from './locales/ja/about.json';
import jaContact from './locales/ja/contact.json';
import jaProjects from './locales/ja/projects.json';
import jaSkills from './locales/ja/skills.json';
import jaBlog from './locales/ja/blog.json';
import jaCaseStudies from './locales/ja/caseStudies.json';

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
    ns: ['common', 'home', 'about', 'contact', 'projects', 'skills', 'blog', 'caseStudies'],
    defaultNS: 'common',
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        about: enAbout,
        contact: enContact,
        projects: enProjects,
        skills: enSkills,
        blog: enBlog,
        caseStudies: enCaseStudies,
      },
      fr: {
        common: frCommon,
        home: frHome,
        about: frAbout,
        contact: frContact,
        projects: frProjects,
        skills: frSkills,
        blog: frBlog,
        caseStudies: frCaseStudies,
      },
      ja: {
        common: jaCommon,
        home: jaHome,
        about: jaAbout,
        contact: jaContact,
        projects: jaProjects,
        skills: jaSkills,
        blog: jaBlog,
        caseStudies: jaCaseStudies,
      },
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
