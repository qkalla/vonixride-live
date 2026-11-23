import { useState, type FormEvent, type ReactNode } from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { BusinessPreview } from "../components/previews";
import { LangSwitcher } from "../components/LangSwitcher";
import type { Route } from "../router";

const KEYS = ["ride", "food", "grocery", "pharmacy", "cargo", "moped"] as const;
const DETAIL: Record<string, string> = { ride: "/services/rides", cargo: "/services/cargo", moped: "/services/courier", food: "/services/orders", grocery: "/services/orders", pharmacy: "/services/orders" };

function PageHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Reveal>
          <h1 className="display">{title}</h1>
          <p className="page-sub">{sub}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesPage({ navigate }: { navigate?: (r: never) => void }) {
  const { t } = useLang();
  return (
    <>
      <PageHero title={t.pages.services.title} sub={t.pages.services.sub} />
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <div className="svc-list">
            {KEYS.map((key) => {
              const s = t.svc[key];
              const meta = t.svcShowcase[KEYS.indexOf(key)] ?? { title: s.title, sub: s.text, cta: t.servicesPage.cardCta };
              return (
                <a className="svc-row reveal" key={key} href={`#${DETAIL[key]}`} onClick={(e) => { e.preventDefault(); navigate?.(DETAIL[key] as never); window.scrollTo({ top: 0 }); }}>
                  <div className="svc-row-main">
                    <h3>{meta.title}</h3>
                    <p>{meta.sub}</p>
                  </div>
                  <span className="svc-row-cta">{meta.cta} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

type BusinessRole = "driver" | "restaurant" | "shop" | "cargo" | "fleet";

const BUSINESS_ROLES: BusinessRole[] = ["driver", "restaurant", "shop", "cargo", "fleet"];

function BusinessBrand() {
  return (
    <span className="business-wordmark">
      <strong>Vonix</strong> <em>Business</em>
    </span>
  );
}

function BusinessRouteLink({ to, navigate, className, children }: { to: Route; navigate: (route: Route) => void; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={`#${to}`} onClick={(event) => { event.preventDefault(); navigate(to); window.scrollTo({ top: 0, left: 0 }); }}>
      {children}
    </a>
  );
}

export function BusinessOverviewPage({ navigate }: { navigate: (route: Route) => void }) {
  const { t } = useLang();
  const copy = t.businessPortal;
  const flow = t.businessFlow;

  return (
    <section className="business-overview">
      <div className="business-overview-copy">
        <BusinessBrand />
        <span className="business-eyebrow">{copy.eyebrow}</span>
        <h1>{t.business.title}</h1>
        <p>{t.pages.businessPage.sub}</p>
        <div className="business-overview-context">
          <span>Yerevan, Armenia</span><i aria-hidden="true" />
          <span>+374</span><i aria-hidden="true" />
          <span>AMD</span>
        </div>
        <div className="business-overview-actions">
          <BusinessRouteLink className="business-submit" to="/business/get-started" navigate={navigate}>
            {flow.overviewCta}<span aria-hidden="true">→</span>
          </BusinessRouteLink>
          <BusinessRouteLink className="business-signin-link" to="/business/signup/choose-auth" navigate={navigate}>
            {flow.overviewSignIn}
          </BusinessRouteLink>
        </div>
      </div>
      <div className="business-overview-visual">
        <BusinessPreview variant="portal" />
      </div>
    </section>
  );
}

export function BusinessGetStartedPage({ navigate }: { navigate: (route: Route) => void }) {
  const { t } = useLang();
  const copy = t.businessPortal;
  const flow = t.businessFlow;
  const [role, setRole] = useState<BusinessRole>("restaurant");
  const roles: { id: BusinessRole; title: string }[] = [
    { id: "driver", title: copy.roles.driver },
    { id: "restaurant", title: copy.roles.restaurant },
    { id: "shop", title: copy.roles.shop },
    { id: "cargo", title: copy.roles.cargo },
    { id: "fleet", title: copy.roles.fleet },
  ];
  const continueToAuth = () => {
    window.sessionStorage.setItem("vonix.business.role", role);
    navigate("/business/signup/choose-auth");
  };

  return (
    <section className="business-journey">
      <div className="business-journey-heading">
        <BusinessRouteLink to="/business" navigate={navigate} className="business-back-link">← {t.nav.business}</BusinessRouteLink>
        <span className="business-eyebrow">{copy.eyebrow}</span>
        <h1>{flow.getStartedTitle}</h1>
        <p>{flow.getStartedBody}</p>
      </div>

      <div className="business-journey-grid">
        <div className="business-journey-main">
          <h2>{flow.roleTitle}</h2>
          <div className="business-role-grid" role="radiogroup" aria-label={flow.roleTitle}>
            {roles.map((item) => (
              <button
                type="button"
                role="radio"
                aria-checked={role === item.id}
                className={`business-role-card${role === item.id ? " active" : ""}`}
                key={item.id}
                onClick={() => setRole(item.id)}
              >
                <span className="business-role-radio" aria-hidden="true" />
                <strong>{item.title}</strong>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <h2 className="business-setup-title">{flow.stepsTitle}</h2>
          <ol className="business-setup-steps">
            {flow.setupSteps.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
            ))}
          </ol>
        </div>

        <aside className="business-benefits">
          <h2>{flow.benefitsTitle}</h2>
          {t.business.checks.map((benefit) => (
            <div className="business-benefit" key={benefit.title}>
              <span aria-hidden="true">✓</span>
              <p><strong>{benefit.title}</strong>{benefit.text}</p>
            </div>
          ))}
          <button type="button" className="business-submit" onClick={continueToAuth}>
            {flow.continueCta}<span aria-hidden="true">→</span>
          </button>
          <p className="business-journey-note">+374 <span>·</span> Yerevan, Armenia <span>·</span> AMD</p>
        </aside>
      </div>
    </section>
  );
}

export function BusinessAuthPage({ navigate }: { navigate: (route: Route) => void }) {
  const { t } = useLang();
  const copy = t.businessPortal;
  const flow = t.businessFlow;
  const [mode, setMode] = useState<"signin" | "register">("register");
  const [role, setRole] = useState<BusinessRole>(() => {
    const savedRole = window.sessionStorage.getItem("vonix.business.role");
    return BUSINESS_ROLES.includes(savedRole as BusinessRole) ? savedRole as BusinessRole : "restaurant";
  });
  const [contactName, setContactName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("+374 ");
  const [email, setEmail] = useState("");

  const roles: { id: BusinessRole; title: string }[] = [
    { id: "driver", title: copy.roles.driver },
    { id: "restaurant", title: copy.roles.restaurant },
    { id: "shop", title: copy.roles.shop },
    { id: "cargo", title: copy.roles.cargo },
    { id: "fleet", title: copy.roles.fleet },
  ];

  const sendPartnerInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const roleTitle = roles.find((item) => item.id === role)?.title ?? role;
    const subject = encodeURIComponent(`Vonix Business — ${roleTitle}`);
    const body = encodeURIComponent(
      `${copy.contactName}: ${contactName}\n${copy.businessName}: ${businessName}\n${copy.phone}: ${phone}\n${copy.email}: ${email}\n${copy.role}: ${roleTitle}`,
    );
    window.location.href = `mailto:support@vonix.am?subject=${subject}&body=${body}`;
  };

  return (
    <section className="business-auth-page">
      <div className="business-auth-top">
        <BusinessRouteLink to="/business" navigate={navigate} className="business-auth-brand"><BusinessBrand /></BusinessRouteLink>
        <LangSwitcher />
      </div>
      <div className="business-auth-card">
        <div className="business-auth-heading">
          <span className="business-eyebrow">{copy.eyebrow}</span>
          <h1>{flow.authTitle}</h1>
          <p>{flow.authBody}</p>
        </div>
        <div className="business-mode-tabs" role="tablist" aria-label={copy.panelLabel}>
          <button type="button" role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>
            {copy.signInTab}
          </button>
          <button type="button" role="tab" aria-selected={mode === "register"} className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
            {copy.registerTab}
          </button>
        </div>

        {mode === "signin" ? (
          <div className="business-auth-content" role="tabpanel">
            <h2>{copy.signInTitle}</h2>
            <p>{copy.signInBody}</p>
            <a className="business-submit" href="mailto:support@vonix.am?subject=Vonix%20Business%20access">
              {copy.appCta}<span aria-hidden="true">→</span>
            </a>
            <p className="business-form-note">{copy.signInNote}</p>
          </div>
        ) : (
          <form className="business-auth-content" onSubmit={sendPartnerInquiry} role="tabpanel">
            <h2>{copy.registerTitle}</h2>
            <p>{copy.registerBody}</p>
            <div className="business-fields">
              <label>
                <span>{copy.contactName}</span>
                <input required autoComplete="name" value={contactName} onChange={(event) => setContactName(event.target.value)} />
              </label>
              <label>
                <span>{copy.businessName}</span>
                <input required autoComplete="organization" value={businessName} onChange={(event) => setBusinessName(event.target.value)} />
              </label>
              <label>
                <span>{copy.phone}</span>
                <input required type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label>
                <span>{copy.email}</span>
                <input required type="email" autoComplete="email" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="business-role-field">
                <span>{copy.role}</span>
                <select value={role} onChange={(event) => setRole(event.target.value as BusinessRole)}>
                  {roles.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </label>
            </div>
            <button type="submit" className="business-submit">{copy.submit}<span aria-hidden="true">→</span></button>
            <p className="business-form-note">{copy.emailNote}</p>
          </form>
        )}
      </div>
    </section>
  );
}

export function CitiesPage() {
  const { t } = useLang();
  const cg = t.citiesGroups;
  const capital = ["Yerevan", "Abovyan", "Arabkir", "Kentron", "Erebuni", "Malatia-Sebastia"];
  const regions = t.cities.list.filter((c) => !capital.includes(c));
  return (
    <>
      <PageHero title={t.pages.citiesPage.title} sub={t.pages.citiesPage.sub} />
      <section className="section section-alt" style={{ paddingTop: "3rem" }}>
        <div className="container cities-hub">
          <Reveal className="city-group">
            <h3>{cg.capital}</h3>
            <p>{cg.capitalNote}</p>
            <div className="city-chips">{capital.map((c) => <span className="city-chip" key={c}><span className="pulse" />{c}</span>)}</div>
          </Reveal>
          <Reveal className="city-group">
            <h3>{cg.airport}</h3>
            <p>{cg.airportNote}</p>
            <div className="city-chips"><span className="city-chip"><span className="pulse" />Zvartnots Airport</span></div>
          </Reveal>
          <Reveal className="city-group">
            <h3>{cg.regions}</h3>
            <p>{cg.regionsNote}</p>
            <div className="city-chips">{regions.map((c) => <span className="city-chip" key={c}><span className="pulse" />{c}</span>)}</div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function AboutPage() {
  const { t } = useLang();
  const a = t.pages.about;
  return (
    <>
      <PageHero title={a.title} sub="" />
      <section className="section prose" style={{ paddingTop: "2rem" }}>
        <div className="container narrow">
          {a.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <div className="mission-card reveal">
            <h3>{a.mission}</h3>
            <p>{a.missionText}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage() {
  const { t } = useLang();
  const c = t.pages.contact;
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero title={c.title} sub={c.sub} />
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-info">
              <a className="contact-row" href={`mailto:${c.email}`}>
                <span className="contact-ico">@</span><div><small>Email</small><strong>{c.email}</strong></div>
              </a>
              <a className="contact-row" href={`tel:${c.phone.replace(/\s/g, "")}`}>
                <span className="contact-ico">☎</span><div><small>Phone</small><strong>{c.phone}</strong></div>
              </a>
              <div className="contact-row">
                <span className="contact-ico">📍</span><div><small>{c.address}</small><strong>{c.address}</strong></div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <h3>{c.formTitle}</h3>
              <label>{c.name}<input required placeholder={c.name} /></label>
              <label>{c.topic}
                <select defaultValue={c.topics[0]}>{c.topics.map((tp) => <option key={tp}>{tp}</option>)}</select>
              </label>
              <label>{c.message}<textarea required rows={5} placeholder={c.message} /></label>
              <button className="btn btn-primary" type="submit">{c.send}</button>
              {sent && <p className="form-sent">{c.sent}</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useLang();
  const p = kind === "privacy" ? t.pages.privacy : t.pages.terms;
  return (
    <>
      <PageHero title={p.title} sub={p.updated} />
      <section className="section prose" style={{ paddingTop: "2rem" }}>
        <div className="container narrow">
          {p.body.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
        </div>
      </section>
    </>
  );
}
