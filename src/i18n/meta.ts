export type Lang = "en" | "ru" | "hy" | "fr" | "ar" | "es";

export const LANGS: { code: Lang; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "EN", native: "English", dir: "ltr" },
  { code: "ru", label: "RU", native: "Русский", dir: "ltr" },
  { code: "hy", label: "HY", native: "Հայերեն", dir: "ltr" },
  { code: "fr", label: "FR", native: "Français", dir: "ltr" },
  { code: "ar", label: "AR", native: "العربية", dir: "rtl" },
  { code: "es", label: "ES", native: "Español", dir: "ltr" },
];

export const LANG_STORAGE_KEY = "vonixride.lang";
