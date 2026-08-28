import content from "../data/content.json";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { FileText, ImageOff } from "lucide-react";

interface EvidenceItem {
  title: string;
  description?: string;
  date?: string;
  image?: string;
  file?: string;
}

export default function Evidence() {
  const items = (content.evidence || []) as EvidenceItem[];

  if (items.length === 0) {
    return (
      <section id="evidencias" className="bg-void-2 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="forest">Evidencias</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Aún no hay evidencias cargadas
            </h2>
            <p className="mt-4 text-ink-muted">
              Aquí se irán mostrando fotos, documentos y avances del proceso a
              medida que el equipo los suba desde el editor del sitio.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="evidencias" className="bg-void-2 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow tone="forest">Evidencias</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Fotos, documentos y avances del proceso
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={Math.min(index * 0.05, 0.3)}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform hover:-translate-y-1">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                ) : item.file ? (
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-48 w-full flex-col items-center justify-center gap-2 bg-white/5 text-ink-muted transition-colors hover:text-ink"
                  >
                    <FileText size={28} />
                    <span className="text-xs">Ver archivo adjunto</span>
                  </a>
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-white/5 text-ink-faint">
                    <ImageOff size={28} />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  {item.date && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-ice-300">
                      {item.date}
                    </p>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
