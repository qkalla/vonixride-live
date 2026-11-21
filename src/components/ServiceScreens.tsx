import { useLang } from "../i18n";

function Frame({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mscreen">
      <div className="mscreen-head">
        <span className="mscreen-badge" style={{ background: accent }} />
        <b>{title}</b>
        <span className="mscreen-loc">Yerevan</span>
      </div>
      {children}
    </div>
  );
}

export function RideScreen() {
  const { t } = useLang();
  const e = t.est;
  const rows: [string, string, string][] = [
    [e.rideClasses[0], "4 min", "1,240 ֏"],
    [e.rideClasses[1], "5 min", "1,680 ֏"],
    [e.rideClasses[2], "6 min", "2,050 ֏"],
  ];
  return (
    <Frame title="Vonix Rides" accent="#0066FF">
      <div className="mscreen-field"><span className="dot-blue" />{e.locs.kentron} <em>→</em> {e.locs.airport}</div>
      <div className="mscreen-rows">
        {rows.map(([n, eta, price]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{eta}</small></div>
            <strong>{price}</strong>
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
  const items: [string, string, string][] = [
    ["Khachapuri", "Adjarian", "1,200 ֏"],
    ["Lavash wrap", "Chicken", "900 ֏"],
    ["Dolma plate", "Family", "1,500 ֏"],
  ];
  return (
    <Frame title="Vonix Meals" accent="#E8590C">
      <div className="mscreen-chips">
        {cats.map((c, i) => <span key={c} className={i === 0 ? "on food" : ""}>{c}</span>)}
      </div>
      <div className="mscreen-rows">
        {items.map(([n, tag, p]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{tag}</small></div>
            <strong>{p}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta food">{e.orderFood}</div>
    </Frame>
  );
}

export function MarketScreen() {
  const { t } = useLang();
  const e = t.est;
  const cats: [string, string, string][] = [
    [e.orderCats[1], "Yerevan", "3,000 ֏"],
    [e.orderCats[2], "Licensed", "1,500 ֏"],
    ["Beauty & care", "Same-day", "2,000 ֏"],
  ];
  return (
    <Frame title="Vonix Market" accent="#2F9E44">
      <div className="mscreen-rows">
        {cats.map(([n, tag, p]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{tag} · {e.modes.order}</small></div>
            <strong>{p}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta market">{e.orderFood}</div>
    </Frame>
  );
}

export function CourierScreen() {
  const { t } = useLang();
  const e = t.est;
  const rows: [string, string, string][] = [
    ["Documents", "A4 envelope", "450 ֏"],
    ["Small parcel", "Up to 5 kg", "650 ֏"],
    ["Fragile", "Careful handling", "900 ֏"],
  ];
  return (
    <Frame title="Vonix Express" accent="#0066FF">
      <div className="mscreen-field"><span className="dot-blue" />{e.locs.kentron} <em>→</em> {e.locs.northern}</div>
      <div className="mscreen-rows">
        {rows.map(([n, tag, p]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{tag}</small></div>
            <strong>{p}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta">{e.sendParcel}</div>
    </Frame>
  );
}

export function CargoScreen() {
  const { t } = useLang();
  const e = t.est;
  const rows = e.cargoClasses.map((c, i) => [c, ["Up to 500 kg", "Up to 1.2 t", "Up to 3.5 t"][i] ?? "", String([2500, 4000, 6200][i]) + " ֏"] as [string, string, string]);
  return (
    <Frame title="Vonix Cargo" accent="#0B0B0F">
      <div className="mscreen-field"><span className="dot-blue" />{e.locs.yerevanMall} <em>→</em> {e.locs.gyumri}</div>
      <div className="mscreen-rows">
        {rows.map(([n, tag, p]) => (
          <div className="mscreen-row" key={n}>
            <div><b>{n}</b><small>{tag}</small></div>
            <strong>{p}</strong>
          </div>
        ))}
      </div>
      <div className="mscreen-cta">{e.getQuote}</div>
    </Frame>
  );
}
