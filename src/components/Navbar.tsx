import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "#problema", label: "El problema" },
  { href: "#historia", label: "Historia" },
  { href: "#investigacion", label: "Investigación" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#spray", label: "Spray Fire" },
  { href: "#videojuego", label: "Videojuego" },
  { href: "#steam", label: "STEAM+H" },
  { href: "#cronograma", label: "Cronograma" },
  { href: "#equipo", label: "Equipo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-void/85 backdrop-blur-lg border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink">
          <Logo size={24} />
          Ice <span className="text-ink-muted">&amp;</span> Fire
        </Link>

        {isHome && (
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <a
          href={isHome ? "#poster" : "/#poster"}
          className="hidden rounded-full bg-gradient-to-r from-fire-500 to-fire-300 px-5 py-2 text-sm font-semibold text-void lg:inline-block"
        >
          Ver el póster
        </a>

        <button
          aria-label="Abrir menú"
          className="text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && isHome && (
        <nav className="flex flex-col gap-1 border-t border-white/5 bg-void px-6 py-4 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-ink-muted hover:bg-white/5 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
