import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { videos } from "../data/content";

export default function Videos() {
  return (
    <section id="videos" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="fire">En video</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Conócenos en movimiento
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Los videos de presentación individual de cada integrante están en
            producción (ver Cronograma). Mientras tanto, estos son los videos
            oficiales del equipo.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.youtubeId} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="p-4 text-sm font-medium text-ink">{v.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
