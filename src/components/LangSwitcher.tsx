import { useEffect, useRef, useState } from "react";
import { LANGS, useLang, type Lang } from "../i18n";

export function LangSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="lang-switch" ref={ref}>
      <button
        className="lang-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{LANGS.find((l) => l.code === lang)!.label}</span>
        <svg className={`caret${open ? " up" : ""}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                className={l.code === lang ? "active" : ""}
                onClick={() => {
                  setLang(l.code as Lang);
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                <span className="lang-native">{l.native}</span>
                <span className="lang-code">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
