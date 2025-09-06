import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../utils/en.json";
import bn from "../utils/bn.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    bn: { translation: bn },
  },
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
