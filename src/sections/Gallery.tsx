import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const photos = [
  "/images/equipo/galeria-1.jpg",
  "/images/equipo/galeria-2.jpg",
  "/images/equipo/galeria-3.jpg",
  "/images/equipo/miembro-1.jpg",
  "/images/equipo/miembro-2.jpg",
  "/images/equipo/miembro-3.jpg",
  "/images/equipo/miembro-4.jpg",
  "/images/equipo/miembro-5.jpg",
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function next() {
    setIndex((i) => (i + 1) % photos.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || lightbox) return;
    timer.current = setInterval(next, 4500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [lightbox]);

  return (
    <section id="galeria" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Galería</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            El proceso, en imágenes
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Por ahora tenemos fotos del equipo. Las categorías de
            laboratorio, prototipo y eventos se irán completando a medida
            que el equipo las comparta.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {photos.map((src) => (
                <button
                  key={src}
                  onClick={() => setLightbox(true)}
                  className="aspect-[16/9] w-full shrink-0"
                >
                  <img
                    src={src}
                    alt="Equipo Ice and Fire"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-void/60 p-2 text-ink backdrop-blur transition-colors hover:bg-void/80"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-void/60 p-2 text-ink backdrop-blur transition-colors hover:bg-void/80"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a la foto ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-fire-400" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Investigación", "Prototipo", "Proceso", "Eventos"].map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-dashed border-white/15 px-4 py-1.5 text-xs text-ink-faint"
            >
              {cat} · próximamente
            </span>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-void/95 p-6 backdrop-blur"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-6 top-6 text-ink-muted hover:text-ink"
            onClick={() => setLightbox(false)}
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 text-ink-muted hover:text-ink sm:left-8"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Anterior"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={photos[index]}
            alt="Equipo Ice and Fire"
            className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-ink-muted hover:text-ink sm:right-8"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Siguiente"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}
