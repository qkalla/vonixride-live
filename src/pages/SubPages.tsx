import { useState } from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { ServiceIcon, CheckIcon, type IconName } from "../components/icons";
import { BusinessPreview } from "../components/previews";

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
          <div className="services-grid">
            {KEYS.map((key) => {
              const s = t.svc[key];
              return (
                <a className="service-card reveal svc-link" key={key} href={`#${DETAIL[key]}`} onClick={(e) => { e.preventDefault(); navigate?.(DETAIL[key] as never); window.scrollTo({ top: 0 }); }}>
                  <div className="service-icon"><ServiceIcon name={key as IconName} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="service-tag">{s.tag} →</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function BusinessPage() {
  const { t } = useLang();
  const b = t.pages.businessPage;
  return (
    <>
      <PageHero title={b.title} sub={b.sub} />
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container split">
          <Reveal>
            <ul className="check-list">
              {t.business.checks.map((c) => (
                <li key={c.title}><CheckIcon /><span><strong>{c.title}</strong> — {c.text}</span></li>
              ))}
            </ul>
            <div className="hero-actions" id="partners">
              <a className="btn btn-primary" href="#partners" onClick={(e) => { e.preventDefault(); document.getElementById("partners")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{b.portal}</a>
            </div>
            <p className="page-note">{b.note}</p>
            <h3 className="biz-pillars-h">{t.bizDeep.pillarsTitle}</h3>
            <div className="pillar-grid">
              {t.bizDeep.pillars.map((p) => (
                <div className="pillar-card reveal" key={p.title}><strong>{p.title}</strong><p>{p.text}</p></div>
              ))}
            </div>
            <h3 className="biz-pillars-h">{t.bizDeep.stepsTitle}</h3>
            <div className="steps">
              {t.bizDeep.steps.map((st, i) => (
                <div className="step reveal" key={st.title}><div className="step-num">{String(i + 1).padStart(2, "0")}</div><h3>{st.title}</h3><p>{st.text}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal><div className="biz-wrap"><BusinessPreview /></div></Reveal>
        </div>
      </section>
    </>
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
          <Reveal className="cities-hero-img">
            <div className="media-frame aspect-1610"><img src="/images/cities-hero.jpg" alt="Yerevan cityscape" loading="lazy" /></div>
          </Reveal>
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
