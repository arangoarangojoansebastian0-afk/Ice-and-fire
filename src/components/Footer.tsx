import { Link } from "react-router-dom";
import Logo from "./Logo";
import content from "../data/content.json";
import { Mail, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, buildGmailComposeUrl } from "../sections/Contact";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void-2 px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            {content.site.logo ? (
              <img
                src={content.site.logo}
                alt={content.site.name}
                className="h-6 w-6 rounded-md object-contain"
              />
            ) : (
              <Logo size={22} />
            )}
            {content.site.shortName || content.site.name}
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-muted">
            Proyecto de investigación del grado 8°4 — I.E. Colegio Loyola para
            la Ciencia y la Innovación, Medellín. Secretaría de Educación.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Recomendación, carta o sugerencia — Ice and Fire")}`}
            className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-fire-400/30 bg-fire-500/10 px-5 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-fire-400/60 hover:bg-fire-500/20"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fire-500 to-fire-300 text-void shadow-lg shadow-fire-500/20">
              <Mail size={17} />
            </span>
            <span className="text-left">
              <span className="block">Enviar recomendación o carta</span>
              <span className="mt-0.5 block text-xs font-normal text-ink-muted">
                También puedes enviarnos una sugerencia
              </span>
            </span>
            <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Si el botón de arriba no abre nada (dispositivo sin cliente de
              correo configurado), este link abre Gmail en el navegador. */}
          <a
            href={buildGmailComposeUrl(
              CONTACT_EMAIL,
              "Recomendación, carta o sugerencia — Ice and Fire",
              ""
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs text-ink-faint hover:text-ink hover:underline"
          >
            ¿No se abrió nada? Envíalo desde Gmail
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <div>
            <p className="mb-3 font-semibold text-ink">Proyecto</p>
            <ul className="space-y-2 text-ink-muted">
              <li><Link to="/investigacion" className="hover:text-ink">Investigación</Link></li>
              <li><Link to="/investigacion#antecedentes" className="hover:text-ink">Antecedentes</Link></li>
              <li><Link to="/spray-fire" className="hover:text-ink">Spray Fire</Link></li>
              <li><Link to="/videojuego" className="hover:text-ink">Videojuego</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-ink">Equipo</p>
            <ul className="space-y-2 text-ink-muted">
              <li><Link to="/equipo" className="hover:text-ink">Quiénes somos</Link></li>
              <li><Link to="/equipo#videos" className="hover:text-ink">Videos</Link></li>
              <li><Link to="/bitacora" className="hover:text-ink">Bitácora</Link></li>
              <li><Link to="/bitacora#cronograma" className="hover:text-ink">Cronograma</Link></li>
              <li><Link to="/poster" className="hover:text-ink">Póster</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-ink">Contacto</p>
            <ul className="space-y-2 text-ink-muted">
              <li><Link to="/galeria" className="hover:text-ink">Galería</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-ink">Legal</p>
            <ul className="space-y-2 text-ink-muted">
              <li><Link to="/privacidad" className="hover:text-ink">Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-ink">Términos</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/5 pt-6 text-xs text-ink-faint">
        © {new Date().getFullYear()} Equipo Ice and Fire — I.E. Colegio Loyola para la Ciencia y la Innovación.
      </div>
    </footer>
  );
}
