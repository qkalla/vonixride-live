import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";

type EarnKey = "drivers" | "couriers" | "restaurants" | "fleet";
const SUB: Record<EarnKey, Route> = { drivers: "/earn/drivers", couriers: "/earn/couriers", restaurants: "/earn/restaurants", fleet: "/earn/fleet" };

function mediaFrame(img: string, alt: string, cls = "aspect-1610") {
  return (
    <div className={`media-frame ${cls}`}>
      <img src={img} alt={alt} loading="lazy" />
    </div>
  );
}

export function EarnPage({ sub, navigate }: { sub?: EarnKey; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const e = t.earn;

  if (sub) {
    const g = e.groups[sub];
    return (
      <>
        <section className="page-hero">
          <div className="container">
            <Reveal>
              <a className="crumb" href="#/earn" onClick={(ev) => { ev.preventDefault(); navigate("/earn"); }}>← {e.title}</a>
              <h1 className="display">{e.pageTitles[sub]}</h1>
              <p className="page-sub">{e.pageSubs[sub]}</p>
            </Reveal>
          </div>
        </section>
        <section className="section" style={{ paddingTop: "2rem" }}>
          <div className="container detail-grid">
            <Reveal className="detail-visual">{mediaFrame(g.img, g.title)}</Reveal>
            <div>
              <h2 className="detail-h">{g.title}</h2>
              <p className="prose-p">{g.text}</p>
              <ul className="check-list">
                {e.howItems.map((it) => (
                  <li key={it.title}><span className="earn-check">✓</span><span><strong>{it.title}</strong> — {it.text}</span></li>
                ))}
              </ul>
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
                  <div className="media-frame aspect-43">{mediaFrameInner(g.img, g.title)}</div>
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

function mediaFrameInner(img: string, alt: string) {
  return <img src={img} alt={alt} loading="lazy" />;
}
