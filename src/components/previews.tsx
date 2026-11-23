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

export function BusinessPreview({ variant = "card" }: { variant?: "card" | "portal" }) {
  const { t } = useLang();
  const b = t.business.preview;
  const portal = t.businessPortal.preview;
  const previews = [
    {
      key: "restaurant",
      title: portal.restaurantName,
      label: portal.restaurant,
      image: "/images/food.jpg",
      revenue: "184,600 ֏",
      orders: "18",
    },
    {
      key: "store",
      title: portal.shopsName,
      label: portal.shops,
      image: "/images/market.jpg",
      revenue: "126,200 ֏",
      orders: "31",
    },
    {
      key: "fleet",
      title: portal.fleetName,
      label: portal.fleet,
      image: "/cab.png",
      revenue: "392,400 ֏",
      orders: "12",
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
    <div className={`biz-card biz-preview-carousel${variant === "portal" ? " biz-preview-portal" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {variant === "portal" && (
        <div className="biz-preview-image">
          <img src={preview.image} alt="" />
          <span><i className="live-dot" />{portal.livePreview}</span>
        </div>
      )}
      <div className="biz-head">
        <div>
          <div className="biz-kicker">{preview.label}</div>
          <div className="biz-title">{preview.title}</div>
          <div className="biz-sub"><span className="live-dot" />{paused ? portal.paused : b.online}</div>
        </div>
        <div className="biz-total">
          <span>{b.today}</span>
          <strong>{preview.revenue}</strong>
          <em>{preview.orders} {portal.ordersMetric}</em>
        </div>
      </div>

      <div className="biz-queue">
        <div className="biz-queue-head">{preview.label}</div>
        {[b.newOrder, b.items, b.prep].map((name, index) => (
          <div className="biz-order" key={name}>
            <div className="biz-order-top">
              <strong>{name}</strong>
              <span className="biz-badge ok">{index === 0 ? b.accept : index === 1 ? b.ready : portal.live}</span>
            </div>
            <div className="biz-items">{index === 0 ? preview.orders : index === 1 ? `${portal.location} · ${portal.yerevan}` : b.courier}</div>
            <div className="biz-progress"><i style={{ width: index === 0 ? "68%" : "82%" }} /></div>
          </div>
        ))}
      </div>
      <div className="biz-preview-controls" aria-label={portal.show}>
        {previews.map((item, index) => (
          <button
            type="button"
            key={item.key}
            className={`biz-preview-dot${index === activePreview ? " active" : ""}`}
            aria-label={`${portal.show} ${item.label}`}
            aria-pressed={index === activePreview}
            onClick={() => setActivePreview(index)}
          />
        ))}
        <button type="button" className="biz-preview-pause" onClick={() => setPaused((value) => !value)}>
          {paused ? portal.play : portal.pause}
        </button>
      </div>
    </div>
  );
}
