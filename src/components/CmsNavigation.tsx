import { Link } from "react-router-dom";
import pagesData from "../data/pages.json";
import content from "../data/content.json";

export default function CmsNavigation() {
  const pages = [...pagesData.pages]
    .filter((p) => p.visible && p.inMenu)
    .sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 overflow-x-auto">
        <Link to="/" className="flex shrink-0 items-center gap-3 font-bold">
          {content.site.logo ? (
            <img src={content.site.logo} alt={content.site.name} className="h-9 w-9 rounded-lg object-contain" />
          ) : null}
          <span>{content.site.shortName || content.site.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          {pages.map((page) => (
            <Link
              key={page.slug}
              to={`/${page.slug}`}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm opacity-80 hover:opacity-100 hover:bg-white/10 transition"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
