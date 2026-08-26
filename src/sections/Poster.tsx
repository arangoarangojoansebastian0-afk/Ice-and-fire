import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { FileImage } from "lucide-react";

// TODO(Joan): reemplazar este arreglo vacío con las rutas reales del póster
// (ej. "/images/poster/poster-1.jpg") en cuanto subas el archivo del póster
// científico a public/images/poster/.
const posterImages: string[] = [];

export default function Poster() {
  return (
    <section id="poster" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow tone="fire">Póster científico</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            El resumen visual de la investigación
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          {posterImages.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-8 py-20 text-center">
              <FileImage size={32} className="text-ink-faint" />
              <p className="max-w-sm text-sm text-ink-muted">
                El póster todavía no se ha cargado en este sitio. Súbelo en{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                  public/images/poster/
                </code>{" "}
                y añade su ruta en{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                  src/sections/Poster.tsx
                </code>
                .
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {posterImages.map((src) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-2xl border border-white/10"
                >
                  <img src={src} alt="Póster Ice and Fire" className="w-full" />
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
