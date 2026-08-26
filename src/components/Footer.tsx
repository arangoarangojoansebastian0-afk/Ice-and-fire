import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void-2 px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <Logo size={22} />
            Ice &amp; Fire
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-muted">
            Proyecto de investigación del grado 8°4 — I.E. Colegio Loyola para
            la Ciencia y la Innovación, Medellín. Secretaría de Educación.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <div>
            <p className="mb-3 font-semibold text-ink">Proyecto</p>
            <ul className="space-y-2 text-ink-muted">
              <li><a href="/#historia" className="hover:text-ink">Historia</a></li>
              <li><a href="/#investigacion" className="hover:text-ink">Investigación</a></li>
              <li><a href="/#antecedentes" className="hover:text-ink">Antecedentes</a></li>
              <li><a href="/#spray" className="hover:text-ink">Spray Fire</a></li>
              <li><a href="/#videojuego" className="hover:text-ink">Videojuego</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-ink">Equipo</p>
            <ul className="space-y-2 text-ink-muted">
              <li><a href="/#equipo" className="hover:text-ink">Quiénes somos</a></li>
              <li><a href="/#videos" className="hover:text-ink">Videos</a></li>
              <li><a href="/#bitacoras" className="hover:text-ink">Bitácoras</a></li>
              <li><a href="/#cronograma" className="hover:text-ink">Cronograma</a></li>
              <li><a href="/#poster" className="hover:text-ink">Póster</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-ink">Contacto</p>
            <ul className="space-y-2 text-ink-muted">
              <li><a href="/#contacto" className="hover:text-ink">Escríbenos</a></li>
              <li><a href="/#galeria" className="hover:text-ink">Galería</a></li>
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
