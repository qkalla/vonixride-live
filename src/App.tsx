import { useEffect } from "react";
import { LangProvider, useLang } from "./i18n";
import { useHashRoute, type Route } from "./router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";
import { HomePage } from "./pages/Home";
import { ServiceDetailPage } from "./pages/ServiceDetail";
import { HowPage, GuidePage } from "./pages/HowGuide";
import { ServicesPage, BusinessPage, CitiesPage, AboutPage, ContactPage, LegalPage } from "./pages/SubPages";
import { DownloadPage } from "./pages/Download";
import { EarnPage } from "./pages/Earn";

const SVC_TITLES: Record<string, string> = {
  "/services/rides": "Rides",
  "/services/courier": "Courier",
  "/services/cargo": "Cargo",
  "/services/orders": "Orders",
};

function Page({ route, navigate }: { route: Route; navigate: (r: Route) => void }) {
  const svc = route.match(/^\/services\/(rides|courier|cargo|orders)$/)?.[1] as "rides" | "courier" | "cargo" | "orders" | undefined;
  if (svc) return <ServiceDetailPage svc={svc} navigate={navigate} />;
  const earnSub = route.match(/^\/earn\/(drivers|couriers|restaurants|fleet)$/)?.[1] as "drivers" | "couriers" | "restaurants" | "fleet" | undefined;
  if (route.startsWith("/earn")) return <EarnPage sub={earnSub} navigate={navigate} />;
  switch (route) {
    case "/services": return <ServicesPage navigate={navigate as never} />;
    case "/business": return <BusinessPage />;
    case "/how-it-works": return <HowPage />;
    case "/guide": return <GuidePage />;
    case "/download": return <DownloadPage />;
    case "/cities": return <CitiesPage />;
    case "/about": return <AboutPage />;
    case "/contact": return <ContactPage />;
    case "/privacy": return <LegalPage kind="privacy" />;
    case "/terms": return <LegalPage kind="terms" />;
    default: return <HomePage navigate={navigate} />;
  }
}

function Shell() {
  const [route, navigate] = useHashRoute();
  const { t } = useLang();

  useEffect(() => {
    const svc = SVC_TITLES[route];
    const titles: Partial<Record<Route, string>> = {
      "/": "Vonix — Rides & Delivery in Yerevan",
      "/services": `${t.nav.services} — Vonix`,
      "/business": `${t.nav.business} — Vonix`,
      "/how-it-works": `${t.nav.how} — Vonix`,
      "/guide": `${t.guidePage.title} — Vonix`,
      "/download": `${t.dl.title} — Vonix`,
      "/earn": `Earn — Vonix`,
      "/cities": `${t.nav.cities} — Vonix`,
      "/about": `${t.nav.about} — Vonix`,
      "/contact": `${t.nav.contact} — Vonix`,
      "/privacy": `${t.footer.privacy} — Vonix`,
      "/terms": `${t.footer.terms} — Vonix`,
    };
    document.title = svc ? `${svc} — ${t.nav.services} — Vonix` : titles[route]!;
  }, [route, t]);

  return (
    <>
      <Header route={route} navigate={navigate} />
      <main key={route}>
        <Reveal className="page-enter"><Page route={route} navigate={navigate} /></Reveal>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}
