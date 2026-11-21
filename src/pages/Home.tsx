import { useRef } from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { BusinessPreview } from "../components/previews";
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
  const carRef = useRef<HTMLDivElement>(null);
  const scrollCar = (dir: number) => carRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  const CARDS: { to: Route; img: string }[] = [
    { to: "/services/rides", img: "/card-cab.png" },
    { to: "/services/orders", img: "/images/food.jpg" },
    { to: "/services/orders", img: "/card-grocery.png" },
    { to: "/services/courier", img: "/card-deliervy.png" },
    { to: "/services/cargo", img: "/card-cargoo.png" },
  ];

  const goDownload = () => {
    navigate("/");
    setTimeout(() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <>
      <section className="hero hero-wide" id="top">
        <div className="container">
          <div className="hero-copy">
            <h1 className="display">
              {h.line1} <span className="accent">{h.accent}</span> {h.line2}
            </h1>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={goDownload}>{h.primary}</button>
              <a className="btn btn-ghost" href="#/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }}>{h.secondary}</a>
            </div>
          </div>
        </div>
        <div className="hero-band">
          <img src="/ride.png" alt="Vonix ride" />
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
          <div className="svc-carousel-wrap">
            <div className="svc-carousel" ref={carRef}>
              {CARDS.map((c, i) => {
                const meta = t.svcShowcase[i];
                return (
                  <a className="svc-tall svc-tall-photo reveal" key={meta.title} href={`#${c.to}`} onClick={(e) => { e.preventDefault(); navigate(c.to); window.scrollTo({ top: 0 }); }}>
                    <div className="svc-tall-bg">
                      <img className="cover" src={c.img} alt={meta.title} loading="lazy" />
                    </div>
                    <div className="svc-tall-scrim" />
                    <div className="svc-tall-top">
                      <h3>{meta.title}</h3>
                      <p>{meta.sub}</p>
                      <span className="svc-tall-pill">{meta.cta}</span>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="svc-carousel-nav">
              <button type="button" aria-label="Previous" onClick={() => scrollCar(-1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></button>
              <button type="button" aria-label="Next" onClick={() => scrollCar(1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
            </div>
          </div>
        </div>
      </section>


      <section className="brand-band">
        <div className="container brand-band-inner">
          <Reveal>
            <h2 className="display">{t.download.title}</h2>
            <p>{t.earn.sub}</p>
            <a className="btn btn-light" href="#/earn" onClick={(e) => { e.preventDefault(); navigate("/earn"); }}>Earn with Vonix →</a>
          </Reveal>
        </div>
        <div className="brand-phone-wrap">
          <img className="brand-phone" src="/app-phone.png" alt="Vonix app" />
        </div>
      </section>
      <section className="section earn-blocks-sec" id="earn">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="display">{t.earn.title}</h2>
            <p>{t.earn.sub}</p>
          </div>
          <div className="earn-blocks">
            {(Object.keys(t.earn.groups) as (keyof typeof t.earn.groups)[]).map((k) => {
              const g = t.earn.groups[k];
              const to = ({ drivers: "/earn/drivers", couriers: "/earn/couriers", restaurants: "/earn/restaurants", fleet: "/earn/fleet" } as Record<string, Route>)[k];
              return (
                <a className="earn-block reveal" key={k} href={`#${to}`} onClick={(e) => { e.preventDefault(); navigate(to); window.scrollTo({ top: 0 }); }}>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <span className="earn-block-link">{t.earn.cta} →</span>
                </a>
              );
            })}
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
