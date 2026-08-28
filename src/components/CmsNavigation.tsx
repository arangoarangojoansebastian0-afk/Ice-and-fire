import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import pagesData from "../data/pages.json";
import content from "../data/content.json";
import type { Page } from "../types/cms";

export default function CmsNavigation() {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const pages = pagesData.pages as Page[];

  // Una página solo se muestra como desplegable si realmente tiene hijos.
  // El tipo "section" describe su contenido, no su jerarquía del menú.
  const getChildren = (parentSlug: string) =>
    pages
      .filter(
        (page) =>
          page.parent === parentSlug &&
          page.visible &&
          page.inMenu
      )
      .sort((a, b) => a.order - b.order);

  const groups = pages
    .filter(
      (page) =>
        !!page.parent === false &&
        page.visible &&
        page.inMenu &&
        getChildren(page.slug).length > 0
    )
    .sort((a, b) => a.order - b.order);

  const standalonePages = pages
    .filter(
      (page) =>
        !page.parent &&
        page.visible &&
        page.inMenu &&
        getChildren(page.slug).length === 0
    )
    .sort((a, b) => a.order - b.order);

  const isActive = (slug: string) =>
    location.pathname === `/${slug}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-5 py-3">
        
        {/* LOGO */}
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

          <span className="whitespace-nowrap">
            {content.site.shortName || content.site.name}
          </span>
        </Link>

        {/* MENÚ */}
        <div className="flex min-w-max flex-1 items-center gap-2">

          <Link
            to="/"
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
              location.pathname === "/"
                ? "bg-white/10 opacity-100"
                : "opacity-80 hover:bg-white/10 hover:opacity-100"
            }`}
          >
            Inicio
          </Link>

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
                {/* BOTÓN DEL GRUPO */}
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenGroup(
                      isOpen ? null : group.slug
                    )
                  }
                  className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                    isOpen
                      ? "bg-white/10 opacity-100"
                      : "opacity-80 hover:bg-white/10 hover:opacity-100"
                  }`}
                >
                  {group.name}

                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN FLOTANTE */}
                {isOpen && (
                  <div
                    className="absolute left-1/2 top-full z-[100] mt-3 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0b0b0b] p-2 shadow-2xl"
                    role="menu"
                  >
                    {/* PEQUEÑA PUNTA */}
                    <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-[#0b0b0b]" />

                    <div className="relative">
                      {children.map((child) => (
                        <Link
                          key={child.slug}
                          to={`/${child.slug}`}
                          role="menuitem"
                          onClick={() => setOpenGroup(null)}
                          className={`block rounded-xl px-4 py-3 text-sm transition ${
                            isActive(child.slug)
                              ? "bg-white/10 text-white"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="font-medium">
                            {child.name}
                          </div>

                          {child.description && (
                            <div className="mt-1 line-clamp-2 text-xs text-white/40">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
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
