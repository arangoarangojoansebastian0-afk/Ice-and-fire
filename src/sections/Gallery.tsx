import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "../data/content";

// Descripciones visuales independientes de los nombres de archivo del CMS.
const photoDescriptions = [
  "Integrantes de Ice and Fire posan en el colegio.",
  "Estudiante observa una proyección interactiva sobre una mesa.",
  "Integrantes del equipo posan juntos durante una actividad escolar.",
  "Estudiantes conversan alrededor de una mesa durante una actividad del proyecto.",
  "Integrantes presentan el proyecto a un grupo en el aula.",
  "Equipo Ice and Fire junto a su cartel de presentación.",
  "Cartel del proyecto con información sobre la investigación.",
  "Estudiante participa en una actividad en un espacio de exhibición.",
  "Estudiantes exploran una proyección interactiva sobre una mesa.",
  "Integrantes observan una instalación de proyección interactiva.",
  "Estudiante interactúa con una proyección digital durante una visita.",
  "Dos estudiantes conversan junto a una actividad interactiva.",
  "Integrante del equipo posa durante una actividad escolar.",
];

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const photos = gallery;
  const currentDescription = photoDescriptions[index] || `Fotografía ${index + 1} del proceso de Ice and Fire.`;

  function next() {
    setIndex((i) => (photos.length ? (i + 1) % photos.length : 0));
  }

  function prev() {
    setIndex((i) => (photos.length ? (i - 1 + photos.length) % photos.length : 0));
  }

  useEffect(() => {
    if (reduceMotion || lightbox || paused || photos.length === 0) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, 4500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [lightbox, paused, photos.length, reduceMotion]);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox, photos.length]);

  if (photos.length === 0) {
    return null;
  }

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
          <div
            className="relative mt-14 overflow-hidden rounded-3xl border border-white/10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
            }}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
              onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
              onTouchEnd={(event) => {
                const start = touchStartX.current;
                const end = event.changedTouches[0]?.clientX;
                if (start !== null && end !== undefined && Math.abs(end - start) > 45) {
                  end < start ? next() : prev();
                }
                touchStartX.current = null;
              }}
            >
              {photos.map((src, photoIndex) => (
                <button
                  key={src}
                  onClick={() => setLightbox(true)}
                  aria-label={`Ampliar foto: ${photoDescriptions[photoIndex] || `Fotografía ${photoIndex + 1} del proceso de Ice and Fire.`}`}
                  className="aspect-[16/9] w-full shrink-0"
                >
                  <img
                    src={src}
                    alt={photoDescriptions[photoIndex] || `Fotografía ${photoIndex + 1} del proceso de Ice and Fire.`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-void/70 p-2 text-ink backdrop-blur transition-colors hover:bg-void/90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-void/70 p-2 text-ink backdrop-blur transition-colors hover:bg-void/90"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a la foto ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-11 w-11 items-center justify-center"
                ><span aria-hidden="true" className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-fire-400" : "w-1.5 bg-white/50"}`} /></button>
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
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de imágenes, foto ${index + 1} de ${photos.length}`}
        >
          <button
            className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-ink-muted hover:text-ink sm:right-6 sm:top-6"
            onClick={() => setLightbox(false)}
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-ink-muted hover:text-ink sm:left-8"
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
            alt={currentDescription}
            className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain sm:max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-ink-muted hover:text-ink sm:right-8"
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
