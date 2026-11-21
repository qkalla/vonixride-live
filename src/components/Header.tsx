import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import { LangSwitcher } from "./LangSwitcher";
import type { Route } from "../router";


export function Brand() {
  return (
    <a className="brand" href="#/">
      <img className="brand-mark" src="/logo.png" alt="Vonix" width={34} height={34} />
      <span className="brand-name">Vonix<em>ride</em></span>
    </a>
  );
}

export function Header({ route, navigate }: { route: Route; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [route]);

  const links: { label: string; to: Route }[] = [
    { label: t.nav.services, to: "/services" },
    { label: t.nav.business, to: "/business" },
    { label: t.nav.how, to: "/how-it-works" },
    { label: t.nav.cities, to: "/cities" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.contact, to: "/contact" },
  ];

  const go = (to: Route) => {
    if (to.includes("#")) {
      const [p, anchor] = to.split("#");
      navigate((p || "/") as Route);
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 60);
    } else {
      navigate(to);
    }
  };

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <Brand />
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={`#${l.to}`}
                className={route === l.to ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.to);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <LangSwitcher />
          <a className="nav-cta ghost" href="#/business" onClick={(e) => { e.preventDefault(); go("/business"); }}>
            {t.nav.partner}
          </a>
          <a className="nav-cta" href="#/download" onClick={(e) => { e.preventDefault(); go("/download"); }}>
            {t.nav.getApp}
          </a>
          <button className="burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <a key={l.to} href={`#${l.to}`} onClick={(e) => { e.preventDefault(); go(l.to); }}>
              {l.label}
            </a>
          ))}
          <a href="#/business" onClick={(e) => { e.preventDefault(); go("/business"); }}>{t.nav.partner}</a>
          <div className="mobile-lang">
            <LangSwitcher onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
