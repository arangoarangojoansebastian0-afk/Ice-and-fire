import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import pagesData from "../data/pages.json";
import content from "../data/content.json";

type Page = {
  name: string;
  slug: string;
  description?: string;
  visible: boolean;
  inMenu: boolean;
  order: number;
  type: string;
  section?: string;
  blocks?: unknown[];
  parent?: string;
};

export default function CmsNavigation() {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const pages = pagesData.pages as Page[];

  const groups = pages
    .filter(
      (page) =>
        page.type === "group" &&
        page.visible &&
        page.inMenu
    )
    .sort((a, b) => a.order - b.order);

  const standalonePages = pages
    .filter(
      (page) =>
        page.type !== "group" &&
        !page.parent &&
        page.visible &&
        page.inMenu
    )
    .sort((a, b) => a.order - b.order);

  const getChildren = (parentSlug: string) =>
    pages
      .filter(
        (page) =>
          page.parent === parentSlug &&
          page.visible &&
          page.inMenu
      )
      .sort((a, b) => a.order - b.order);

  const toggleGroup = (slug: string) => {
    setOpenGroup((current) =>
      current === slug ? null : slug
    );
  };

  const isActive = (slug: string) =>
    location.pathname === `/${slug}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 font-bold"
        >
          {content.site.logo ? (
            <img
              src={content.site.logo}
              alt={content.site.name}
              className="h-9 w-9 rounded-lg object-contain"
            />
          ) : null}

          <span>
            {content.site.shortName || content.site.name}
          </span>
        </Link>

        <div className="flex items-center gap-2 overflow-x-auto">
          {standalonePages.map((page) => (
            <Link
              key={page.slug}
              to={`/${page.slug}`}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                isActive(page.slug)
                  ? "bg-white/10 opacity-100"
                  : "opacity-80 hover:bg-white/10 hover:opacity-100"
              }`}
            >
              {page.name}
            </Link>
          ))}

          {groups.map((group) => {
            const children = getChildren(group.slug);
            const isOpen = openGroup === group.slug;

            return (
              <div
                key={group.slug}
                className="relative shrink-0"
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => toggleGroup(group.slug)}
                  className="flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm opacity-80 transition hover:bg-white/10 hover:opacity-100"
                >
                  {group.name}

                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full mt-2 min-w-56 rounded-xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl">
                    {children.map((child) => (
                      <Link
                        key={child.slug}
                        to={`/${child.slug}`}
                        onClick={() => setOpenGroup(null)}
                        className={`block rounded-lg px-4 py-3 text-sm transition ${
                          isActive(child.slug)
                            ? "bg-white/10 opacity-100"
                            : "opacity-80 hover:bg-white/10 hover:opacity-100"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}