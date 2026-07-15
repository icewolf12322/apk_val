import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationFR from './locales/fr/common.json'
import translationRestoFR from './resto_common.json'

const resources = {
  fr: {
    translation: translationFR,
    restaurant: translationRestoFR,
  },
  en: {
    // translation: translationEN,
  },
}

i18n
  .use(LanguageDetector) // Détecte la langue de l'utilisateur
  .use(initReactI18next) // Passe l'instance i18n à react-i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la langue détectée n'est pas disponible
    ns: ['translation', 'restaurant'],
    interpolation: { escapeValue: false }, // React échappe déjà les valeurs
  })

export default i18n