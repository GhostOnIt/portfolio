import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGS, type Lang } from '../i18n/config';

export const LanguageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('common');

  const switchTo = (lang: Lang) => {
    const restOfPath = location.pathname.replace(/^\/(en|fr|ja)/, '');
    navigate(`/${lang}${restOfPath}`);
  };

  return (
    <div className="flex items-center space-x-1 text-xs font-mono">
      {SUPPORTED_LANGS.map((lang, i) => (
        <span key={lang} className="flex items-center">
          <button
            onClick={() => switchTo(lang)}
            className={`px-2 py-1 transition-colors ${
              i18n.language === lang
                ? 'text-primary-500 font-bold'
                : 'text-neutral-400 hover:text-primary-500'
            }`}
            aria-label={`Switch to ${lang}`}
          >
            {t(`languages.${lang}`)}
          </button>
          {i < SUPPORTED_LANGS.length - 1 && <span className="text-neutral-600">|</span>}
        </span>
      ))}
    </div>
  );
};
