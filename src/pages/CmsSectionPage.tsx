import { useParams } from "react-router-dom";
import pagesData from "../data/pages.json";
import CmsBlockRenderer from "../components/CmsBlockRenderer";

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

const sections: Record<string, React.ComponentType> = {
  Problem, History, Journey, Research, Antecedents, Methodology, Spray,
  Game, Steam, Schedule, Timeline, Videos, Gallery, Team, Poster, Contact
};

type PageSection = {
  id?: string;
  section?: string;
  label?: string;
  visible?: boolean;
  order?: number;
};

export default function CmsSectionPage() {
  const { slug } = useParams();
  const page = pagesData.pages.find((p) => p.slug === slug);

  if (!page || !page.visible) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold">Página no encontrada</h1>
      </div>
    );
  }

  if (
    page.type === "external" &&
    "externalUrl" in page &&
    typeof page.externalUrl === "string" &&
    page.externalUrl.trim()
  ) {
    window.location.href = page.externalUrl;
    return null;
  }

  const configuredSections: PageSection[] =
    "sections" in page && Array.isArray(page.sections)
      ? page.sections
      : page.section
        ? [{ section: page.section, visible: true, order: 0 }]
        : [];

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
          const Section = item.section ? sections[item.section] : undefined;

          if (!Section) return null;

          return (
            <div key={`${item.section}-${item.id ?? index}`}>
              {item.label && item.label !== page.name ? (
                <h2 className="mb-8 text-2xl font-bold">{item.label}</h2>
              ) : null}
              <Section />
            </div>
          );
        })}

        {"blocks" in page && Array.isArray(page.blocks) && page.blocks.length > 0 ? (
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
