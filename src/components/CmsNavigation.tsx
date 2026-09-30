import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import pagesData from "../data/pages.json";
import content from "../data/content.json";
import type { Page } from "../types/cms";

export default function CmsNavigation() {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    location.pathname === `/${slug}` || location.pathname.startsWith(`/${slug}/`);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const pageLinkClass = (slug: string) =>
    `site-nav-link block w-full rounded-xl px-4 py-3 text-left text-sm transition ${isActive(slug) ? "is-active" : ""}`;

  return (
    <header className="site-nav sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav aria-label="Navegación principal" className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-5">
        
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="site-nav-logo flex min-w-0 shrink items-center gap-3 rounded-xl px-2 py-1.5 font-bold"
        >
          {content.site.logo ? (
            <img
              src={content.site.logo}
              alt={content.site.name}
              className="h-12 w-12 rounded-lg object-contain"
            />
          ) : null}

          <span className="truncate whitespace-nowrap">
            {content.site.shortName || content.site.name}
          </span>
        </Link>

        {/* MENÚ */}
        <div className="desktop-nav-menu flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">

          <Link
            to="/"
            aria-current={location.pathname === "/" ? "page" : undefined}
            className={`site-nav-link whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
              location.pathname === "/"
                ? "is-active"
                : ""
            }`}
          >
            Inicio
          </Link>

          {standalonePages.map((page) => (
            <Link
              key={page.slug}
              to={`/${page.slug}`}
              aria-current={isActive(page.slug) ? "page" : undefined}
              className={`site-nav-link whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                isActive(page.slug) ? "is-active" : ""
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
                  aria-controls={`desktop-submenu-${group.slug}`}
                  onClick={() =>
                    setOpenGroup(
                      isOpen ? null : group.slug
                    )
                  }
                  className={`site-nav-link flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                    isOpen ? "is-active" : ""
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
                    id={`desktop-submenu-${group.slug}`}
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
                            <div className="mt-1 line-clamp-2 text-xs text-white/70">
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

        <button
          type="button"
          className="compact-nav-toggle ml-auto min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-ink transition hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire-300"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>

        {mobileOpen && (
          <div id="mobile-navigation" className="compact-nav-panel mobile-nav-panel absolute inset-x-3 top-[calc(100%+0.5rem)] z-[100] max-h-[min(75vh,36rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1220] p-3 shadow-2xl">
            <Link to="/" onClick={() => setMobileOpen(false)} className={`site-nav-link block rounded-xl px-4 py-3 text-sm ${location.pathname === "/" ? "is-active" : ""}`} aria-current={location.pathname === "/" ? "page" : undefined}>Inicio</Link>
            {standalonePages.map((page) => (
              <Link key={page.slug} to={`/${page.slug}`} onClick={() => setMobileOpen(false)} className={pageLinkClass(page.slug)} aria-current={isActive(page.slug) ? "page" : undefined}>{page.name}</Link>
            ))}
            {groups.map((group) => {
              const children = getChildren(group.slug);
              const expanded = openGroup === group.slug;
              return (
                <div key={group.slug} className="mt-1 border-t border-white/[0.07] pt-1">
                  <button type="button" className={`site-nav-link flex min-h-11 w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm ${isActive(group.slug) || expanded ? "is-active" : ""}`} aria-expanded={expanded} aria-controls={`mobile-submenu-${group.slug}`} onClick={() => setOpenGroup(expanded ? null : group.slug)}>
                    {group.name}<ChevronDown size={16} aria-hidden="true" className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  {expanded && <div id={`mobile-submenu-${group.slug}`} className="mb-2 ml-3 border-l border-white/10 pl-2">
                    <Link to={`/${group.slug}`} onClick={() => setMobileOpen(false)} className={pageLinkClass(group.slug)} aria-current={isActive(group.slug) ? "page" : undefined}>{group.name} — página completa</Link>
                    {children.map((child) => <Link key={child.slug} to={`/${child.slug}`} onClick={() => setMobileOpen(false)} className={`block rounded-xl px-4 py-3 text-sm transition ${isActive(child.slug) ? "bg-white/10 text-white" : "text-ink-muted hover:bg-white/[0.06] hover:text-ink"}`} aria-current={isActive(child.slug) ? "page" : undefined}>{child.name}</Link>)}
                  </div>}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
