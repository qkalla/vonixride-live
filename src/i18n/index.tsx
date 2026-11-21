import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "./en";
import { ru } from "./ru";
import { hy } from "./hy";
import { fr } from "./fr";
import { ar } from "./ar";
import { es } from "./es";
import { LANGS, LANG_STORAGE_KEY, type Lang } from "./meta";

export { LANGS, type Lang };

function mergeStrings<T>(base: T, over: Partial<T>): T {
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    const bv = out[k];
    out[k] = v && typeof v === "object" && !Array.isArray(v) && bv && typeof bv === "object" && !Array.isArray(bv)
      ? mergeStrings(bv, v as Record<string, unknown>)
      : v ?? bv;
  }
  return out as T;
}

const enTyped = en as Record<string, unknown>;
export const STRINGS = {
  en,
  ru: mergeStrings(enTyped, ru as Record<string, unknown>) as typeof en,
  hy: mergeStrings(enTyped, hy as Record<string, unknown>) as typeof en,
  fr: mergeStrings(enTyped, fr as Record<string, unknown>) as typeof en,
  ar: mergeStrings(enTyped, ar as Record<string, unknown>) as typeof en,
  es: mergeStrings(enTyped, es as Record<string, unknown>) as typeof en,
} as const;
export type Strings = typeof en;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<LangCtx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && saved in STRINGS) return saved as Lang;
  } catch {}
  return "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {}
  };

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)!;
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: STRINGS[lang], dir: LANGS.find((l) => l.code === lang)!.dir }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang outside provider");
  return ctx;
}
