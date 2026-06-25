import type { LanguageCode } from "@/components/i18n/use-language-preference";

// Согласие на обработку персональных данных (152-ФЗ "О персональных данных").
// Russisches Datenschutzrecht – NICHT DSGVO. Pflicht vor dem Absenden personenbezogener Daten.
type ConsentStrings = {
  before: string; // Text vor dem Link
  link: string; // verlinkte Phrase -> /datenschutz#pdn
  after: string; // Text nach dem Link
  error: string; // a11y / Hinweis, wenn nicht angehakt
};

export const consentCopy: Record<LanguageCode, ConsentStrings> = {
  ru: {
    before: "Я даю ",
    link: "согласие на обработку персональных данных",
    after: " в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».",
    error: "Подтвердите согласие на обработку персональных данных.",
  },
  en: {
    before: "I give my ",
    link: "consent to the processing of my personal data",
    after: " in accordance with Russian Federal Law No. 152-FZ “On Personal Data”.",
    error: "Please confirm your consent to the processing of personal data.",
  },
  de: {
    before: "Ich erteile meine ",
    link: "Einwilligung in die Verarbeitung meiner personenbezogenen Daten",
    after: " gemäß dem russischen Föderalen Gesetz Nr. 152-FZ „Über personenbezogene Daten“.",
    error: "Bitte bestätigen Sie die Einwilligung in die Verarbeitung personenbezogener Daten.",
  },
  tr: {
    before: "Kişisel verilerimin ",
    link: "işlenmesine onay veriyorum",
    after: " (152 sayılı «Kişisel Veriler Hakkında» Rusya Federal Kanunu uyarınca).",
    error: "Lütfen kişisel verilerin işlenmesine ilişkin onayınızı verin.",
  },
};

// Cookie-Banner (152-ФЗ Cookie-Einwilligung) – funktionierender "Принять"-Button.
type CookieStrings = { text: string; accept: string; more: string; aria: string };

export const cookieCopy: Record<LanguageCode, CookieStrings> = {
  ru: {
    text: "Мы используем файлы cookie для корректной работы сайта. Продолжая, вы соглашаетесь с обработкой данных согласно 152-ФЗ.",
    accept: "Принять",
    more: "Подробнее",
    aria: "Уведомление об использовании cookie",
  },
  en: {
    text: "We use cookies to make the site work properly. By continuing you consent to data processing under Russian Federal Law No. 152-FZ.",
    accept: "Accept",
    more: "Details",
    aria: "Cookie notice",
  },
  de: {
    text: "Wir verwenden Cookies für die korrekte Funktion der Website. Mit der Nutzung stimmen Sie der Datenverarbeitung gemäß 152-FZ zu.",
    accept: "Akzeptieren",
    more: "Mehr",
    aria: "Cookie-Hinweis",
  },
  tr: {
    text: "Sitenin düzgün çalışması için çerez kullanıyoruz. Devam ederek 152 sayılı Federal Kanun uyarınca veri işlenmesini kabul edersiniz.",
    accept: "Kabul et",
    more: "Ayrıntılar",
    aria: "Çerez bildirimi",
  },
};
