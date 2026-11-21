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
    { label: t.earn.groups.drivers.title, desc: t.earn.groups.drivers.text, to: "/earn/drivers" },
    { label: t.earn.groups.couriers.title, desc: t.earn.groups.couriers.text, to: "/earn/couriers" },
    { label: t.earn.groups.restaurants.title, desc: t.earn.groups.restaurants.text, to: "/earn/restaurants" },
    { label: t.earn.groups.fleet.title, desc: t.earn.groups.fleet.text, to: "/earn/fleet" },
  ];
  const companyItems: [string, Route][] = [
    [t.nav.about, "/about"],
    [t.nav.contact, "/contact"],
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
          <div className={dropCls("earn", route.startsWith("/earn"))}>
            <button className="nav-drop-btn" onClick={() => toggleDrop("earn")} aria-expanded={openDrop === "earn"} aria-haspopup="true">{t.earn.title}</button>
            <div className="nav-drop-menu">
              <div className="menu-card">
                <a href="#/earn" className={route === "/earn" ? "active" : ""} onClick={(e) => { e.preventDefault(); go("/earn"); }}>
                  <span className="menu-item-title">{t.earn.title}</span>
                  <span className="menu-item-desc">{t.earn.sub}</span>
                </a>
                {earnItems.map((it) => (
                  <a key={it.to} href={`#${it.to}`} className={route === it.to ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); go(it.to); }}>
                    <span className="menu-item-title">{it.label}</span>
                    <span className="menu-item-desc">{it.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a className={route === "/business" ? "active" : ""} href="#/business" onClick={(e) => { e.preventDefault(); go("/business"); }}>{t.nav.business}</a>
          <a className={route === "/cities" ? "active" : ""} href="#/cities" onClick={(e) => { e.preventDefault(); go("/cities"); }}>{t.nav.cities}</a>
          <div className={dropCls("company", ["/about", "/contact", "/how-it-works", "/guide"].includes(route))}>
            <button className="nav-drop-btn" onClick={() => toggleDrop("company")} aria-expanded={openDrop === "company"} aria-haspopup="true">{t.nav.about}</button>
            <div className="nav-drop-menu">
              <div className="menu-card">
                {companyItems.map(([l, to]) => (
                  <a key={to} href={`#${to}`} className={route === to ? "active" : ""}
                    onClick={(e) => { e.preventDefault(); go(to); }}>{l}</a>
                ))}
              </div>
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
          <div className="mm-group">{t.nav.services}</div>
          <a href="#/services" onClick={(e) => { e.preventDefault(); go("/services"); }}>{t.servicesPage?.title ?? t.nav.services}</a>
          {svcItems.map((it) => <a key={it.to} href={`#${it.to}`} onClick={(e) => { e.preventDefault(); go(it.to); }}>{it.label}</a>)}
          <div className="mm-group">{t.earn.title}</div>
          <a href="#/earn" onClick={(e) => { e.preventDefault(); go("/earn"); }}>{t.earn.title}</a>
          {earnItems.map((it) => <a key={it.to} href={`#${it.to}`} onClick={(e) => { e.preventDefault(); go(it.to); }}>{it.label}</a>)}
          <div className="mm-group">{t.nav.business}</div>
          <a href="#/business" onClick={(e) => { e.preventDefault(); go("/business"); }}>{t.nav.business}</a>
          <a href="#/cities" onClick={(e) => { e.preventDefault(); go("/cities"); }}>{t.nav.cities}</a>
          <div className="mm-group">{t.nav.about}</div>
          {companyItems.map(([l, to]) => <a key={to} href={`#${to}`} onClick={(e) => { e.preventDefault(); go(to); }}>{l}</a>)}
          <div className="mobile-lang">
            <LangSwitcher onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
