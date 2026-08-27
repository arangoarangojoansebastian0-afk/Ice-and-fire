import { Link, useParams } from "react-router-dom";
import content from "../data/content.json";
import { slugify } from "../lib/slug";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "../components/SocialIcons";
import type { TeamMember } from "../types/cms";

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
  const testYouTubeShorts = () => {
    console.log("Testing YouTube Shorts URL detection:");
    
    // Test case from the problem
    const testUrl = "https://youtube.com/shorts/65oHz_aAlaQ";
    const isYouTube = isYouTubeVideo(testUrl);
    const embedUrl = getYouTubeEmbedUrl(testUrl);
    
    console.log("Input:", testUrl);
    console.log("isYouTubeVideo result:", isYouTube);
    console.log("getYouTubeEmbedUrl result:", embedUrl);
    
    // Should be true for isYouTubeVideo and convert to embed URL
    if (isYouTube && embedUrl === "https://www.youtube.com/embed/65oHz_aAlaQ") {
      console.log("✅ Test PASSED: YouTube Shorts correctly handled");
    } else {
      console.log("❌ Test FAILED: YouTube Shorts not properly handled");
    }
  };

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
            {isYouTubeVideo(member.video) ? (
              <iframe
                className="h-full w-full rounded-2xl border border-white/10"
                src={getYouTubeEmbedUrl(member.video) || ""}
                title={member.name}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <video
                controls
                playsInline
                className="h-full w-full rounded-2xl border border-white/10"
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
