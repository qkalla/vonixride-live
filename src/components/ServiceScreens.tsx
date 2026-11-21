import { useLang } from "../i18n";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mscreen">
      <div className="mscreen-head">
        <img src="/logo.png" alt="Vonix" width={20} height={20} />
        <b>Vonix</b>
        <span className="mscreen-loc">Yerevan</span>
      </div>
      {children}
    </div>
  );
}

export function RideScreen() {
  const { t } = useLang();
  const e = t.est;
  const rows: [string, string][] = [
    [e.rideClasses[0], "1,240 ֏ · 4 min"],
    [e.rideClasses[1], "1,680 ֏ · 5 min"],
    [e.rideClasses[2], "2,050 ֏ · 6 min"],
  ];
  return (
    <Frame>
      <div className="mscreen-field"><span className="dot-blue" />{e.locs.kentron} <em>→</em> {e.locs.airport}</div>
      <div className="mscreen-rows">
        {rows.map(([n, meta]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{meta.split("·")[1]}</small></div>
            <strong>{meta.split("·")[0].trim()}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta">{e.continueInApp}</div>
    </Frame>
  );
}

export function FoodScreen() {
  const { t } = useLang();
  const e = t.est;
  const cats = ["Restaurant", "Cafe", "Bakery", "Sushi", "Fast food"];
  const items: [string, string][] = [
    ["Khachapuri", "1,200 ֏"],
    ["Lavash wrap", "900 ֏"],
    ["Dolma plate", "1,500 ֏"],
  ];
  return (
    <Frame>
      <div className="mscreen-chips">
        {cats.map((c, i) => <span key={c} className={i === 0 ? "on" : ""}>{c}</span>)}
      </div>
      <div className="mscreen-rows">
        {items.map(([n, p]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{e.orderCats[0]}</small></div>
            <strong>{p}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta">{e.orderFood}</div>
    </Frame>
  );
}

export function MarketScreen() {
  const { t } = useLang();
  const e = t.est;
  const cats: [string, string][] = [
    [e.orderCats[1], "From 3,000 ֏"],
    [e.orderCats[2], "From 1,500 ֏"],
    ["Beauty & care", "From 2,000 ֏"],
  ];
  return (
    <Frame>
      <div className="mscreen-rows">
        {cats.map(([n, p]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>Yerevan · {e.modes.order}</small></div>
            <strong>{p}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta">{e.orderFood}</div>
    </Frame>
  );
}
