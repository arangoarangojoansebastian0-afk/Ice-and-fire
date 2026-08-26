import { Link, useParams } from "react-router-dom";
import content from "../data/content.json";
import { slugify } from "../lib/slug";
import { Github, Linkedin, Instagram, Twitter, Mail } from "lucide-react";
import type { TeamMember } from "../types/cms";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  email: Mail,
};

export default function TeamMember() {
  const { id } = useParams();
  const members = content.team as TeamMember[];
  const member = members.find((p) => slugify(p.name) === id);

  if (!member || member.visible === false) {
    return (
      <div className="px-6 py-32 text-center">
        <h1 className="text-4xl font-bold">Integrante no encontrado</h1>
        <Link className="mt-6 inline-block text-fire-400 hover:underline" to="/equipo">
          ← Volver al equipo
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Link to="/equipo" className="opacity-70 hover:opacity-100 transition-opacity">
        ← Volver al equipo
      </Link>
      
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>
          {member.photo && (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full rounded-3xl object-cover aspect-square shadow-2xl"
            />
          )}
        </div>
        
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest opacity-60">{member.role}</p>
              <h1 className="mt-2 text-5xl font-bold text-ink">{member.name}</h1>
            </div>
            
            {member.socialLinks && member.socialLinks.length > 0 && (
              <div className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
                {member.socialLinks.map((link, idx) => {
                  const Icon = socialIcons[link.platform];
                  if (!Icon) return null;
                  const href =
                    link.platform === "email"
                      ? link.url.startsWith("mailto:")
                        ? link.url
                        : `mailto:${link.url}`
                      : link.url;

                  return (
                    <a
                      key={idx}
                      href={href}
                      target={link.platform === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-ink-muted hover:text-ink transition-colors"
                      aria-label={`${member.name} - ${link.platform}`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <h2 className="mt-10 text-2xl font-bold border-b border-white/10 pb-2">Función</h2>
          <p className="mt-3 whitespace-pre-line opacity-80 text-sm leading-relaxed text-ink-muted">
            {member.function || member.blurb}
          </p>

          <h2 className="mt-10 text-2xl font-bold border-b border-white/10 pb-2">Autobiografía</h2>
          <p className="mt-3 whitespace-pre-line opacity-80 text-sm leading-relaxed text-ink-muted">
            {member.biography || member.blurb}
          </p>
        </div>
      </div>

      {member.video && (
        <div className="mt-16">
          <h2 className="mb-5 text-3xl font-bold">Video</h2>
          <div className="aspect-video">
            <iframe
              className="h-full w-full rounded-2xl border border-white/10"
              src={
                member.video.includes("youtube.com/watch")
                  ? member.video.replace("watch?v=", "embed/")
                  : member.video.includes("youtu.be/")
                    ? member.video.replace("youtu.be/", "youtube.com/embed/")
                    : member.video
              }
              title={member.name}
              allowFullScreen
            />
          </div>
        </div>
      )}

      {member.gallery && member.gallery.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">Galería personal</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {member.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="aspect-square rounded-xl object-cover hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
