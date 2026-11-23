import { useEffect, useRef, useState } from "react";
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

type DropKey = "services" | "earn" | "company";

export function Header({ route, navigate }: { route: Route; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<DropKey | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setOpenDrop(null); }, [route]);

  useEffect(() => {
    if (!openDrop) return;
    const onDown = (ev: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(ev.target as Node)) setOpenDrop(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openDrop]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const go = (to: Route) => {
    navigate(to);
    window.scrollTo({ top: 0 });
  };
  const toggleDrop = (k: DropKey) => setOpenDrop((o) => (o === k ? null : k));

  const svcItems: { label: string; desc: string; to: Route }[] = [
    { label: t.svc.ride.title, desc: t.svc.ride.text, to: "/services/rides" },
    { label: t.svc.moped.title, desc: t.svc.moped.text, to: "/services/courier" },
    { label: t.svc.cargo.title, desc: t.svc.cargo.text, to: "/services/cargo" },
    { label: t.svc.food.title, desc: t.svc.food.text, to: "/services/orders" },
  ];
  const earnItems: { label: string; desc: string; to: Route }[] = [
    { label: t.businessPortal.earnDriver, desc: t.svc.ride.text, to: "/earn/drivers" },
    { label: t.businessPortal.earnCourier, desc: t.svc.moped.text, to: "/earn/couriers" },
    { label: t.businessPortal.earnMerchant, desc: t.svc.food.text, to: "/earn/restaurants" },
    { label: t.businessPortal.earnFleet, desc: t.svc.cargo.text, to: "/earn/fleet" },
  ];
  const companyItems: [string, Route][] = [
    [t.nav.cities, "/cities"],
    [t.nav.about, "/about"],
    [t.nav.support, "/contact"],
    [t.nav.how, "/how-it-works"],
    [t.guidePage.title, "/guide"],
  ];

  const dropCls = (k: DropKey, active: boolean) =>
    `nav-drop${openDrop === k ? " open" : ""}${active ? " has-active" : ""}`;

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links" ref={navRef}>
          <div className={dropCls("services", route.startsWith("/services"))}>
            <button className="nav-drop-btn" onClick={() => toggleDrop("services")} aria-expanded={openDrop === "services"} aria-haspopup="true">{t.nav.services}</button>
            <div className="nav-drop-menu">
              <div className="menu-card">
                {svcItems.map((it) => (
                  <a key={it.to} href={`#${it.to}`} className={route === it.to ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); go(it.to); }}>
                    <span className="menu-item-title">{it.label}</span>
                    <span className="menu-item-desc">{it.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="#/download" onClick={(e) => { e.preventDefault(); go("/download"); }}>
            {t.nav.getApp}
          </a>
          <LangSwitcher />
          <button className="burger" onClick={() => setMenuOpen((o) => !o)} aria-label={t.nav.menu} aria-expanded={menuOpen} aria-controls="site-navigation">
            <span /><span /><span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          />
          <div className="mobile-menu" id="site-navigation" role="dialog" aria-modal="true" aria-label={t.nav.menu}>
          <div className="mobile-menu-header">
            <Brand />
            <div className="mobile-menu-header-actions">
              <LangSwitcher onNavigate={() => setMenuOpen(false)} />
              <button type="button" className="mobile-menu-close" aria-label={t.nav.close} onClick={() => setMenuOpen(false)}>×</button>
            </div>
          </div>
          <div className="mm-group">{t.nav.services}</div>
          {svcItems.map((it) => <a key={it.to} href={`#${it.to}`} onClick={(e) => { e.preventDefault(); go(it.to); }}>{it.label}</a>)}
          <div className="mm-group">{t.businessPortal.earnTitle}</div>
          <a href="#/earn" onClick={(e) => { e.preventDefault(); go("/earn"); }}>{t.businessPortal.earnTitle}</a>
          {earnItems.map((it) => <a key={it.to} href={`#${it.to}`} onClick={(e) => { e.preventDefault(); go(it.to); }}>{it.label}</a>)}
          <div className="mm-group">{t.nav.business}</div>
          <a href="#/business" onClick={(e) => { e.preventDefault(); go("/business"); }}>{t.nav.business}</a>
          <div className="mm-group">{t.nav.about}</div>
          {companyItems.map(([label, to]) => <a key={to} href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>{label}</a>)}
          <div className="mobile-lang">
            <LangSwitcher onNavigate={() => setMenuOpen(false)} />
          </div>
          <a className="mobile-menu-download" href="#/download" onClick={(e) => { e.preventDefault(); go("/download"); }}>{t.nav.getApp}</a>
          </div>
        </>
      )}
    </header>
  );
}
