import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import en from "./en";
import ko from "./ko";
import ru from "./ru";

export interface iLangArray {
  lang: string;
  counrty: string;
  title: string;
}

// 언어 추가시 변경
// lang은 언어코드 (언어별 Json 생성)
// counrty는 국가코드 (국기 표시용)
// title은 언어변경 콤보에 표시되는 단어
export const langSupportedList: Array<iLangArray> = [
  { lang: "ko", counrty: "kr", title: "korean" },
  { lang: "en", counrty: "us", title: "english" },
  { lang: "ru", counrty: "ru", title: "russian" }
];

export const localeKey = "page";
export const defaultLang = langSupportedList[0];

i18n.use(initReactI18next).init({
  resources: {
    en,
    ko,
    ru
  },
  lng: defaultLang?.lang,
  fallbackLng: defaultLang?.lang,
  ns: [localeKey],
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

export const useLocale = (key: string) => {
  const { t } = useTranslation([localeKey]);
  const translatedText = t(`${localeKey}:${key}`);
  return translatedText !== `${localeKey}:${key}` ? translatedText : key;
};
