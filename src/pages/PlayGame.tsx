
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PlayGame() {
  return (
    <section className="min-h-screen bg-void px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ice-300">
              Llamas en el Bosque
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              Jugar ahora
            </h1>
          </div>

          <Link
            to="/conoce-el-juego"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-ink-muted transition hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            Conoce el juego
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          
<iframe
  src="https://llamas-two.vercel.app/"
  title="Llamas en el Bosque - Videojuego"
  className="block aspect-video w-full"
  allow="cross-origin-isolated; autoplay; fullscreen; gamepad"
/>

        </div>

        <p className="mt-4 text-center text-sm text-ink-muted">
          Si el juego no se ajusta a tu pantalla, utiliza el modo de pantalla completa.
        </p>
      </div>
    </section>
  );
}
