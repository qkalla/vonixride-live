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

function MenuItem({ label, to, navigate, active }: { label: string; to: Route; navigate: (r: Route) => void; active?: boolean }) {
  return (
    <a
      href={`#${to}`}
      className={active ? "active" : ""}
      onClick={(e) => { e.preventDefault(); navigate(to); window.scrollTo({ top: 0 }); }}
    >
      {label}
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

  const go = (to: Route) => {
    navigate(to);
    window.scrollTo({ top: 0 });
  };

  const svcLinks: [string, Route][] = [
    [t.svc.ride.title, "/services/rides"],
    [t.svc.moped.title, "/services/courier"],
    [t.svc.cargo.title, "/services/cargo"],
    [t.svc.food.title, "/services/orders"],
  ];
  const earnLinks: [string, Route][] = [
    [t.earn.groups.drivers.title, "/earn/drivers"],
    [t.earn.groups.couriers.title, "/earn/couriers"],
    [t.earn.groups.restaurants.title, "/earn/restaurants"],
    [t.earn.groups.fleet.title, "/earn/fleet"],
  ];
  const companyLinks: [string, Route][] = [
    [t.nav.about, "/about"],
    [t.nav.contact, "/contact"],
    [t.nav.how, "/how-it-works"],
    [t.guidePage.title, "/guide"],
  ];

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links">
          <div className="nav-drop">
            <button className={route.startsWith("/services") ? "nav-drop-btn active" : "nav-drop-btn"}>{t.nav.services}</button>
            <div className="nav-drop-menu">
              <MenuItem label={t.nav.services} to="/services" navigate={navigate} />
              {svcLinks.map(([l, to]) => <MenuItem key={to} label={l} to={to} navigate={navigate} active={route === to} />)}
            </div>
          </div>
          <div className="nav-drop">
            <button className={route.startsWith("/earn") ? "nav-drop-btn active" : "nav-drop-btn"}>{t.earn.title}</button>
            <div className="nav-drop-menu">
              <MenuItem label={t.earn.title} to="/earn" navigate={navigate} />
              {earnLinks.map(([l, to]) => <MenuItem key={to} label={l} to={to} navigate={navigate} active={route === to} />)}
            </div>
          </div>
          <MenuItem label={t.nav.business} to="/business" navigate={navigate} active={route === "/business"} />
          <MenuItem label={t.nav.cities} to="/cities" navigate={navigate} active={route === "/cities"} />
          <div className="nav-drop">
            <button className={route === "/about" || route === "/contact" || route === "/how-it-works" || route === "/guide" ? "nav-drop-btn active" : "nav-drop-btn"}>{t.nav.about}</button>
            <div className="nav-drop-menu">
              {companyLinks.map(([l, to]) => <MenuItem key={to} label={l} to={to} navigate={navigate} active={route === to} />)}
            </div>
          </div>
        </nav>
        <div className="nav-actions">
          <LangSwitcher />
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
          <a href="#/services" onClick={(e) => { e.preventDefault(); go("/services"); }}>{t.nav.services}</a>
          {svcLinks.map(([l, to]) => <a key={to} href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>{l}</a>)}
          <a href="#/earn" onClick={(e) => { e.preventDefault(); go("/earn"); }}>{t.earn.title}</a>
          {earnLinks.map(([l, to]) => <a key={to} href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>{l}</a>)}
          <a href="#/business" onClick={(e) => { e.preventDefault(); go("/business"); }}>{t.nav.business}</a>
          <a href="#/cities" onClick={(e) => { e.preventDefault(); go("/cities"); }}>{t.nav.cities}</a>
          {companyLinks.map(([l, to]) => <a key={to} href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>{l}</a>)}
          <div className="mobile-lang">
            <LangSwitcher onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
