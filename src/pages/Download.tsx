import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { AppleIcon, PlayIcon } from "../components/icons";
import { loadOrder, type OrderDraft } from "../components/Estimator";

export function DownloadPage() {
  const { t } = useLang();
  const d = t.dl;
  const [order, setOrder] = useState<OrderDraft | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setOrder(loadOrder());
  }, []);

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(qrRef.current, "https://vonixride.live/#/download", { width: 148, margin: 1, color: { dark: "#0B0B0F", light: "#ffffff" } });
    }
  }, []);

  return (
    <section className="page-hero dl-page">
      <div className="container dl-layout">
        <Reveal>
          <h1 className="display">{d.title}</h1>
          <p className="page-sub">{d.sub}</p>
          <div className="store-btns dl-stores">
            <a className="store-btn" href="#download">
              <AppleIcon />
              <span><small>{t.download.ios}</small><strong>{t.download.iosName}</strong></span>
            </a>
            <a className="store-btn" href="#download">
              <PlayIcon />
              <span><small>{t.download.android}</small><strong>{t.download.androidName}</strong></span>
            </a>
          </div>
          <div className="dl-qr">
            <canvas ref={qrRef} />
            <span>{d.scan}</span>
          </div>
          <p className="dl-hint">{d.hint}</p>
        </Reveal>
        {order && (
          <Reveal className="dl-card">
            <div className="dl-card-tag">{d.tripCard}</div>
            <div className="dl-row"><span>{d.service}</span><strong>{order.service}</strong></div>
            <div className="dl-row"><span>{d.route}</span><strong>{order.from} → {order.to}</strong></div>
            <div className="dl-row"><span>{d.distance}</span><strong>{order.km} km</strong></div>
            <div className="dl-row"><span>{d.eta}</span><strong>{order.min} min</strong></div>
            <div className="dl-row dl-total"><span>{d.estimate}</span><strong>{order.priceAmd.toLocaleString()} ֏</strong></div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
