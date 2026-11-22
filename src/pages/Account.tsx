import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";

export function AccountPage({ navigate }: { navigate: (r: Route) => void }) {
  const { t } = useLang();
  const a = t.account;
  const go = (r: Route) => { navigate(r); window.scrollTo({ top: 0 }); };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <h1 className="display">{a.title}</h1>
            <p className="page-sub">{a.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container acct-grid">
          <div>
            <Reveal className="acct-card">
              <div className="acct-avatar">{a.name.split(" ").map((w) => w[0]).join("")}</div>
              <div>
                <h2>{a.name}</h2>
                <p className="acct-meta">{a.phone} · {a.memberSince}</p>
              </div>
              <button className="btn btn-ghost acct-edit">{a.edit}</button>
            </Reveal>

            <Reveal className="acct-card">
              <h3 className="acct-h">{a.paymentsTitle}</h3>
              {a.payments.map((p) => (
                <div className="acct-row" key={p.name}>
                  <div><strong>{p.name}</strong><span>{p.detail}</span></div>
                  {p.primary && <em className="acct-badge">Primary</em>}
                </div>
              ))}
            </Reveal>

            <Reveal className="acct-card">
              <h3 className="acct-h">{a.placesTitle}</h3>
              {a.places.map((p) => <div className="acct-row" key={p}><span className="acct-pin">📍</span><span>{p}</span></div>)}
            </Reveal>

            <Reveal className="acct-card">
              <h3 className="acct-h">{a.promosTitle}</h3>
              {a.promos.map((p) => <div className="acct-row promo" key={p}><strong>{p.split(" — ")[0]}</strong><span>{p.split(" — ")[1]}</span></div>)}
            </Reveal>
          </div>

          <div>
            <Reveal className="acct-card">
              <h3 className="acct-h">{a.safetyTitle}</h3>
              <div className="svc-points">
                {a.safety.map((s) => (
                  <div className="svc-point" key={s.title}>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="acct-card">
              <h3 className="acct-h">{a.rolesTitle}</h3>
              <p className="acct-meta" style={{ marginBottom: 14 }}>{a.rolesSub}</p>
              <div className="acct-roles">
                {a.roles.map((r) => (
                  <button key={r.title} className="acct-role" onClick={() => go(r.to as Route)}>
                    <strong>{r.title}</strong>
                    <span>{r.text}</span>
                    <em>→</em>
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => go("/join")}>{a.joinCta}</button>
            </Reveal>

            <Reveal className="acct-card">
              <button className="btn btn-ghost" style={{ width: "100%" }}>{a.signOut}</button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
