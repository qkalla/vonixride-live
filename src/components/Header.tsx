import { useEffect, useState, type ReactNode } from "react";
import { useLang } from "../i18n";
import { LangSwitcher } from "./LangSwitcher";
import type { Route } from "../router";

export function Brand({ onClick }: { onClick?: () => void } = {}) {
  return (
    <a className="brand" href="#/" onClick={onClick ? (event) => { event.preventDefault(); onClick(); } : undefined}>
      <img className="brand-mark" src="/logo.png" alt="Vonix" width={34} height={34} />
      <span className="brand-name">Vonix<em>ride</em></span>
    </a>
  );
}

type MenuSection = "services" | "earn" | "company" | "safety" | "support" | "cities";
type MenuLink = { label: string; to: Route };
type ActionKind = "driver" | "courier" | "merchant" | "fleet" | "business";

function ActionIcon({ kind }: { kind: ActionKind }) {
  const paths: Record<ActionKind, ReactNode> = {
    driver: <><circle cx="12" cy="7" r="3" /><path d="M5 20v-1a7 7 0 0 1 14 0v1M4 13h16l1.5 4H2.5L4 13Z" /></>,
    courier: <><circle cx="6" cy="17" r="2.5" /><circle cx="18" cy="17" r="2.5" /><path d="M8.5 17h4l3-7h4l2 7M12.5 17l-3-7H6" /></>,
    merchant: <><path d="M4 10h16v10H4zM3 10l2-6h14l2 6M8 20v-6h5v6M4 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /></>,
    fleet: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h10M7 13h5M7 17h3M16 13h2v4h-2z" /></>,
    business: <><path d="M3 20h18M5 20V8l7-4 7 4v12M9 20v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[kind]}
    </svg>
  );
}

export function Header({ route, navigate }: { route: Route; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuSection>("services");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const go = (to: Route) => {
    setMenuOpen(false);
    navigate(to);
    window.scrollTo({ top: 0, left: 0 });
  };

  const sections: { id: MenuSection; label: string }[] = [
    { id: "services", label: t.navigationMenu.tabs.services },
    { id: "earn", label: t.navigationMenu.tabs.earn },
    { id: "company", label: t.navigationMenu.tabs.company },
    { id: "safety", label: t.navigationMenu.tabs.safety },
    { id: "support", label: t.navigationMenu.tabs.support },
    { id: "cities", label: t.navigationMenu.tabs.cities },
  ];

  const links: Record<MenuSection, MenuLink[]> = {
    services: [
      { label: t.navigationMenu.links.rides, to: "/services/rides" },
      { label: t.navigationMenu.links.courier, to: "/services/courier" },
      { label: t.navigationMenu.links.cargo, to: "/services/cargo" },
      { label: t.navigationMenu.links.markets, to: "/services/orders" },
      { label: t.navigationMenu.links.food, to: "/food" },
      { label: t.navigationMenu.links.business, to: "/business" },
    ],
    earn: [
      { label: t.navigationMenu.links.becomeDriver, to: "/earn/drivers" },
      { label: t.navigationMenu.links.becomeCourier, to: "/earn/couriers" },
      { label: t.navigationMenu.links.addStore, to: "/earn/restaurants" },
      { label: t.navigationMenu.links.fleetOwner, to: "/earn/fleet" },
      { label: t.navigationMenu.links.partnerOnboarding, to: "/business/get-started" },
    ],
    company: [
      { label: t.navigationMenu.links.business, to: "/business" },
      { label: t.navigationMenu.links.about, to: "/about" },
      { label: t.navigationMenu.links.howItWorks, to: "/how-it-works" },
      { label: t.navigationMenu.links.guide, to: "/guide" },
    ],
    safety: [
      { label: t.navigationMenu.links.riderSafety, to: "/guide" },
      { label: t.navigationMenu.links.shareTrip, to: "/guide" },
      { label: t.navigationMenu.links.emergencyHelp, to: "/contact" },
    ],
    support: [
      { label: t.navigationMenu.links.faq, to: "/guide" },
      { label: t.navigationMenu.links.reportIssue, to: "/contact" },
      { label: t.navigationMenu.links.contact, to: "/contact" },
    ],
    cities: [
      { label: t.navigationMenu.links.citiesCoverage, to: "/cities" },
      { label: t.navigationMenu.links.yerevan, to: "/cities" },
      { label: t.navigationMenu.links.regions, to: "/cities" },
    ],
  };

  const quickActions: { kind: ActionKind; title: string; subtitle: string; to: Route }[] = [
    { kind: "driver", title: t.navigationMenu.actions.driver, subtitle: t.navigationMenu.actions.driverSub, to: "/business/get-started" },
    { kind: "courier", title: t.navigationMenu.actions.courier, subtitle: t.navigationMenu.actions.courierSub, to: "/business/get-started" },
    { kind: "merchant", title: t.navigationMenu.actions.merchant, subtitle: t.navigationMenu.actions.merchantSub, to: "/business/get-started" },
    { kind: "fleet", title: t.navigationMenu.actions.fleet, subtitle: t.navigationMenu.actions.fleetSub, to: "/business/get-started" },
    { kind: "business", title: t.navigationMenu.actions.business, subtitle: t.navigationMenu.actions.businessSub, to: "/business/get-started" },
  ];

  const shareUrl = encodeURIComponent("https://vonixride.live");
  const socialLinks = [
    { label: "Facebook", short: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { label: "LinkedIn", short: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { label: "X", short: "𝕏", href: `https://twitter.com/intent/tweet?url=${shareUrl}` },
  ];

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links" aria-label={t.navigationMenu.tabs.services}>
          <button className="nav-drop-btn" onClick={() => { setMenuOpen(true); setActiveSection("services"); }}>
            {t.nav.services}
          </button>
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="#/download" onClick={(event) => { event.preventDefault(); go("/download"); }}>
            {t.nav.getApp}
          </a>
          <LangSwitcher />
          <button
            className="burger"
            onClick={() => setMenuOpen(true)}
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="menu-overlay" id="site-navigation" role="dialog" aria-modal="true" aria-label={t.nav.menu}>
          <div className="menu-topbar">
            <Brand onClick={() => go("/")} />
            <div className="menu-top-actions">
              <LangSwitcher />
              <a className="menu-quick-link" href="#/download" onClick={(event) => { event.preventDefault(); go("/download"); }}>
                {t.nav.getApp}
              </a>
              <button type="button" className="menu-close" aria-label={t.nav.close} onClick={() => setMenuOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="menu-body">
            <section className="menu-main-panel" aria-label={t.navigationMenu.menuTitle}>
              <div className="menu-section-tabs" role="tablist" aria-label={t.navigationMenu.menuTitle}>
                {sections.map((section) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSection === section.id}
                    className={`menu-section-tab${activeSection === section.id ? " active" : ""}`}
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
              <div className="menu-links-grid" role="tabpanel">
                {links[activeSection].map((item) => (
                  <a key={`${item.label}-${item.to}`} href={`#${item.to}`} onClick={(event) => { event.preventDefault(); go(item.to); }}>
                    <span>{item.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>

            <aside className="menu-actions-panel" aria-label={t.navigationMenu.quickActionsTitle}>
              <h2>{t.navigationMenu.quickActionsTitle}</h2>
              <div className="menu-action-cards">
                {quickActions.map((action) => (
                  <a key={action.kind} className="menu-action-card" href={`#${action.to}`} onClick={(event) => { event.preventDefault(); go(action.to); }}>
                    <span className="menu-action-icon"><ActionIcon kind={action.kind} /></span>
                    <span className="menu-action-copy">
                      <strong>{action.title}</strong>
                      <small>{action.subtitle}</small>
                    </span>
                    <svg className="menu-action-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <footer className="menu-footer">
            <div className="menu-socials" aria-label={t.navigationMenu.socialLabel}>
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.navigationMenu.shareOn} ${item.label}`} title={`${t.navigationMenu.shareOn} ${item.label}`}>
                  {item.short}
                </a>
              ))}
            </div>
            <nav className="menu-legal-links" aria-label={t.navigationMenu.legalLabel}>
              <a href="#/terms" onClick={(event) => { event.preventDefault(); go("/terms"); }}>{t.navigationMenu.terms}</a>
              <a href="#/privacy" onClick={(event) => { event.preventDefault(); go("/privacy"); }}>{t.navigationMenu.privacy}</a>
              <a href="#/privacy" onClick={(event) => { event.preventDefault(); go("/privacy"); }}>{t.navigationMenu.cookies}</a>
            </nav>
            <span className="menu-copyright">© {new Date().getFullYear()} Vonix. {t.footer.rights}</span>
          </footer>
        </div>
      )}
    </header>
  );
}
