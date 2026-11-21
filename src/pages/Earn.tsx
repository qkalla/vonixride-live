import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";
import { BusinessPreview } from "../components/previews";

type EarnKey = "drivers" | "couriers" | "restaurants" | "fleet";
const SUB: Record<EarnKey, Route> = { drivers: "/earn/drivers", couriers: "/earn/couriers", restaurants: "/earn/restaurants", fleet: "/earn/fleet" };

const EARN_BANNERS: Record<EarnKey, { img: string; contain?: boolean }> = {
  drivers: { img: "/ride.png" },
  couriers: { img: "/delivery.png", contain: true },
  restaurants: { img: "/images/food.jpg" },
  fleet: { img: "/cargo.png", contain: true },
};

export function EarnPage({ sub, navigate }: { sub?: EarnKey; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const e = t.earn;

  if (sub) {
    const g = e.groups[sub];
    const b = EARN_BANNERS[sub];
    return (
      <>
        <section className={`svc-banner${b.contain ? " svc-banner-contain" : ""}`}>
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
            return (
              <Reveal className="earn-card" key={k}>
                <a href={`#${SUB[k]}`} onClick={(ev) => { ev.preventDefault(); navigate(SUB[k]); window.scrollTo({ top: 0 }); }} className="earn-card-link">
                  <div className="media-frame aspect-43 fit-contain">{g.img === "dashboard" ? <BusinessPreview /> : <img src={g.img} alt={g.title} loading="lazy" />}</div>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <span className="earn-more">{e.cta} →</span>
                </a>
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

