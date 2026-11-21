import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";

type EarnKey = "drivers" | "couriers" | "restaurants" | "fleet";
const SUB: Record<EarnKey, Route> = { drivers: "/earn/drivers", couriers: "/earn/couriers", restaurants: "/earn/restaurants", fleet: "/earn/fleet" };

const EARN_BANNERS: Record<EarnKey, { img: string; tint: string }> = {
  drivers: { img: "/cab.png", tint: "tint-ride" },
  couriers: { img: "/deliervy.png", tint: "tint-moped" },
  restaurants: { img: "/grocery.png", tint: "tint-market" },
  fleet: { img: "/cargoo.png", tint: "tint-cargo" },
};

const EARN_VISUALS: Record<EarnKey, { img: string; tint: string; fit: "art" | "photo" }> = {
  drivers: { img: "/cab.png", tint: "tint-ride", fit: "art" },
  couriers: { img: "/deliervy.png", tint: "tint-moped", fit: "art" },
  restaurants: { img: "/grocery.png", tint: "tint-market", fit: "art" },
  fleet: { img: "/cargoo.png", tint: "tint-cargo", fit: "art" },
};

export function EarnPage({ sub, navigate }: { sub?: EarnKey; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const e = t.earn;

  if (sub) {
    const g = e.groups[sub];
    const b = EARN_BANNERS[sub];
    return (
      <>
        <section className="svc-banner">
          <div className={`svc-banner-tint ${b.tint}`} />
          <img className="svc-banner-bg contain" src={b.img} alt={g.title} />
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

