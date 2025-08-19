import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Recursos de tradução
import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import esES from './locales/es-ES.json';

const resources = {
  'pt-BR': {
    translation: ptBR,
  },
  'en-US': {
    translation: enUS,
  },
  'es-ES': {
    translation: esES,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React já escapa valores
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;
