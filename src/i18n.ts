import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// Les ressources de traduction
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  // Détecte la langue du navigateur de l'utilisateur
  .use(LanguageDetector)
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  // Initialise i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la langue détectée n'est pas disponible
    debug: false, // Désactive les logs de débogage en production

    interpolation: {
      escapeValue: false, // Non nécessaire pour React car il échappe par défaut
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
