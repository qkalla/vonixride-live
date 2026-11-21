import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

export function HowPage() {
  const { t } = useLang();
  const h = t.howPage;
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <h1 className="display">{h.title}</h1>
            <p className="page-sub">{h.sub}</p>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container audience-grid">
          {h.groups.map((g) => (
            <Reveal className="audience-card" key={g.audience}>
              <h2 className="display audience-title">{g.audience}</h2>
              <ol className="audience-steps">
                {g.items.map((it) => (
                  <li key={it.title}>
                    <strong>{it.title}</strong>
                    <p>{it.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function GuidePage() {
  const { t } = useLang();
  const g = t.guidePage;
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <h1 className="display">{g.title}</h1>
            <p className="page-sub">{g.sub}</p>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container guide-grid">
          {g.articles.map((a) => (
            <Reveal className="guide-card" key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
