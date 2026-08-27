import { Link, useParams } from "react-router-dom";
import content from "../data/content.json";
import { slugify } from "../lib/slug";
import { Mail, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "../components/SocialIcons";
import type { TeamMember } from "../types/cms";
import { CONTACT_EMAIL, buildGmailComposeUrl, buildMailtoUrl } from "../sections/Contact";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
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

  // Correo personal del integrante (si lo cargó en el CMS bajo "Redes sociales").
  const personalEmailLink = member.socialLinks?.find((l) => l.platform === "email");
  const personalEmail = personalEmailLink?.url.replace(/^mailto:/, "");

  // Si no tiene correo propio, el mensaje se dirige al correo general del
  // equipo, pero mencionando al integrante en el asunto para que igual le
  // llegue la referencia.
  const writeToEmail = personalEmail || CONTACT_EMAIL;
  const writeToSubject = personalEmail
    ? `Mensaje para ${member.name} — Ice and Fire`
    : `Mensaje para ${member.name} (aún sin correo propio) — Ice and Fire`;

  // Helper function to determine if a video is a YouTube URL
  const isYouTubeVideo = (videoUrl?: string) => {
    if (!videoUrl) return false;
    return (
      videoUrl.includes("youtube.com/watch") || 
      videoUrl.includes("youtu.be/") ||
      videoUrl.includes("youtube.com/shorts/") ||
      (videoUrl.length === 11 && !videoUrl.includes("."))
    );
  };

  // Helper function to convert YouTube URLs to embed format
  const getYouTubeEmbedUrl = (videoField?: string) => {
    if (!videoField) return null;
    
    // If it's already an embed URL, return as is
    if (videoField.includes("youtube.com/embed")) {
      return videoField;
    }
    
    // If it's a full YouTube URL with watch?v=
    if (videoField.includes("youtube.com/watch?v=")) {
      try {
        const url = new URL(videoField);
        const videoId = url.searchParams.get('v');
        if (videoId && isValidYouTubeId(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        // Invalid URL, continue to other checks
      }
    }
    
    // If it's a youtu.be URL
    if (videoField.includes("youtu.be/")) {
      try {
        const url = new URL(videoField);
        const videoId = url.pathname.substring(1); // Remove leading slash
        if (isValidYouTubeId(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        // Invalid URL, continue to other checks
      }
    }
    
    // If it's a YouTube Shorts URL (youtube.com/shorts/)
    if (videoField.includes("youtube.com/shorts/")) {
      try {
        const url = new URL(videoField);
        const videoId = url.pathname.substring(1); // Remove leading slash
        if (videoId && isValidYouTubeId(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        // Invalid URL, continue to other checks
      }
    }
    
    // If it's just a YouTube ID (11 characters)
    if (videoField.length === 11 && !videoField.includes(".") && isValidYouTubeId(videoField)) {
      return `https://www.youtube.com/embed/${videoField}`;
    }
    
    // Handle URLs with additional parameters like ?t=30s or &t=30s
    if (videoField.includes("youtube.com/watch")) {
      try {
        const url = new URL(videoField);
        const videoId = url.searchParams.get('v');
        if (videoId && isValidYouTubeId(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        // Invalid URL, continue to other checks
      }
    }
    
    return null;
  };

  // Helper function to validate YouTube ID format
  const isValidYouTubeId = (id: string) => {
    // YouTube IDs are 11 characters long and contain only valid characters
    const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    return youtubeIdRegex.test(id);
  };

  // Test function to verify the fix works correctly
  

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

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Escríbele a {member.name.split(" ")[0]}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={buildMailtoUrl(writeToEmail, writeToSubject, "")}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-fire-500 to-fire-300 px-5 py-2.5 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
              >
                <Mail size={16} /> Enviar correo
              </a>
              <a
                href={buildGmailComposeUrl(writeToEmail, writeToSubject, "")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-ink-muted transition-colors hover:border-ice-500/40 hover:text-ink"
              >
                <ExternalLink size={13} /> ¿No se abrió nada? Usar Gmail
              </a>
            </div>
            {!personalEmail && (
              <p className="mt-3 text-xs text-ink-faint">
                {member.name.split(" ")[0]} todavía no ha cargado su correo
                personal en el sitio, así que tu mensaje llegará al correo
                general del equipo mencionando a quién va dirigido.
              </p>
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
            {isYouTubeVideo(member.video) ? (
             <iframe
  className="h-full w-full rounded-2xl border border-white/10"
  src={getYouTubeEmbedUrl(member.video) || ""}
  title={member.name}
  allowFullScreen
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
/>


            ) : (
              <video
                controls
                playsInline
                preload="metadata"
                poster={member.photo}
                className="h-full w-full rounded-2xl border border-white/10 bg-black/40"
                src={member.video}
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )}
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
