import { Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";
import CmsNavigation from "./components/CmsNavigation";
import CmsSectionPage from "./pages/CmsSectionPage";
import TeamMember from "./pages/TeamMember";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ScrollToHash from "./components/ScrollToHash";
import Welcome from "./sections/Welcome";

function Home() {
  return (
    <>
      <Hero />
      <Welcome />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <ScrollToHash />
      <CmsNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/equipo/:id" element={<TeamMember />} />
          <Route path="/*" element={<CmsSectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}