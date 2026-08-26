import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import Problem from "./sections/Problem";
import History from "./sections/History";
import Journey from "./sections/Journey";
import Research from "./sections/Research";
import Antecedents from "./sections/Antecedents";
import Methodology from "./sections/Methodology";
import Spray from "./sections/Spray";
import Game from "./sections/Game";
import Steam from "./sections/Steam";
import Schedule from "./sections/Schedule";
import Timeline from "./sections/Timeline";
import Videos from "./sections/Videos";
import Gallery from "./sections/Gallery";
import Team from "./sections/Team";
import Poster from "./sections/Poster";
import Contact from "./sections/Contact";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TeamMember from "./pages/TeamMember";
import NotFound from "./pages/NotFound";

import content from "./data/content.json";

function Home() {
  const site = content.site;

  return (
    <>
      <Hero />

      <Problem />

      <History />

      <Journey />

      <Research />

      <Antecedents />

      <Methodology />

      <Spray />

      <Game />

      <Steam />

      <Schedule />

      {site.showTimeline !== false && <Timeline />}

      {site.showVideos !== false && <Videos />}

      <Gallery />

      {site.showTeam !== false && <Team />}

      <Poster />

      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/equipo/:id"
            element={<TeamMember />}
          />

          <Route
            path="/privacidad"
            element={<Privacy />}
          />

          <Route
            path="/terminos"
            element={<Terms />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}