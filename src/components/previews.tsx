import { useEffect, useState } from "react";
import { useLang } from "../i18n";

export function RidePreview() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <div className="device">
      <div className="device-screen">
        <div className="app-top">
          <div className="app-loc">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>Yerevan · Kentron</span>
          </div>
          <div className="app-avatar">AK</div>
        </div>

        <div className="route-card">
          <div className="route-row">
            <span className="pin pin-a" />
            <div>
              <div className="route-label">{h.pickup}</div>
              <div className="route-sub">Armenia St 12</div>
            </div>
          </div>
          <div className="route-line" />
          <div className="route-row">
            <span className="pin pin-b" />
            <div>
              <div className="route-label">{h.dropoff}</div>
              <div className="route-sub">4.2 km · {h.eta}</div>
            </div>
          </div>
          <div className="route-meta">
            <span className="eta-pill"><span className="pulse" />{h.eta}</span>
            <span className="dist-pill">4.2 km</span>
          </div>
        </div>

        <div className="class-row">
          <div className="class-chip active"><b>🚗</b><span>{h.standard}</span><em>1,240 ֏</em></div>
          <div className="class-chip"><b>⭐</b><span>{h.comfort}</span><em>1,680 ֏</em></div>
          <div className="class-chip"><b>💼</b><span>{h.business}</span><em>2,050 ֏</em></div>
        </div>

        <div className="fare-card">
          <div className="fare-row"><span>Base fare</span><span>400 ֏</span></div>
          <div className="fare-row"><span>4.2 km × 180 ֏</span><span>756 ֏</span></div>
          <div className="fare-row"><span>Time · 14 min</span><span>84 ֏</span></div>
          <div className="fare-row"><span>Service fee</span><span>0 ֏</span></div>
          <div className="fare-total"><span>Total</span><strong>1,240 ֏</strong></div>
        </div>

        <div className="pay-row">
          {[h.cash, h.card, h.vonixPay].map((p, i) => (
            <span key={p} className={`pay-chip${i === 0 ? " active" : ""}`}>{p}</span>
          ))}
        </div>

        <button className="app-cta">{h.primary}</button>

        <div className="driver-strip">
          <div className="driver-dot" />
          <span>{h.driver}</span>
          <span className="driver-eta">{h.eta}</span>
        </div>
      </div>
      <div className="device-notch" />
    </div>
  );
}

export function BusinessPreview() {
  const { t } = useLang();
  const b = t.business.preview;
  const previews = [
    {
      key: "restaurant",
      title: "Karas Burger · Dalma",
      label: "Restaurant",
      revenue: "184,600 ֏",
      orders: "18 orders",
      accent: "#0066FF",
      rows: [
        ["#00950018", "Preparing", "4 items"],
        ["#00950017", "New", "2 × Khachapuri"],
        ["#00950016", "Ready", "3 × Lavash"],
      ],
    },
    {
      key: "store",
      title: "Yerevan City · Kentron",
      label: "Shops & grocery",
      revenue: "126,200 ֏",
      orders: "31 sales",
      accent: "#0066FF",
      rows: [
        ["Tomatoes", "In stock", "4,280 ֏"],
        ["Mineral water", "Low stock", "900 ֏"],
        ["Fresh bread", "In stock", "760 ֏"],
      ],
    },
    {
      key: "fleet",
      title: "Vonix Fleet · Yerevan",
      label: "Multi-car & fleet",
      revenue: "392,400 ֏",
      orders: "12 active",
      accent: "#0066FF",
      rows: [
        ["VNX-104", "On trip", "14,300 ֏"],
        ["VNX-219", "Available", "Ready"],
        ["VNX-302", "In route", "11,800 ֏"],
      ],
    },
  ] as const;
  const [activePreview, setActivePreview] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActivePreview((current) => (current + 1) % previews.length);
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [paused, previews.length]);

  const preview = previews[activePreview];
  return (
    <div className="biz-card biz-preview-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="biz-head">
        <div>
          <div className="biz-kicker">{preview.label}</div>
          <div className="biz-title">{preview.title}</div>
          <div className="biz-sub"><span className="live-dot" />{paused ? "Preview paused" : b.online}</div>
        </div>
        <div className="biz-total">
          <span>{b.today}</span>
          <strong>{preview.revenue}</strong>
          <em>{preview.orders}</em>
        </div>
      </div>

      <div className="biz-queue">
        <div className="biz-queue-head">{preview.label}</div>
        {preview.rows.map(([name, status, detail]) => (
          <div className="biz-order" key={name}>
            <div className="biz-order-top">
              <strong>{name}</strong>
              <span className="biz-badge ok">{status}</span>
            </div>
            <div className="biz-items">{detail}</div>
            <div className="biz-progress"><i style={{ width: preview.key === "restaurant" ? "68%" : "82%" }} /></div>
          </div>
        ))}
      </div>
      <div className="biz-preview-controls" aria-label="Dashboard preview">
        {previews.map((item, index) => (
          <button
            type="button"
            key={item.key}
            className={`biz-preview-dot${index === activePreview ? " active" : ""}`}
            aria-label={`Show ${item.label}`}
            onClick={() => setActivePreview(index)}
          />
        ))}
        <button type="button" className="biz-preview-pause" onClick={() => setPaused((value) => !value)}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
