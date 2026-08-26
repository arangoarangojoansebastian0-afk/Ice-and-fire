import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Flame size={32} className="text-fire-400" />
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink">
        Esta página se apagó
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink-muted">
        No encontramos lo que buscabas. Vuelve al inicio para seguir
        explorando el proyecto.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gradient-to-r from-fire-500 to-fire-300 px-6 py-3 text-sm font-semibold text-void"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
