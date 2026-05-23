import { useTranslation } from 'react-i18next';

export const useLocalizedPath = () => {
  const { i18n } = useTranslation();
  return (path: string) => {
    const normalized = path.startsWith('/') ? path : '/' + path;
    return normalized === '/' ? `/${i18n.language}` : `/${i18n.language}${normalized}`;
  };
};
