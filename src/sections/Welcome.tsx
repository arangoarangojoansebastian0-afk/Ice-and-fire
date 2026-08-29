import { Link } from "react-router-dom";
import content from "../data/content.json";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { slugify } from "../lib/slug";
import { isYouTubeVideo, getYouTubeEmbedUrl } from "../lib/video";
import { HeartHandshake } from "lucide-react";
import type { TeamMember } from "../types/cms";

export default function Welcome() {
  const home = content.home;
  const contextTiers = content.contextTiers || [];
  const team = (content.team as TeamMember[])
    .filter((member) => member.visible !== false)
    .sort((a, b) => (a.order ?? 10) - (b.order ?? 10));

  // Video de bienvenida: usa el que se cargue en "home.video" desde el CMS;
  // si todavía no hay uno, cae al primer video de integrante disponible.
  const welcomeVideo = home.video || team.find((m) => m.video)?.video || "";

  return (
    <section id="bienvenida" className="relative bg-void px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow tone="ice">Bienvenida</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {home.title || "Bienvenidos al proyecto Ice and Fire"}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            {home.description ||
              "Ciencia, tecnología y educación para prevenir incendios forestales."}
          </p>
        </Reveal>

        {welcomeVideo && (
          <Reveal delay={0.1} className="mt-12">
            <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
              {isYouTubeVideo(welcomeVideo) ? (
                <iframe
                  className="h-full w-full"
                  src={getYouTubeEmbedUrl(welcomeVideo)}
                  title={home.title || "Video de bienvenida"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full"
                  src={welcomeVideo}
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              )}
            </div>
          </Reveal>
        )}

        {contextTiers.length > 0 && (
          <Reveal delay={0.15} className="mt-16">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Contexto del proyecto
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {contextTiers.map((tier) => (
                <div
                  key={tier.scope}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-ice-300">
                    {tier.scope}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {tier.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {team.length > 0 && (
          <Reveal delay={0.2} className="mt-16">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Nombres y roles
            </h3>
            <div className="mt-5 flex flex-wrap gap-4">
              {team.map((member) => (
                <Link
                  key={member.name}
                  to={`/equipo/${slugify(member.name)}`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-2 pl-2 pr-4 transition-colors hover:border-fire-400/40 hover:bg-white/[0.06]"
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-ink">
                      {member.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-fire-300">
                      {member.name}
                    </span>
                    <span className="block text-xs text-ink-muted">{member.role}</span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        {home.acknowledgments && (
          <Reveal delay={0.25} className="mt-16">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <HeartHandshake size={20} className="mt-0.5 shrink-0 text-forest-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Agradecimientos
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                  {home.acknowledgments}
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
