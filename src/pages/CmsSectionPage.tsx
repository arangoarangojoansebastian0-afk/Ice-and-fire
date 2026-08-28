import { useEffect } from "react";
import { useParams } from "react-router-dom";
import pagesData from "../data/pages.json";
import CmsBlockRenderer from "../components/CmsBlockRenderer";
import NotFound from "./NotFound";

import Problem from "../sections/Problem";
import History from "../sections/History";
import Journey from "../sections/Journey";
import Research from "../sections/Research";
import Antecedents from "../sections/Antecedents";
import Methodology from "../sections/Methodology";
import Spray from "../sections/Spray";
import Game from "../sections/Game";
import Steam from "../sections/Steam";
import Schedule from "../sections/Schedule";
import Timeline from "../sections/Timeline";
import Videos from "../sections/Videos";
import Gallery from "../sections/Gallery";
import Team from "../sections/Team";
import Poster from "../sections/Poster";
import Contact from "../sections/Contact";
import Hero from "../sections/Hero";
import Bibliography from "../sections/Bibliography";
import Welcome from "../sections/Welcome";
import Evidence from "../sections/Evidence";

import type { Page, PageSection, SectionType } from "../types/cms";

const sections: Record<SectionType, React.ComponentType> = {
  Problem,
  History,
  Journey,
  Research,
  Antecedents,
  Methodology,
  Spray,
  Game,
  Steam,
  Schedule,
  Timeline,
  Videos,
  Gallery,
  Team,
  Poster,
  Contact,
  Hero,
  Bibliography,
  Welcome,
  Evidence,
};

export default function CmsSectionPage() {
  const { slug } = useParams();
  const pages = pagesData.pages as Page[];
  const page = pages.find((p) => p.slug === slug);

  const externalUrl =
    page?.type === "external" &&
    page.externalUrl
      ? page.externalUrl.trim()
      : "";

  useEffect(() => {
    if (externalUrl) {
      window.location.assign(externalUrl);
    }
  }, [externalUrl]);

  if (!page || !page.visible) {
    return <NotFound />;
  }

  if (externalUrl) {
    return <p className="px-6 py-32 text-center text-ink-muted">Redirigiendo…</p>;
  }

  // Handle pages with type: "section" that contain sections
  let configuredSections: PageSection[] = [];
  
  if (page.type === "section" && page.sections) {
    // This is a section-based page with defined sections
    configuredSections = Array.isArray(page.sections) ? page.sections : [];
  } else if (page.section) {
    // This is a single section page
    configuredSections = [{ section: page.section, visible: true, order: 0 }];
  } else {
    // Default case - no specific sections defined
    configuredSections = [];
  }

  const orderedSections = [...configuredSections]
    .filter((item) => item.visible !== false && typeof item.section === "string")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold">{page.name}</h1>
        {page.description && (
          <p className="mt-4 max-w-3xl text-lg opacity-70">{page.description}</p>
        )}
      </header>

      <div className="space-y-20">
        {orderedSections.map((item, index) => {
          // Safe lookup for components. If section type is unknown, ignore it safely.
          const Section = item.section ? sections[item.section] : undefined;

          if (!Section) {
            console.warn(`Sección desconocida: ${item.section}`);
            return null;
          }

          return (
            <div key={`${item.section}-${item.id ?? index}`}>
              {item.label && item.label !== page.name ? (
                <h2 className="mb-8 text-2xl font-bold">{item.label}</h2>
              ) : null}
              <Section />
            </div>
          );
        })}

        {page.blocks && Array.isArray(page.blocks) && page.blocks.length > 0 ? (
          <div className="space-y-12">
            {page.blocks.map((block, index) => (
              <CmsBlockRenderer key={index} block={block} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
