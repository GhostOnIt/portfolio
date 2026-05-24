import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isSupportedLang } from '../i18n/config';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const LangLayout = () => {
  const location = useLocation();
  const lang = location.pathname.split('/')[1];
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isSupportedLang(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-page text-neutral-200 font-sans">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
