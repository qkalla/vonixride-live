import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { CheckIcon } from "../components/icons";
import { Estimator } from "../components/Estimator";
import type { Route } from "../router";

type SvcKey = "rides" | "courier" | "cargo" | "orders";
const MODE_MAP: Record<SvcKey, "ride" | "courier" | "cargo" | "order"> = { rides: "ride", courier: "courier", cargo: "cargo", orders: "order" };

export const SVC_IMAGES: Record<SvcKey, string> = {
  rides: "/images/svc-ride.jpg",
  courier: "/images/svc-moped.jpg",
  cargo: "/images/svc-cargo.jpg",
  orders: "/images/svc-food.jpg",
};

export function ServiceDetailPage({ svc, navigate }: { svc: SvcKey; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const p = t.svcPages[svc];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <a className="crumb" href="#/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }}>← {t.nav.services}</a>
            <h1 className="display">{p.title}</h1>
            <p className="page-sub">{p.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container detail-grid">
          <Reveal className="detail-visual">
            <div className="media-frame aspect-1610">
              <img src={p.img} alt={p.imgAlt} loading="lazy" />
            </div>
          </Reveal>
          <div>
            <h2 className="detail-h">{p.points[0].title}</h2>
            <ul className="check-list">
              {p.points.map((pt) => (
                <li key={pt.title}><CheckIcon /><span><strong>{pt.title}</strong> — {pt.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section est-inline">
        <div className="container">
          <Estimator mode={MODE_MAP[svc]} onOrder={() => navigate("/download")} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <h2 className="display">{t.howPage.title}</h2>
          </div>
          <div className="steps">
            {p.steps.map((s, i) => (
              <div className="step reveal" key={s.title}>
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="hero-actions reveal" style={{ marginTop: 44 }}>
            <a className="btn btn-primary" href="#download" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" }), 80); }}>{p.cta}</a>
            <a className="btn btn-ghost" href="#/how-it-works" onClick={(e) => { e.preventDefault(); navigate("/how-it-works"); }}>{t.nav.how}</a>
          </div>
        </div>
      </section>
    </>
  );
}
