import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";

export function FoodHubPage({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useLang();
  const f = t.foodHub;
  const [q, setQ] = useState("");

  const dishes = useMemo(() => {
    const query = q.trim().toLowerCase();
    return f.dishes.filter((d) => !query || d.title.toLowerCase().includes(query) || d.text.toLowerCase().includes(query));
  }, [q, f.dishes]);

  const goOrders = () => { navigate("/services/orders"); window.scrollTo({ top: 0 }); };

  return (
    <>
      <section className="svc-banner">
        <img className="svc-banner-bg" src="/images/food.jpg" alt={f.title} />
        <div className="svc-banner-scrim" />
        <div className="container svc-banner-inner">
          <Reveal>
            <a className="crumb" href="#/services" onClick={(e) => { e.preventDefault(); navigate("/services"); }}>← {t.nav.services}</a>
            <h1 className="display">{f.title}</h1>
            <p className="page-sub">{f.sub}</p>
            <button className="btn btn-light" onClick={goOrders}>{f.cta}</button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="food-intro">
            <div className="food-intro-art">
              <img src="/art-2.png" alt="" />
            </div>
            <div>
              <h2 className="display">{f.introTitle}</h2>
              <p className="prose-p">{f.introText}</p>
              <div className="food-search">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={f.search}
                  aria-label={f.search}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal"><h2 className="display">{f.categoriesTitle}</h2></div>
          <div className="svc-points">
            {f.cats.map((c) => (
              <Reveal className="svc-point cat-card" key={c.title}>
                <div className="cat-thumb"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <button className="svc-card-cta" onClick={goOrders}>{f.cta} →</button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal"><h2 className="display">{f.popularTitle}</h2></div>
          <div className="popular-chips reveal">
            {f.popular.map((p) => (
              <button key={p} className="popular-chip" onClick={() => setQ(p)}>{p}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal"><h2 className="display">{f.dishesTitle}</h2></div>
          <div className="dish-grid">
            {dishes.map((d) => (
              <Reveal className="dish-card" key={d.title}>
                <div className="dish-thumb"><img src={d.img} alt={d.title} loading="lazy" /></div>
                <div className="dish-body">
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                  <div className="dish-foot">
                    <strong>{d.price}</strong>
                    <button className="svc-card-cta" onClick={goOrders}>{f.cta}</button>
                  </div>
                </div>
              </Reveal>
            ))}
            {dishes.length === 0 && <p className="page-note">{f.search}: “{q}”</p>}
          </div>
        </div>
      </section>
    </>
  );
}
