import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import banco from "../data/banco.json";

type BancoImage = (typeof banco.images)[number];

export default function BancoImagenes() {
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  const images = useMemo<BancoImage[]>(
    () => (category === "all" ? banco.images : banco.images.filter((i) => i.category === category)),
    [category],
  );

  const current = open !== null ? images[open] : null;
  const next = () => setOpen((i) => (i === null ? i : (i + 1) % images.length));
  const prev = () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  const chip = (active: boolean) =>
    `min-h-9 rounded-full border px-4 py-1.5 text-xs transition-colors ${
      active ? "border-fire-400 bg-fire-400/15 text-ink" : "border-white/15 text-ink-muted hover:text-ink"
    }`;

  return (
    <div>
      <p className="max-w-2xl text-ink-muted">
        Banco de imágenes del proyecto: {banco.images.length} fotografías sobre incendios, prevención,
        extinción, retardantes, ingredientes naturales y educación ambiental.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        <button className={chip(category === "all")} onClick={() => { setCategory("all"); setOpen(null); }}>
          Todas ({banco.images.length})
        </button>
        {banco.categories.map((c) => (
          <button
            key={c.id}
            className={chip(category === c.id)}
            onClick={() => { setCategory(c.id); setOpen(null); }}
          >
            {c.name} ({banco.images.filter((i) => i.category === c.id).length})
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpen(i)}
            aria-label={`Ampliar: ${img.title}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-void-2"
          >
            <img
              src={img.thumb}
              alt={img.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-void/95 p-6 backdrop-blur"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Banco de imágenes, foto ${open! + 1} de ${images.length}`}
        >
          <button
            className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-ink-muted hover:text-ink sm:right-6 sm:top-6"
            onClick={() => setOpen(null)}
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-ink-muted hover:text-ink sm:left-8"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={current.src}
            alt={current.title}
            className="max-h-[78vh] max-w-[92vw] rounded-lg object-contain sm:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-4 max-w-2xl text-center text-xs text-ink-muted" onClick={(e) => e.stopPropagation()}>
            {current.title}
            {current.author && (
              <>
                {" · "}
                {current.author}
                {current.license && ` · ${current.license}`}
                {current.source && (
                  <>
                    {" · "}
                    <a href={current.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                      Fuente
                    </a>
                  </>
                )}
              </>
            )}
          </p>
          <button
            className="absolute right-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-ink-muted hover:text-ink sm:right-8"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
