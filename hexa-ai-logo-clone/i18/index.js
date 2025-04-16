import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './languages/en';

const resources = {
    en: {
        translation: en,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Localization.getLocales().includes('tr') ? 'en' : 'en', //after adding tr.js this part will be changed.
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;