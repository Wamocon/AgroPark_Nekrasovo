"use client";

import { useCallback, useSyncExternalStore } from "react";

export const languageOptions = [
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "tr", label: "TR", name: "Türkçe" },
] as const;

export type LanguageCode = (typeof languageOptions)[number]["code"];

const storageKey = "agropark_language";

function normalizeLanguage(value: unknown): LanguageCode {
  return languageOptions.some((option) => option.code === value) ? (value as LanguageCode) : "ru";
}

function getSnapshot(): LanguageCode {
  if (typeof window === "undefined") return "ru";
  return normalizeLanguage(window.localStorage.getItem(storageKey));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const onLanguageChange = () => callback();
  window.addEventListener("agropark:language-change", onLanguageChange);
  window.addEventListener("storage", onLanguageChange);

  return () => {
    window.removeEventListener("agropark:language-change", onLanguageChange);
    window.removeEventListener("storage", onLanguageChange);
  };
}

export function useLanguagePreference() {
  const language = useSyncExternalStore<LanguageCode>(subscribe, getSnapshot, () => "ru");

  const setLanguage = useCallback((next: LanguageCode) => {
    window.localStorage.setItem(storageKey, next);
    window.dispatchEvent(new CustomEvent("agropark:language-change", { detail: { language: next } }));
  }, []);

  return { language, setLanguage };
}
