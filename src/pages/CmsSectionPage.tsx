import { useEffect } from "react";
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
};

export default function CmsSectionPage() {
  const { slug } = useParams();

  const page = pagesData.pages.find((p) => p.slug === slug);

  useEffect(() => {
    if (
      page &&
      page.type === "external" &&
      "externalUrl" in page &&
      typeof page.externalUrl === "string" &&
      page.externalUrl.length > 0
    ) {
      window.location.href = page.externalUrl;
    }
  }, [page]);

  if (!page || !page.visible) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold">
          Página no encontrada
        </h1>
      </div>
    );
  }

  if (
    page.type === "external" &&
    "externalUrl" in page &&
    typeof page.externalUrl === "string" &&
    page.externalUrl.length > 0
  ) {
    return null;
  }

  const Section = page.section
    ? sections[page.section]
    : undefined;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold md:text-6xl">
          {page.name}
        </h1>

        {page.description && (
          <p className="mt-4 max-w-3xl text-lg opacity-70">
            {page.description}
          </p>
        )}
      </header>

      {Section ? <Section /> : null}

      {page.blocks?.length ? (
        <div className="mt-16 space-y-12">
          {page.blocks.map((block, index) => (
            <CmsBlockRenderer
              key={index}
              block={block}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}