import { useEffect, useRef, useState } from "react";
import "./index.css";
import { HeroScene, PhoneMockup, ServiceIcon } from "./art";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll(".reveal").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <span className="brand-mark">V</span>
          <span className="brand-name">
            Vonix<em>ride</em>
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#business">For business</a></li>
          <li><a href="#cities">Cities</a></li>
        </ul>
        <a className="nav-cta" href="#download">
          Get the app
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Armenia's mobility super-app</span>
          <h1 className="display">
            One app for <span className="accent">every</span> ride in Armenia
          </h1>
          <p className="hero-sub">
            Rides, meals, markets, pharmacy, cargo and express moped delivery —
            dispatched live with upfront AMD pricing and real-time tracking.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#download">
              Download Vonix
            </a>
            <a className="btn btn-ghost" href="#services">
              Explore services
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-item">
              <div className="num">6+</div>
              <div className="lbl">live services</div>
            </div>
            <div className="proof-item">
              <div className="num">20+</div>
              <div className="lbl">cities covered</div>
            </div>
            <div className="proof-item">
              <div className="num">24/7</div>
              <div className="lbl">dispatch &amp; support</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <HeroScene />
          <div className="float-chip" style={{ top: "8%", right: "6%", animationDelay: "0.6s" }}>
            <span className="dot" /> Driver 3 min away
          </div>
          <div className="float-chip" style={{ bottom: "12%", left: "4%", animationDelay: "1.4s" }}>
            <span className="dot" style={{ background: "#0066FF" }} /> 1,240 ֏ upfront fare
          </div>
        </div>
      </div>
    </section>
  );
}

const marqueeItems = [
  "Taxi", "Food delivery", "Supermarket", "Pharmacy", "Cargo", "Moped express",
  "Beauty & retail", "Scheduled rides", "Live tracking", "AMD pricing",
];

function Strip() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="strip">
      <div className="strip-track">
        {items.map((item, i) => (
          <span className="strip-item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    icon: "ride" as const,
    title: "Vonix Rides",
    text: "City taxis and intercity trips with upfront fares, live driver tracking and multiple vehicle classes.",
    tag: "From 400 ֏",
  },
  {
    icon: "food" as const,
    title: "Meals delivery",
    text: "Hundreds of restaurants across Yerevan — hot food delivered by dedicated couriers in minutes.",
    tag: "30+ partners",
  },
  {
    icon: "grocery" as const,
    title: "Markets & supermarket",
    text: "Groceries and everyday essentials from verified stores, delivered fast to your door.",
    tag: "Same-day",
  },
  {
    icon: "pharmacy" as const,
    title: "Pharmacy & health",
    text: "Medicines and health products with licensed pharmacies and careful handling.",
    tag: "Licensed",
  },
  {
    icon: "cargo" as const,
    title: "Freight & cargo",
    text: "Vans, sprinters and trucks for business deliveries, moves and logistics across Armenia.",
    tag: "Up to 3.5t",
  },
  {
    icon: "moped" as const,
    title: "Express moped",
    text: "Documents and small parcels couriered across the city by dedicated moped riders.",
    tag: "45 min avg",
  },
];

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Everything in one app</span>
          <h2 className="display">Six services. One account. Zero friction.</h2>
          <p>
            Switch between services instantly — your addresses, payment methods
            and history follow you everywhere.
          </p>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <article className="service-card reveal" key={s.title}>
              <div className="service-icon">
                <ServiceIcon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="service-tag">{s.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Enter your destination",
    text: "Type any address or drop a pin — live geocoding snaps your route instantly with real distances.",
  },
  {
    title: "Get an upfront fare",
    text: "Transparent AMD pricing before you book. No surge surprises, no meter anxiety.",
  },
  {
    title: "Track it live",
    text: "Watch your driver or courier move in real time — with ETAs, call/chat and trip history.",
  },
];

function HowItWorks() {
  return (
    <section className="section" id="how" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Dead simple</span>
          <h2 className="display">From tap to trip in three steps</h2>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step reveal" key={s.title}>
              <div className="step-num" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section className="section" id="business" style={{ paddingTop: 0 }}>
      <div className="container split">
        <div className="reveal">
          <span className="eyebrow">Vonix Business</span>
          <h2 className="display">Grow your business on Vonix</h2>
          <p>
            Join thousands of restaurants, stores and couriers earning on the
            platform. Manage orders, track earnings and reach customers across
            Armenia.
          </p>
          <ul className="check-list">
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              <span><strong>Live order queue</strong> — accept, prepare and dispatch in real time.</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              <span><strong>Earnings dashboard</strong> — daily settlements and transparent commissions.</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              <span><strong>Verified partners</strong> — KYC-verified merchants get priority dispatch.</span>
            </li>
          </ul>
          <div className="hero-actions">
            <a className="btn btn-primary" href="https://vonix-platform.onrender.com/partner" target="_blank" rel="noreferrer">
              Partner portal
            </a>
          </div>
        </div>
        <div className="phone-wrap reveal">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

const cities = [
  "Yerevan", "Gyumri", "Vanadzor", "Abovyan", "Kapan", "Armavir",
  "Vagharshapat", "Hrazdan", "Ijevan", "Dilijan", "Sevan", "Goris",
  "Martuni", "Charentsavan", "Spitak", "Masis", "Artashat", "Ashtarak",
  "Byureghavan", "Nor Hachn",
];

function Cities() {
  return (
    <section className="section" id="cities" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Coverage</span>
          <h2 className="display">Live in cities across Armenia</h2>
          <p>Dispatch zones keep expanding — check the app for real-time availability in your area.</p>
        </div>
        <div className="cities">
          {cities.map((city) => (
            <span className="city-chip reveal" key={city}>
              <span className="pulse" />
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section className="section download" id="download">
      <div className="container reveal">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Get started</span>
        <h2 className="display">Your next ride is one tap away</h2>
        <p>
          Download Vonix for iOS and Android — free, with cash, card and
          Vonix Pay support.
        </p>
        <div className="store-btns">
          <a className="store-btn" href="#download">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.4 1.06-.91 0-2.31-1.03-3.8-1-1.95.03-3.76 1.14-4.76 2.88-2.03 3.52-.52 8.73 1.46 11.59.97 1.4 2.12 2.97 3.63 2.91 1.46-.06 2.01-.94 3.77-.94s2.26.94 3.8.91c1.57-.03 2.56-1.42 3.52-2.83 1.11-1.62 1.57-3.19 1.6-3.27-.04-.02-3.07-1.18-3.09-4.67zM14.9 5.6c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.73-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.62z"/></svg>
            <span><small>Download on the</small><strong>App Store</strong></span>
          </a>
          <a className="store-btn" href="#download">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.3 13.7 12 3.6 21.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1zm11.5 8.7L5.9 1.8l11.2 6.4-1.9 2.8zm0 1.9 1.9 2.8-11.2 6.4 9.3-9.2zM4.9 22.2l8.8-8.8 1.7 1.7-8.8 8.8c-.3.1-.7.1-1 0l-.7-.7z" transform="scale(0.9) translate(1.3,1.3)"/></svg>
            <span><small>Get it on</small><strong>Google Play</strong></span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand">
          <span className="brand-mark">V</span>
          <span className="brand-name">Vonix<em>ride</em></span>
        </div>
        <ul className="footer-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#business">Business</a></li>
          <li><a href="https://vonix-platform.onrender.com/partner" target="_blank" rel="noreferrer">Partner portal</a></li>
          <li><a href="#download">Download</a></li>
        </ul>
        <span>© {new Date().getFullYear()} Vonix · Yerevan, Armenia</span>
      </div>
    </footer>
  );
}

export default function App() {
  const rootRef = useReveal();
  return (
    <div ref={rootRef}>
      <Navbar />
      <main>
        <Hero />
        <Strip />
        <Services />
        <HowItWorks />
        <Business />
        <Cities />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
