import content from "../data/content.json";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { ExternalLink } from "lucide-react";

export default function SupportForm() {
  const form = content.supportForm;
  if (!form?.url) return null;

  // Nos aseguramos de pedirle a Google Forms la versión para incrustar
  // (embedded=true), sin importar si el link guardado ya la trae o no.
  const embedUrl = (() => {
    try {
      const u = new URL(form.url);
      u.searchParams.set("embedded", "true");
      return u.toString();
    } catch {
      return form.url;
    }
  })();

  return (
    <section id="apoya-la-investigacion" className="relative bg-void-2 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Eyebrow tone="fire">Ayúdanos a investigar</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {form.title}
          </h2>
          {form.description && (
            <p className="mt-4 text-ink-muted">{form.description}</p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl sm:p-4">
            <div className="overflow-hidden rounded-2xl bg-white">
              <iframe
                src={embedUrl}
                title={form.title}
                className="h-[1400px] w-full"
                loading="lazy"
              >
                Cargando formulario…
              </iframe>
            </div>
          </div>

          <a
            href={form.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            ¿No carga bien aquí? Ábrelo en una pestaña nueva
            <ExternalLink size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
