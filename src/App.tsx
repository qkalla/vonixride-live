import { LangProvider } from "./i18n";
import { useHashRoute } from "./router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";
import { HomePage } from "./pages/Home";
import { ServicesPage, BusinessPage, CitiesPage, AboutPage, ContactPage, LegalPage } from "./pages/SubPages";

function Page({ route }: { route: ReturnType<typeof useHashRoute>[0] }) {
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

export default function App() {
  const [route, navigate] = useHashRoute();
  return (
    <LangProvider>
      <Header route={route} navigate={navigate} />
      <main key={route}>
        <Reveal className="page-enter"><Page route={route} /></Reveal>
      </main>
      <Footer navigate={navigate} />
    </LangProvider>
  );
}
