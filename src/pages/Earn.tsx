import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";

type EarnKey = "drivers" | "couriers" | "restaurants" | "fleet";
const SUB: Record<EarnKey, Route> = { drivers: "/earn/drivers", couriers: "/earn/couriers", restaurants: "/earn/restaurants", fleet: "/earn/fleet" };

const EARN_BANNERS: Record<EarnKey, { img: string; light?: boolean }> = {
  drivers: { img: "/ride.png" },
  couriers: { img: "/delivery.png", light: true },
  restaurants: { img: "/images/food.jpg" },
  fleet: { img: "/cargo.png", light: true },
};

const EARN_VISUALS: Record<EarnKey, { img: string; tint: string; fit: "art" | "photo" }> = {
  drivers: { img: "/ride.png", tint: "tint-ride", fit: "photo" },
  couriers: { img: "/delivery.png", tint: "tint-neutral", fit: "art" },
  restaurants: { img: "/images/market.jpg", tint: "tint-market", fit: "photo" },
  fleet: { img: "/cargo.png", tint: "tint-neutral", fit: "art" },
};

export function EarnPage({ sub, navigate }: { sub?: EarnKey; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const e = t.earn;

  if (sub) {
    const g = e.groups[sub];
    const b = EARN_BANNERS[sub];
    const pg = t.earnPages[sub];
    return (
      <>
        <section className={`svc-banner${b.light ? " svc-banner-light" : ""}`}>
          <img className="svc-banner-bg" src={b.img} alt={g.title} />
          <div className="svc-banner-scrim" />
          <div className="container svc-banner-inner">
            <Reveal>
              <a className="crumb" href="#/earn" onClick={(ev) => { ev.preventDefault(); navigate("/earn"); }}>← {e.title}</a>
              <h1 className="display">{e.pageTitles[sub]}</h1>
              <p className="page-sub">{e.pageSubs[sub]}</p>
              <a className="btn btn-light" href="#/download" onClick={(ev) => { ev.preventDefault(); navigate("/download"); window.scrollTo({ top: 0 }); }}>{e.cta}</a>
            </Reveal>
          </div>
        </section>
        <section className="section stats-sec">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="display">{t.pageBits.earnNumbersTitle}</h2>
            </div>
            <div className="stat-strip">
              {pg.stats.map((s) => (
                <Reveal className="stat-item" key={s.l}>
                  <div className="stat-v">{s.v}</div>
                  <div className="stat-l">{s.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="display">{e.howTitle}</h2>
            </div>
            <p className="prose-p reveal" style={{ maxWidth: 720 }}>{g.text}</p>
            <div className="steps" style={{ marginTop: 40 }}>
              {e.howItems.map((it, i) => (
                <div className="step reveal" key={it.title}>
                  <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-alt">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="display">{t.pageBits.perksTitle}</h2>
            </div>
            <div className="svc-points">
              {pg.perks.map((x) => (
                <Reveal className="svc-point" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="display">{t.pageBits.reqsTitle}</h2>
            </div>
            <div className="svc-points">
              {pg.reqs.map((x) => (
                <Reveal className="svc-point" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </Reveal>
              ))}
            </div>
            <div className="hero-actions reveal" style={{ marginTop: 40 }}>
              <a className="btn btn-primary" href="#/download" onClick={(ev) => { ev.preventDefault(); navigate("/download"); window.scrollTo({ top: 0 }); }}>{t.pageBits.ctaEarn}</a>
              <a className="btn btn-ghost" href="#/business" onClick={(ev) => { ev.preventDefault(); navigate("/business"); window.scrollTo({ top: 0 }); }}>{t.nav.business}</a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <h1 className="display">{e.title}</h1>
            <p className="page-sub">{e.sub}</p>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container earn-grid">
          {(Object.keys(e.groups) as EarnKey[]).map((k) => {
            const g = e.groups[k];
            const v = EARN_VISUALS[k];
            return (
              <Reveal className="earn-card" key={k}>
                <a className={`earn-card-visual ${v.tint}`} href={`#${SUB[k]}`} onClick={(ev) => { ev.preventDefault(); navigate(SUB[k]); window.scrollTo({ top: 0 }); }} aria-label={g.title}>
                  <img className={v.fit} src={v.img} alt={g.title} loading="lazy" />
                </a>
                <div className="earn-card-body">
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <a className="earn-card-cta" href={`#${SUB[k]}`} onClick={(ev) => { ev.preventDefault(); navigate(SUB[k]); window.scrollTo({ top: 0 }); }}>{e.cta} →</a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="section section-alt" style={{ paddingTop: "70px", paddingBottom: "90px" }}>
        <div className="container">
          <div className="section-head reveal"><h2 className="display">{e.howTitle}</h2></div>
          <div className="steps">
            {e.howItems.map((it, i) => (
              <div className="step reveal" key={it.title}>
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

