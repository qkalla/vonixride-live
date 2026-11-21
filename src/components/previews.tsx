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
  return (
    <div className="biz-card">
      <div className="biz-head">
        <div>
          <div className="biz-title">Karas Burger · Dalma</div>
          <div className="biz-sub"><span className="live-dot" />{b.online}</div>
        </div>
        <div className="biz-total">
          <span>{b.today}</span>
          <strong>{b.total}</strong>
          <em>{b.orders}</em>
        </div>
      </div>

      <div className="biz-queue">
        <div className="biz-queue-head">{b.queue}</div>
        <div className="biz-order new">
          <div className="biz-order-top">
            <strong>{b.newOrder}</strong>
            <span className="biz-time">2 min</span>
          </div>
          <div className="biz-items">{b.items}</div>
          <div className="biz-order-bottom">
            <span>{b.prep}</span>
            <div className="biz-actions">
              <button className="biz-btn accept">{b.accept}</button>
              <button className="biz-btn ghost">{b.ready}</button>
            </div>
          </div>
        </div>
        <div className="biz-order">
          <div className="biz-order-top">
            <strong>#00950011</strong>
            <span className="biz-time">{b.courier}</span>
          </div>
          <div className="biz-items">3 × Lavaš, 2 × Dolma</div>
          <div className="biz-progress"><i style={{ width: "68%" }} /></div>
        </div>
        <div className="biz-order done">
          <div className="biz-order-top">
            <strong>#00950010</strong>
            <span className="biz-badge ok">Delivered</span>
          </div>
          <div className="biz-items">1 × Khachapuri</div>
          <div className="biz-earn">+2,400 ֏</div>
        </div>
      </div>
    </div>
  );
}
