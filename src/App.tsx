import { useEffect } from "react";
import { LangProvider, useLang } from "./i18n";
import { useHashRoute, type Route } from "./router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";
import { HomePage } from "./pages/Home";
import { ServicesPage, BusinessPage, CitiesPage, AboutPage, ContactPage, LegalPage } from "./pages/SubPages";

function Page({ route }: { route: Route }) {
  const [, navigate] = useHashRoute();
  switch (route) {
    case "/services": return <ServicesPage />;
    case "/business": return <BusinessPage />;
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
    const titles: Record<Route, string> = {
      "/": "Vonix — Rides & Delivery in Yerevan",
      "/services": `${t.nav.services} — Vonix`,
      "/business": `${t.nav.business} — Vonix`,
      "/cities": `${t.nav.cities} — Vonix`,
      "/about": `${t.nav.about} — Vonix`,
      "/contact": `${t.nav.contact} — Vonix`,
      "/privacy": `${t.footer.privacy} — Vonix`,
      "/terms": `${t.footer.terms} — Vonix`,
    };
    document.title = titles[route];
  }, [route, t]);

  return (
    <>
      <Header route={route} navigate={navigate} />
      <main key={route}>
        <Reveal className="page-enter"><Page route={route} /></Reveal>
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
