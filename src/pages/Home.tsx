import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { RidePreview, BusinessPreview } from "../components/previews";
import { Estimator } from "../components/Estimator";
import { ServiceIcon, CheckIcon, AppleIcon, PlayIcon, type IconName } from "../components/icons";
import type { Route } from "../router";


function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="section-head reveal">
      <h2 className="display">{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function HomePage({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useLang();
  const h = t.hero;

  const goDownload = () => {
    navigate("/");
    setTimeout(() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <>
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <h1 className="display">
              {h.line1} <span className="accent">{h.accent}</span> {h.line2}
            </h1>
            <p className="hero-sub">{h.sub}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={goDownload}>{h.primary}</button>
              <a className="btn btn-ghost" href="#/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }}>{h.secondary}</a>
            </div>
            <div className="hero-proof">
              <div className="proof-item"><div className="num">6+</div><div className="lbl">{h.proofRides}</div></div>
              <div className="proof-item"><div className="num">20+</div><div className="lbl">{h.proofCities}</div></div>
              <div className="proof-item"><div className="num">24/7</div><div className="lbl">{h.proofSupport}</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <RidePreview />
            <div className="float-chip" style={{ top: "6%", insetInlineEnd: "4%", animationDelay: "0.6s" }}>
              <span className="dot" /> {h.driver}
            </div>
            <div className="float-chip" style={{ bottom: "14%", insetInlineStart: "2%", animationDelay: "1.4s" }}>
              <span className="dot" style={{ background: "#0066FF" }} /> {h.fare}
            </div>
          </div>
        </div>
      </section>

      <section className="est-hero">
        <div className="container">
          <Estimator onOrder={() => navigate("/download")} />
        </div>
      </section>

      <div className="strip">
        <div className="strip-track">
          {[...t.strip, ...t.strip].map((item, i) => (
            <span className="strip-item" key={i}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>

      <section className="section" id="services">
        <div className="container">
          <SectionHead title={t.servicesPage.title} sub={t.servicesPage.sub} />
          <div className="services-grid">
            {(["ride", "food", "grocery", "pharmacy", "cargo", "moped"] as const).map((key) => {
              const s = t.svc[key];
              const to: Route = key === "ride" ? "/services/rides" : key === "cargo" ? "/services/cargo" : key === "moped" ? "/services/courier" : "/services/orders";
              return (
                <a className="service-card reveal svc-link" key={key} href={`#${to}`} onClick={(e) => { e.preventDefault(); navigate(to); window.scrollTo({ top: 0 }); }}>
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

      <section className="section" id="how" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title={t.steps.title} />
          <div className="steps">
            {t.steps.items.map((s, i) => (
              <div className="step reveal" key={s.title}>
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="business" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="reveal">
            <h2 className="display">{t.business.title}</h2>
            <p>{t.business.sub}</p>
            <ul className="check-list">
              {t.business.checks.map((c) => (
                <li key={c.title}><CheckIcon /><span><strong>{c.title}</strong> — {c.text}</span></li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#/business" onClick={(e) => { e.preventDefault(); navigate("/business"); window.scrollTo({ top: 0 }); }}>{t.business.cta}</a>
              <a className="btn btn-ghost" href="#/business" onClick={(e) => { e.preventDefault(); navigate("/business"); }}>{t.nav.business}</a>
            </div>
          </div>
          <div className="biz-wrap reveal"><BusinessPreview /></div>
        </div>
      </section>

      <section className="section" id="cities" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead title={t.cities.title} sub={t.cities.sub} />
          <div className="cities">
            {t.cities.list.map((city) => (
              <span className="city-chip reveal" key={city}><span className="pulse" />{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section download" id="download">
        <Reveal className="container dl-inner">
          <h2 className="display">{t.download.title}</h2>
          <p>{t.download.sub}</p>
          <div className="store-btns">
            <a className="store-btn" href="#download">
              <AppleIcon />
              <span><small>{t.download.ios}</small><strong>{t.download.iosName}</strong></span>
            </a>
            <a className="store-btn" href="#download">
              <PlayIcon />
              <span><small>{t.download.android}</small><strong>{t.download.androidName}</strong></span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
