"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { languageOptions, useLanguagePreference } from "@/components/i18n/use-language-preference";

export function LanguageSwitcher({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { language, setLanguage } = useLanguagePreference();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-emerald-950/10 bg-white/72 shadow-sm backdrop-blur",
        compact ? "min-h-11 gap-0 p-0.5" : "min-h-11 gap-1 p-1",
        className,
      )}
      aria-label="Language selector"
    >
      {!compact ? <Languages className="ml-2 size-4 text-emerald-950/52" aria-hidden="true" /> : null}
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          aria-label={option.name}
          aria-pressed={language === option.code}
          onClick={() => setLanguage(option.code)}
          className={cn(
            "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-[11px] font-black uppercase tracking-[0.08em] transition",
            compact && "px-1 text-[10px] tracking-normal",
            language === option.code
              ? "bg-emerald-900 text-white shadow-sm"
              : "text-emerald-950/58 hover:bg-emerald-950/6 hover:text-emerald-950",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
