import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { CheckIcon } from "../components/icons";
import { Estimator } from "../components/Estimator";
import { CourierScreen } from "../components/ServiceScreens";
import type { Route } from "../router";

type SvcKey = "rides" | "courier" | "cargo" | "orders";
const MODE_MAP: Record<SvcKey, "ride" | "courier" | "cargo" | "order"> = { rides: "ride", courier: "courier", cargo: "cargo", orders: "order" };

/* Landing cards use cab/food.jpg/grocery/deliervy/cargoo — banners use different assets */
const BANNERS: Record<SvcKey, { img: string | null; tint: string }> = {
  rides: { img: "/ride.png", tint: "tint-ride" },
  courier: { img: null, tint: "tint-moped" },
  cargo: { img: "/cargo.png", tint: "tint-cargo" },
  orders: { img: "/images/market.jpg", tint: "tint-market" },
};

export function ServiceDetailPage({ svc, navigate }: { svc: SvcKey; navigate: (r: Route) => void }) {
  const { t } = useLang();
  const p = t.svcPages[svc];
  const banner = BANNERS[svc];
  return (
    <>
      <section className={`svc-banner${banner.img ? "" : " svc-banner-ui"}`}>
        {banner.img && <img className="svc-banner-bg" src={banner.img} alt={p.imgAlt} />}
        {!banner.img && <div className={`svc-banner-tint ${banner.tint}`} />}
        <div className="svc-banner-scrim" />
        <div className="container svc-banner-inner">
          <Reveal>
            <a className="crumb" href="#/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }}>← {t.nav.services}</a>
            <h1 className="display">{p.title}</h1>
            <p className="page-sub">{p.sub}</p>
            <a className="btn btn-light" href="#download" onClick={(e) => { e.preventDefault(); navigate("/"); setTimeout(() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" }), 80); }}>{p.cta}</a>
          </Reveal>
        </div>
        {svc === "courier" && (
          <div className="svc-banner-screen">
            <CourierScreen />
          </div>
        )}
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <h2 className="display">{p.points[0].title}</h2>
          </div>
          <div className="svc-points">
            {p.points.map((pt) => (
              <Reveal className="svc-point" key={pt.title}>
                <span className="svc-point-ic"><CheckIcon /></span>
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt est-inline">
        <div className="container">
          <Estimator mode={MODE_MAP[svc]} onOrder={() => navigate("/download")} />
        </div>
      </section>

      <section className="section">
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
