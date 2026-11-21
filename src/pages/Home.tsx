import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { BusinessPreview } from "../components/previews";
import { HeroOrderCard } from "../components/Estimator";
import { CheckIcon, AppleIcon, PlayIcon } from "../components/icons";
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
            <div className="hero-card hero-card-inline">
              <HeroOrderCard onOrder={() => navigate("/download")} />
            </div>
            <div className="hero-proof">
              <div className="proof-item"><div className="num">6+</div><div className="lbl">{h.proofRides}</div></div>
              <div className="proof-item"><div className="num">20+</div><div className="lbl">{h.proofCities}</div></div>
              <div className="proof-item"><div className="num">24/7</div><div className="lbl">{h.proofSupport}</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="media-frame aspect-1610 hero-photo">
              <img src="/ride.png" alt="Vonix ride" />
            </div>
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="strip-track">
          {[...t.strip, ...t.strip].map((item, i) => (
            <span className="strip-item" key={i}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>

      <section className="section section-alt" id="services">
        <div className="container">
          <SectionHead title={t.servicesPage.title} sub={t.servicesPage.sub} />
          <div className="svc-photo-grid">
            {[
              { img: "/ride.png", to: "/services/rides" as Route, meta: t.svcCards.items[0], fit: "cover" },
              { img: "/images/svc-food.jpg", to: "/services/orders" as Route, meta: t.svcCards.items[1], fit: "cover" },
              { img: "/images/svc-markets.jpg", to: "/services/orders" as Route, meta: t.svcCards.items[2], fit: "cover" },
              { img: "/delivery.png", to: "/services/courier" as Route, meta: t.svcCards.items[3], fit: "contain" },
            ].map((c) => (
              <a className="svc-photo-card reveal" key={c.img} href={`#${c.to}`} onClick={(e) => { e.preventDefault(); navigate(c.to); window.scrollTo({ top: 0 }); }}>
                <div className={`media-frame aspect-1610${c.fit === "contain" ? " fit-contain" : ""}`}><img src={c.img} alt={c.meta.title} loading="lazy" /></div>
                <div className="svc-photo-body">
                  <h3>{c.meta.title}</h3>
                  <p>{c.meta.text}</p>
                  <div className="svc-photo-foot">
                    <span className="svc-photo-meta">{c.meta.meta}</span>
                    <span className="svc-photo-cta">{t.servicesPage.cardCta} →</span>
                  </div>
                </div>
              </a>
            ))}
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

      <section className="brand-band">
        <div className="container brand-band-inner">
          <Reveal>
            <h2 className="display">{t.download.title}</h2>
            <p>{t.earn.sub}</p>
            <a className="btn btn-light" href="#/earn" onClick={(e) => { e.preventDefault(); navigate("/earn"); }}>Earn with Vonix →</a>
          </Reveal>
          <Reveal className="app-screen">
            <div className="app-screen-head"><span className="app-screen-dot" /><span className="app-screen-dot" /><span className="app-screen-dot" /></div>
            <div className="app-screen-route">
              <div className="asr-row"><span className="asr-pin asr-a" /><div><b>{t.hero.pickup}</b><small>Armenia St 12</small></div></div>
              <div className="asr-line" />
              <div className="asr-row"><span className="asr-pin asr-b" /><div><b>{t.hero.dropoff}</b><small>4.2 km · {t.hero.eta}</small></div></div>
            </div>
            <div className="asr-fare"><span>{t.hero.standard}</span><strong>1,240 ֏</strong></div>
            <div className="asr-cta">{t.est.continueInApp}</div>
          </Reveal>
        </div>
      </section>

      <section className="section earn-teaser">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="display">{t.earn.title}</h2>
            <p>{t.earn.sub}</p>
          </div>
          <div className="earn-strip">
            {(Object.keys(t.earn.groups) as (keyof typeof t.earn.groups)[]).map((k) => {
              const g = t.earn.groups[k];
              const to = { drivers: "/earn/drivers", couriers: "/earn/couriers", restaurants: "/earn/restaurants", fleet: "/earn/fleet" }[k] as Route;
              return (
                <a className="earn-tile reveal" key={k} href={`#${to}`} onClick={(e) => { e.preventDefault(); navigate(to); window.scrollTo({ top: 0 }); }}>
                  <div className="media-frame aspect-43"><img src={g.img} alt={g.title} loading="lazy" /></div>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="cities" style={{ paddingTop: 0 }}>
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
