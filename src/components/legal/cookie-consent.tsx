"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { cookieCopy } from "@/components/i18n/consent-copy";
import { useLanguagePreference } from "@/components/i18n/use-language-preference";

const STORAGE_KEY = "agropark_cookie_consent";
const EVENT = "agropark:cookie-consent";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return true;
  }
}

export function CookieConsent() {
  const { language } = useLanguagePreference();
  const copy = cookieCopy[language];
  // accepted=true while server-rendering / before consent is read -> banner hidden, no hydration mismatch.
  const accepted = useSyncExternalStore(subscribe, getSnapshot, () => true);

  const accept = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  if (accepted) return null;

  return (
    <div
      role="dialog"
      aria-label={copy.aria}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-emerald-950/12 bg-[#fffdf7]/97 p-4 shadow-2xl shadow-emerald-950/15 backdrop-blur sm:flex sm:items-center sm:gap-4 sm:p-5"
    >
      <p className="text-sm leading-6 text-emerald-950/80">
        {copy.text}{" "}
        <Link href="/datenschutz" className="font-bold text-emerald-900 underline">
          {copy.more}
        </Link>
      </p>
      <button
        type="button"
        onClick={accept}
        className="mt-3 inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-emerald-900 px-6 text-sm font-black text-white transition hover:bg-emerald-800 sm:mt-0 sm:w-auto"
      >
        {copy.accept}
      </button>
    </div>
  );
}
