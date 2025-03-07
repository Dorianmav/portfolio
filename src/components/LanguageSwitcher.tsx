import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Composant qui permet de changer la langue de l'application
 * entre français et anglais
 */
const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-2 py-1 rounded-md text-sm ${
          i18n.language === 'fr' 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => changeLanguage('fr')}
      >
        {t('language.french')}
      </button>
      <button
        className={`px-2 py-1 rounded-md text-sm ${
          i18n.language === 'en' 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => changeLanguage('en')}
      >
        {t('language.english')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
