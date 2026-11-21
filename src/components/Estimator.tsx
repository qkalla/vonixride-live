import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../i18n";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export interface OrderDraft {
  mode: "ride" | "courier" | "cargo" | "order";
  service: string;
  from: string;
  to: string;
  km: number;
  min: number;
  priceAmd: number;
}

export const ORDER_KEY = "vonix.order.v1";

export function saveOrder(d: OrderDraft) {
  try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(d)); } catch {}
}
export function loadOrder(): OrderDraft | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as OrderDraft) : null;
  } catch { return null; }
}

export const LOCS: Record<string, [number, number]> = {
  airport: [40.1473, 44.3959],
  republic: [40.1792, 44.4991],
  northern: [40.1900, 44.5120],
  cascade: [40.1885, 44.5080],
  dalma: [40.1760, 44.5200],
  yerevanMall: [40.1680, 44.4950],
  komitas: [40.1850, 44.4750],
  arabkir: [40.2400, 44.5100],
  gyumri: [40.7950, 43.8500],
  dilijan: [40.8100, 44.8800],
  sevan: [40.1800, 45.1200],
  kentron: [40.1790, 44.5030],
};

export const YEREVAN: [number, number] = [40.1872, 44.5152];

type Mode = OrderDraft["mode"];

export function fare(mode: Mode, cls: number, km: number, min: number): number {
  if (mode === "ride") {
    const mult = [1, 1.35, 1.7, 2.1][cls] ?? 1;
    return Math.round((400 + km * 180 + min * 12) * mult);
  }
  if (mode === "courier") return Math.round(300 + km * 120 + min * 3);
  if (mode === "cargo") {
    const base = [2500, 4000, 6200][cls] ?? 2500;
    const per = [280, 420, 580][cls] ?? 280;
    return Math.round(base + km * per);
  }
  return Math.round(250 + km * 40); // order delivery fee estimate
}

interface RouteResult { km: number; min: number; coords: [number, number][] }

export async function fetchRoute(a: [number, number], b: [number, number]): Promise<RouteResult | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const json = await res.json();
    const r = json?.routes?.[0];
    if (!r) return null;
    return {
      km: r.distance / 1000,
      min: Math.max(3, Math.round(r.duration / 60)),
      coords: (r.geometry.coordinates as [number, number][]).map(([x, y]) => [y, x] as [number, number]),
    };
  } catch {
    return null;
  }
}

function haversineKm(a: [number, number], b: [number, number]) {
  const R = 6371, dLat = (b[0] - a[0]) * Math.PI / 180, dLon = (b[1] - a[1]) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function Estimator({ mode, onOrder }: { mode?: Mode; onOrder?: (d: OrderDraft) => void }) {
  const { t } = useLang();
  const e = t.est;
  const [m, setM] = useState<Mode>(mode ?? "ride");
  const [fromKey, setFromKey] = useState("kentron");
  const [toKey, setToKey] = useState("airport");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [cls, setCls] = useState(0);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const lineRef = useRef<L.Polyline | null>(null);

  const fromCoord: [number, number] = customFrom.trim() ? YEREVAN : (LOCS[fromKey] ?? YEREVAN);
  const toCoord: [number, number] = customTo.trim() ? [40.1872 + parseFloat(customTo) / 1000, 44.5152] : (LOCS[toKey] ?? YEREVAN);

  const locName = (key: string, custom: string) => custom.trim() || e.locs[key as keyof typeof e.locs] || key;

  useEffect(() => {
    if (!mapRef.current || mapObj.current) return;
    const map = L.map(mapRef.current, { zoomControl: true, attributionControl: true }).setView(YEREVAN, 11);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
    mapObj.current = map;
    return () => { map.remove(); mapObj.current = null; };
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    const a: [number, number] = customFrom.trim() ? [40.18, 44.50] : fromCoord;
    const b: [number, number] = customTo.trim() ? [40.20, 44.53] : toCoord;
    fetchRoute(a, b).then((r) => {
      if (!alive) return;
      if (r) setRoute(r);
      else {
        const km = haversineKm(fromCoord, toCoord) * 1.35;
        setRoute({ km, min: Math.max(5, Math.round(km * 3)), coords: [[...fromCoord], [...toCoord]] });
      }
      setLoading(false);
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromKey, toKey, customFrom, customTo]);

  useEffect(() => {
    const map = mapObj.current;
    if (!map || !route) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (lineRef.current) { lineRef.current.remove(); lineRef.current = null; }
    const mk = (c: [number, number], color: string) => {
      const icon = L.divIcon({ className: "est-pin", html: `<span style="background:${color}"></span>`, iconSize: [16, 16], iconAnchor: [8, 8] });
      return L.marker(c, { icon }).addTo(map);
    };
    markersRef.current.push(mk(fromCoord, "#0066FF"), mk(toCoord, "#0B0B0F"));
    lineRef.current = L.polyline(route.coords, { color: "#0066FF", weight: 4, opacity: 0.85 }).addTo(map);
    map.fitBounds(L.latLngBounds([fromCoord, toCoord]).pad(0.25));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, fromKey, toKey, customFrom, customTo]);

  const km = route?.km ?? 0;
  const min = route?.min ?? 0;
  const price = useMemo(() => fare(m, cls, km, min), [m, cls, km, min]);
  const classes = m === "ride" ? e.rideClasses : m === "cargo" ? e.cargoClasses : null;

  const ctaLabel = m === "ride" ? e.requestRide : m === "courier" ? e.sendParcel : m === "cargo" ? e.getQuote : e.orderFood;

  const submit = () => {
    const draft: OrderDraft = {
      mode: m,
      service: classes ? classes[cls] : e.modes[m],
      from: locName(fromKey, customFrom),
      to: locName(toKey, customTo),
      km: Math.round(km * 10) / 10,
      min,
      priceAmd: price,
    };
    saveOrder(draft);
    onOrder?.(draft);
  };

  const locSelect = (label: string, value: string, onPick: (v: string) => void, customVal: string, onCustom: (v: string) => void) => (
    <label className="est-field">
      <span>{label}</span>
      <select value={value} onChange={(ev) => onPick(ev.target.value)}>
        {Object.keys(e.locs).map((k) => <option key={k} value={k}>{e.locs[k as keyof typeof e.locs]}</option>)}
        <option value="__custom">{e.custom}</option>
      </select>
      {value === "__custom" && (
        <input value={customVal} onChange={(ev) => onCustom(ev.target.value)} placeholder={e.custom} />
      )}
    </label>
  );

  return (
    <div className="est">
      <div className="est-tabs">
        {(Object.keys(e.modes) as Mode[]).map((k) => (
          <button key={k} className={m === k ? "active" : ""} onClick={() => { setM(k); setCls(0); }}>{e.modes[k]}</button>
        ))}
      </div>
      <div className="est-grid">
        <div className="est-form">
          {locSelect(e.pickup, fromKey, setFromKey, customFrom, setCustomFrom)}
          {locSelect(e.dropoff, toKey, setToKey, customTo, setCustomTo)}

          {classes && (
            <div className="est-field">
              <span>{e.classes}</span>
              <div className="est-classes">
                {classes.map((c, i) => (
                  <button key={c} className={cls === i ? "active" : ""} onClick={() => setCls(i)}>
                    <b>{c}</b>
                    {m === "order" ? null : <em>{fare(m, i, km, min).toLocaleString()} ֏</em>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {m === "order" && (
            <div className="est-field">
              <span>{e.classes}</span>
              <div className="est-classes">
                {e.orderCats.map((c, i) => (
                  <button key={c} className={cls === i ? "active" : ""} onClick={() => setCls(i)}><b>{c}</b></button>
                ))}
              </div>
            </div>
          )}

          <div className="est-result">
            {loading ? <span className="est-dim">{e.calculating}</span> : route ? (
              <>
                <div className="est-fare">{price.toLocaleString()} ֏</div>
                <div className="est-meta">{km.toFixed(1)} km · {min} {e.etaMin}{m === "ride" ? ` · ~${Math.max(3, Math.round(min * 0.55))} ${e.etaMin}` : ""}</div>
              </>
            ) : <span className="est-dim">{e.routeFailed}</span>}
          </div>
          <button className="btn btn-primary est-cta" onClick={submit}>{ctaLabel}</button>
          <p className="est-note">{e.note}</p>
        </div>
        <div className="est-map" ref={mapRef} />
      </div>
    </div>
  );
}

export function HeroOrderCard({ onOrder }: { onOrder?: (d: OrderDraft) => void }) {
  const { t } = useLang();
  const e = t.est;
  const [m, setM] = useState<Mode>("ride");
  const [fromKey, setFromKey] = useState("kentron");
  const [toKey, setToKey] = useState("airport");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [cls, setCls] = useState(0);
  const [when, setWhen] = useState<"now" | "later">("now");
  const [route, setRoute] = useState<RouteResult | null>(null);

  const fromCoord: [number, number] = customFrom.trim() ? YEREVAN : (LOCS[fromKey] ?? YEREVAN);
  const toCoord: [number, number] = customTo.trim() ? [40.1872 + parseFloat(customTo || "0") / 1000, 44.5152] : (LOCS[toKey] ?? YEREVAN);
  const locName = (key: string, custom: string) => custom.trim() || e.locs[key as keyof typeof e.locs] || key;

  useEffect(() => {
    let alive = true;
    const a: [number, number] = customFrom.trim() ? [40.18, 44.50] : fromCoord;
    const b: [number, number] = customTo.trim() ? [40.20, 44.53] : toCoord;
    fetchRoute(a, b).then((r) => {
      if (!alive) return;
      if (r) setRoute(r);
      else {
        const km = haversineKm(fromCoord, toCoord) * 1.35;
        setRoute({ km, min: Math.max(5, Math.round(km * 3)), coords: [] });
      }
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromKey, toKey, customFrom, customTo]);

  const km = route?.km ?? 0;
  const min = route?.min ?? 0;
  const price = fare(m, cls, km, min);
  const classes = m === "ride" ? e.rideClasses : m === "cargo" ? e.cargoClasses : null;

  const submit = () => {
    const draft: OrderDraft = {
      mode: m,
      service: classes ? classes[cls] : e.modes[m],
      from: locName(fromKey, customFrom),
      to: locName(toKey, customTo),
      km: Math.round(km * 10) / 10,
      min,
      priceAmd: price,
    };
    saveOrder(draft);
    onOrder?.(draft);
  };

  const locField = (label: string, value: string, onPick: (v: string) => void, customVal: string, onCustom: (v: string) => void, placeholder: string) => (
    <label className="hoc-field">
      <span>{label}</span>
      <select value={value} onChange={(ev) => onPick(ev.target.value)}>
        {Object.keys(e.locs).map((k) => <option key={k} value={k}>{e.locs[k as keyof typeof e.locs]}</option>)}
        <option value="__custom">{e.custom}</option>
      </select>
      {value === "__custom" && <input value={customVal} onChange={(ev) => onCustom(ev.target.value)} placeholder={placeholder} />}
    </label>
  );

  return (
    <div className="hoc">
      <div className="hoc-tabs">
        {(Object.keys(e.modes) as Mode[]).map((k) => (
          <button key={k} className={m === k ? "active" : ""} onClick={() => { setM(k); setCls(0); }}>{e.modes[k]}</button>
        ))}
      </div>
      <div className="hoc-row">
        <div className="hoc-when">
          <button className={when === "now" ? "active" : ""} onClick={() => setWhen("now")}>{e.now}</button>
          <button className={when === "later" ? "active" : ""} onClick={() => setWhen("later")}>{e.schedule}</button>
        </div>
        {when === "later" && <input className="hoc-time" type="datetime-local" aria-label={e.scheduleAt} />}
      </div>
      <div className="hoc-fields">
        {locField(e.pickup, fromKey, setFromKey, customFrom, setCustomFrom, e.custom)}
        {locField(e.dropoff, toKey, setToKey, customTo, setCustomTo, e.custom)}
      </div>
      {classes && (
        <div className="hoc-classes">
          {classes.map((c, i) => (
            <button key={c} className={cls === i ? "active" : ""} onClick={() => setCls(i)}>
              {c}<em>{fare(m, i, km, min).toLocaleString()} ֏</em>
            </button>
          ))}
        </div>
      )}
      {m === "order" && (
        <div className="hoc-classes">
          {e.orderCats.map((c, i) => (
            <button key={c} className={cls === i ? "active" : ""} onClick={() => setCls(i)}>{c}</button>
          ))}
        </div>
      )}
      <div className="hoc-foot">
        <div>
          <div className="hoc-fare">{price.toLocaleString()} ֏</div>
          <div className="hoc-meta">{km.toFixed(1)} km · ~{min} {e.etaMin}</div>
        </div>
        <button className="btn btn-primary hoc-cta" onClick={submit}>{e.continueInApp}</button>
      </div>
      <p className="hoc-note">{e.note}</p>
    </div>
  );
}
