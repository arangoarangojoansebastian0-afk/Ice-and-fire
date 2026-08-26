import { Routes, Route } from "react-router-dom";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";
import CmsNavigation from "./components/CmsNavigation";
import CmsSectionPage from "./pages/CmsSectionPage";
import TeamMember from "./pages/TeamMember";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import content from "./data/content.json";

function Home() {
  return <Hero />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <CmsNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/equipo" element={<CmsSectionPage />} />
          <Route path="/equipo/:id" element={<TeamMember />} />
          <Route path="/:slug" element={<CmsSectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
