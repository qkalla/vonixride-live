import { useLang } from "../i18n";
import type { Route } from "../router";
import { LangSwitcher } from "./LangSwitcher";

const PARTNER_URL = "https://vonix-platform.onrender.com/partner";

export function Footer({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useLang();
  const link = (label: string, to: Route) => (
    <a key={label} href={`#${to}`} onClick={(e) => { e.preventDefault(); navigate(to); window.scrollTo({ top: 0 }); }}>
      {label}
    </a>
  );
  const ext = (label: string, href: string) => (
    <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
  );

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#/" onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0 }); }}>
            <img className="brand-mark" src="/logo.png" alt="Vonix" width={34} height={34} />
            <span className="brand-name">Vonix<em>ride</em></span>
          </a>
          <p>{t.footer.tagline}</p>
          <div className="footer-loc">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {t.footer.location}
          </div>
          <LangSwitcher />
        </div>
        <nav className="footer-col">
          <h4>{t.footer.services}</h4>
          {link(t.nav.services, "/services")}
          <a href="#/#how" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("how")?.scrollIntoView(), 80); }}>{t.footer.howLink}</a>
          {link(t.footer.citiesLink, "/cities")}
        </nav>
        <nav className="footer-col">
          <h4>{t.footer.partners}</h4>
          {link(t.nav.business, "/business")}
          {ext(t.footer.partnerPortal, PARTNER_URL)}
          {ext(t.footer.becomePartner, PARTNER_URL)}
        </nav>
        <nav className="footer-col">
          <h4>{t.footer.company}</h4>
          {link(t.footer.about, "/about")}
          {link(t.footer.contact, "/contact")}
        </nav>
        <nav className="footer-col">
          <h4>{t.footer.legal}</h4>
          {link(t.footer.privacy, "/privacy")}
          {link(t.footer.terms, "/terms")}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Vonix. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
