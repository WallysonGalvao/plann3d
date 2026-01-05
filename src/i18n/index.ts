import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'

const resources = {
  pt: {
    translation: pt,
  },
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
}

const isBrowser = typeof window !== 'undefined'

const i18nConfig = {
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: isBrowser ? ['localStorage', 'navigator'] : [],
    caches: isBrowser ? ['localStorage'] : [],
  },
  react: {
    useSuspense: false,
  },
}

if (!i18n.isInitialized) {
  try {
    if (isBrowser) {
      i18n.use(LanguageDetector)
    }

    i18n
      .use(initReactI18next)
      .init(i18nConfig)
      .catch((err) => {
        console.error('[i18n] Failed to initialize:', err)
      })
  } catch (error) {
    console.error('[i18n] Error during initialization:', error)
    i18n
      .use(initReactI18next)
      .init(i18nConfig)
      .catch((err) => {
        console.error('[i18n] Fallback initialization failed:', err)
      })
  }
}

export default i18n
