import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
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
const BUSINESS_ROLE_IMAGES: Record<BusinessRole, string> = {
  driver: "/cab.png",
  restaurant: "/deliervy.png",
  shop: "/shoopss.jpg",
  cargo: "/cargo.png",
  fleet: "/Gemini_Generated_Image_fhncqsfhncqsfhnc.jpg",
};

function BusinessBrand() {
  return (
    <span className="business-wordmark">
      <img src="/logo.png" alt="" />
      <strong>Vonix</strong> <em>Business</em>
    </span>
  );
}

function BusinessRouteLink({ to, navigate, className, beforeNavigate, children }: { to: Route; navigate: (route: Route) => void; className?: string; beforeNavigate?: () => void; children: ReactNode }) {
  return (
    <a className={className} href={`#${to}`} onClick={(event) => { event.preventDefault(); beforeNavigate?.(); navigate(to); window.scrollTo({ top: 0, left: 0 }); }}>
      {children}
    </a>
  );
}

export function BusinessOverviewPage({ navigate }: { navigate: (route: Route) => void }) {
  const { t } = useLang();
  const flow = t.businessFlow;
  const story = t.businessExperience;

  return (
    <div className="business-overview-page">
      <section className="business-overview">
        <div className="business-overview-copy">
          <BusinessBrand />
          <span className="business-eyebrow">{story.heroEyebrow}</span>
          <h1>{story.heroTitle}</h1>
          <p>{story.heroBody}</p>
          <div className="business-overview-context">
            <span>Yerevan, Armenia</span><i aria-hidden="true" />
            <span>+374</span><i aria-hidden="true" />
            <span>AMD</span>
          </div>
          <div className="business-overview-actions">
            <BusinessRouteLink className="business-submit" to="/business/get-started" navigate={navigate}>
              {flow.overviewCta}<span aria-hidden="true">→</span>
            </BusinessRouteLink>
            <BusinessRouteLink className="business-signin-link" to="/business/signup/choose-auth" navigate={navigate} beforeNavigate={() => window.sessionStorage.setItem("vonix.business.authMode", "signin")}>
              {flow.overviewSignIn}
            </BusinessRouteLink>
          </div>
        </div>
      </section>

      <section className="business-photo-band" aria-label={story.photoAlt}>
        <img src="/cab.png" alt={story.photoAlt} />
        <div className="business-photo-caption">
          <span>{story.photoEyebrow}</span>
          <strong>{story.photoTitle}</strong>
        </div>
      </section>

      <section className="business-feature-section">
        <div className="business-section-intro">
          <span className="business-eyebrow">{story.featuresEyebrow}</span>
          <h2>{story.featuresTitle}</h2>
        </div>
        <div className="business-feature-grid">
          <article className="business-feature-card">
            <span className="business-feature-index">01</span>
            <h3>{story.teamTitle}</h3>
            <p>{story.teamBody}</p>
            <BusinessRouteLink to="/business/get-started" navigate={navigate} className="business-text-link">
              {flow.overviewCta}<span aria-hidden="true">→</span>
            </BusinessRouteLink>
          </article>
          <article className="business-feature-card">
            <span className="business-feature-index">02</span>
            <h3>{story.ordersTitle}</h3>
            <p>{story.ordersBody}</p>
            <BusinessRouteLink to="/business/get-started" navigate={navigate} className="business-text-link">
              {flow.overviewCta}<span aria-hidden="true">→</span>
            </BusinessRouteLink>
          </article>
          <div className="business-feature-media">
            <img src="/Gemini_Generated_Image_fhncqsfhncqsfhnc.jpg" alt={story.dashboardAlt} />
          </div>
        </div>
      </section>

      <section className="business-booking-section">
        <div className="business-booking-media">
          <img src="/deliervy.png" alt={story.bookingPhotoAlt} />
        </div>
        <div className="business-booking-copy">
          <span className="business-eyebrow">{story.bookingEyebrow}</span>
          <h2>{story.bookingTitle}</h2>
          <p>{story.bookingBody}</p>
          <blockquote>{story.quote}<cite>{story.quoteBy}</cite></blockquote>
          <BusinessRouteLink to="/business/get-started" navigate={navigate} className="business-submit">
            {flow.overviewCta}<span aria-hidden="true">→</span>
          </BusinessRouteLink>
        </div>
      </section>

      <section className="business-steps-section">
        <div className="business-section-intro">
          <span className="business-eyebrow">{story.stepsEyebrow}</span>
          <h2>{story.stepsTitle}</h2>
        </div>
        <div className="business-steps-grid">
          {story.steps.map((step, index) => (
            <article className="business-step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="business-referral-section">
        <div>
          <span className="business-eyebrow">{story.referralEyebrow}</span>
          <h2>{story.referralTitle}</h2>
          <p>{story.referralBody}</p>
          <BusinessRouteLink to="/business/get-started" navigate={navigate} className="business-submit">
            {flow.overviewCta}<span aria-hidden="true">→</span>
          </BusinessRouteLink>
        </div>
        <div className="business-referral-mark" aria-label={story.referralMetric}>
          <span>{story.referralMetric}</span>
          <strong>AMD</strong>
          <small>{story.referralNote}</small>
        </div>
      </section>

      <section className="business-reporting-section">
        <div className="business-reporting-copy">
          <span className="business-eyebrow">{story.reportingEyebrow}</span>
          <h2>{story.reportingTitle}</h2>
          <p>{story.reportingBody}</p>
          <BusinessRouteLink to="/business/get-started" navigate={navigate} className="business-submit">
            {flow.overviewCta}<span aria-hidden="true">→</span>
          </BusinessRouteLink>
        </div>
        <div className="business-reporting-image">
          <img src="/cargo.png" alt={story.reportingAlt} />
        </div>
      </section>
    </div>
  );
}

export function BusinessGetStartedPage({ navigate }: { navigate: (route: Route) => void }) {
  const { t } = useLang();
  const copy = t.businessPortal;
  const flow = t.businessFlow;
  const story = t.businessExperience;
  const [role, setRole] = useState<BusinessRole>("restaurant");
  const [setupType, setSetupType] = useState<"quick" | "tailored">("quick");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [phone, setPhone] = useState("+374 ");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const roles: { id: BusinessRole; title: string }[] = [
    { id: "driver", title: copy.roles.driver },
    { id: "restaurant", title: copy.roles.restaurant },
    { id: "shop", title: copy.roles.shop },
    { id: "cargo", title: copy.roles.cargo },
    { id: "fleet", title: copy.roles.fleet },
  ];
  const continueToAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.sessionStorage.setItem("vonix.business.role", role);
    window.sessionStorage.setItem("vonix.business.authMode", "register");
    window.sessionStorage.setItem("vonix.business.setupType", setupType);
    window.sessionStorage.setItem("vonix.business.firstName", firstName);
    window.sessionStorage.setItem("vonix.business.lastName", lastName);
    window.sessionStorage.setItem("vonix.business.companyEmail", companyEmail);
    window.sessionStorage.setItem("vonix.business.phone", phone);
    window.sessionStorage.setItem("vonix.business.jobTitle", jobTitle);
    window.sessionStorage.setItem("vonix.business.companyName", companyName);
    window.sessionStorage.setItem("vonix.business.companySize", companySize);
    navigate("/business/signup/choose-auth");
  };
  const selectedRole = roles.find((item) => item.id === role)!;

  return (
    <section className="business-journey">
      <div className="business-journey-heading">
        <BusinessRouteLink to="/business" navigate={navigate} className="business-back-link">← {t.nav.business}</BusinessRouteLink>
        <span className="business-eyebrow">{copy.eyebrow}</span>
        <h1>{story.setupTitle}</h1>
        <p>{story.setupBody}</p>
      </div>

      <div className="business-setup-options" role="tablist" aria-label={story.setupOptionsLabel}>
        {(["quick", "tailored"] as const).map((type) => (
          <button type="button" role="tab" aria-selected={setupType === type} className={setupType === type ? "active" : ""} key={type} onClick={() => setSetupType(type)}>
            <span>{type === "quick" ? story.quickTitle : story.tailoredTitle}</span>
            <small>{type === "quick" ? story.quickBody : story.tailoredBody}</small>
          </button>
        ))}
      </div>

      <form className="business-inquiry-form" onSubmit={continueToAuth}>
        <div className="business-inquiry-intro">
          <div>
            <span className="business-eyebrow">{story.formEyebrow}</span>
            <h2>{story.formTitle}</h2>
            <p>{story.formBody}</p>
          </div>
          <div className="business-inquiry-context"><span>+374</span><i />Yerevan <i />AMD</div>
        </div>

        <div className="business-role-grid" role="radiogroup" aria-label={flow.roleTitle}>
          {roles.map((item) => (
            <button type="button" role="radio" aria-checked={role === item.id} className={`business-role-card${role === item.id ? " active" : ""}`} key={item.id} onClick={() => setRole(item.id)}>
              <span className="business-role-radio" aria-hidden="true" />
              <strong>{item.title}</strong>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>

        <div className="business-fields business-inquiry-fields">
          <label><span>{story.firstName}</span><input required autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} /></label>
          <label><span>{story.lastName}</span><input required autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)} /></label>
          <label><span>{story.companyEmail}</span><input required type="email" autoComplete="email" value={companyEmail} onChange={(event) => setCompanyEmail(event.target.value)} /></label>
          <label><span>{story.phoneNumber}</span><input required type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
          <label><span>{story.jobTitle}</span><input required autoComplete="organization-title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} /></label>
          <label><span>{story.companyName}</span><input required autoComplete="organization" value={companyName} onChange={(event) => setCompanyName(event.target.value)} /></label>
          <label className="business-role-field"><span>{story.companySize}</span>
            <select required value={companySize} onChange={(event) => setCompanySize(event.target.value)}>
              <option value="" disabled>{story.companySizePlaceholder}</option>
              {story.companySizeOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
        <div className="business-consent">
          <input required type="checkbox" id="business-consent" />
          <span><label htmlFor="business-consent">{story.consentPrefix}</label> <BusinessRouteLink to="/privacy" navigate={navigate} className="business-consent-link">{story.consentLink}</BusinessRouteLink>.</span>
        </div>
        <div className="business-inquiry-submit">
          <button type="submit" className="business-submit">{story.submitInquiry}<span aria-hidden="true">→</span></button>
          <p>{story.submitNote}</p>
        </div>
      </form>

      <section className="business-setup-proof">
        <h2>{flow.stepsTitle}</h2>
        <ol className="business-setup-steps">
          {flow.setupSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
        </ol>
        <div className="business-setup-proof-image">
          <img src={BUSINESS_ROLE_IMAGES[role]} alt={selectedRole.title} />
          <span>{selectedRole.title}</span>
        </div>
      </section>
    </section>
  );
}

export function BusinessAuthPage({ navigate }: { navigate: (route: Route) => void }) {
  const { t } = useLang();
  const copy = t.businessPortal;
  const flow = t.businessFlow;
  const story = t.businessExperience;
  const [mode, setMode] = useState<"signin" | "register">(() =>
    window.sessionStorage.getItem("vonix.business.authMode") === "signin" ? "signin" : "register",
  );
  const [role, setRole] = useState<BusinessRole>(() => {
    const savedRole = window.sessionStorage.getItem("vonix.business.role");
    return BUSINESS_ROLES.includes(savedRole as BusinessRole) ? savedRole as BusinessRole : "restaurant";
  });
  const [contactName, setContactName] = useState(() => [window.sessionStorage.getItem("vonix.business.firstName"), window.sessionStorage.getItem("vonix.business.lastName")].filter(Boolean).join(" "));
  const [businessName, setBusinessName] = useState(() => window.sessionStorage.getItem("vonix.business.companyName") ?? "");
  const [phone, setPhone] = useState(() => window.sessionStorage.getItem("vonix.business.phone") ?? "+374 ");
  const [email, setEmail] = useState(() => window.sessionStorage.getItem("vonix.business.companyEmail") ?? "");
  const [jobTitle, setJobTitle] = useState(() => window.sessionStorage.getItem("vonix.business.jobTitle") ?? "");
  const [companySize, setCompanySize] = useState(() => window.sessionStorage.getItem("vonix.business.companySize") ?? "");

  useEffect(() => {
    window.sessionStorage.removeItem("vonix.business.authMode");
  }, []);

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
    const setupType = window.sessionStorage.getItem("vonix.business.setupType");
    const setupTitle = setupType === "tailored" ? story.tailoredTitle : story.quickTitle;
    const subject = encodeURIComponent(`Vonix Business — ${roleTitle}`);
    const body = encodeURIComponent(
      `${copy.contactName}: ${contactName}\n${copy.businessName}: ${businessName}\n${story.jobTitle}: ${jobTitle}\n${story.companySize}: ${companySize}\n${story.setupOptionsLabel}: ${setupTitle}\n${copy.phone}: ${phone}\n${copy.email}: ${email}\n${copy.role}: ${roleTitle}`,
    );
    window.location.href = `mailto:support@vonix.am?subject=${subject}&body=${body}`;
  };

  return (
    <section className="business-auth-page">
      <aside className="business-auth-showcase">
        <BusinessRouteLink to="/business" navigate={navigate} className="business-auth-showcase-brand">
          <BusinessBrand />
        </BusinessRouteLink>
        <div className="business-auth-showcase-image">
          <img src="/Gemini_Generated_Image_fhncqsfhncqsfhnc.jpg" alt={copy.preview.dashboardImageAlt} />
          <span>{copy.preview.livePreview}</span>
        </div>
        <div className="business-auth-showcase-copy">
          <span className="business-eyebrow">{copy.eyebrow}</span>
          <h2>{flow.getStartedTitle}</h2>
          <p>{flow.getStartedBody}</p>
        </div>
        <div className="business-auth-context">
          <span>Yerevan, Armenia</span><i aria-hidden="true" />
          <span>+374</span><i aria-hidden="true" />
          <span>AMD</span>
        </div>
      </aside>
      <div className="business-auth-panel">
        <div className="business-auth-top">
          <BusinessRouteLink to="/business" navigate={navigate} className="business-auth-back-link">← {t.nav.business}</BusinessRouteLink>
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
                  <span>{story.jobTitle}</span>
                  <input autoComplete="organization-title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
                </label>
                <label>
                  <span>{copy.phone}</span>
                  <input required type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </label>
                <label>
                  <span>{copy.email}</span>
                  <input required type="email" autoComplete="email" dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label>
                  <span>{story.companySize}</span>
                  <select value={companySize} onChange={(event) => setCompanySize(event.target.value)}>
                    <option value="">{story.companySizePlaceholder}</option>
                    {story.companySizeOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                  </select>
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
