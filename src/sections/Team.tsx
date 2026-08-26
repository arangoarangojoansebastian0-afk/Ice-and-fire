import { Link } from "react-router-dom";
import content from "../data/content.json";
import { slugify } from "../lib/slug";
import { Link } from "react-router-dom";
import content from "../data/content.json";
import { slugify } from "../lib/slug";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon, MailIcon } from "lucide-react";
import type { TeamMember } from "../types/cms";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  email: MailIcon,
};

export default function Team() {
  const teamMembers = (content.team as TeamMember[])
    .filter((member) => member.visible !== false)
    .sort((a, b) => (a.order ?? 10) - (b.order ?? 10));

  return (
    <section id="equipo" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestro equipo
          </h2>

          <p className="max-w-2xl mx-auto opacity-70">
            Conoce a las personas que hacen parte de Ice and Fire.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {teamMembers.map((member) => {
            const id = slugify(member.name);

            return (
              <div
                key={id}
                className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] transition-transform hover:-translate-y-2"
              >
                <Link to={`/equipo/${id}`} className="block flex-1">
                  {member.photo && (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full aspect-square object-cover"
                    />
                  )}

                  <div className="p-6 pb-2">
                    <p className="text-sm uppercase tracking-widest opacity-60 mb-2">
                      {member.role}
                    </p>

                    <h3 className="text-2xl font-bold mb-3 text-ink group-hover:text-fire-300 transition-colors">
                      {member.name}
                    </h3>

                    <p className="opacity-70 line-clamp-3 text-sm">
                      {member.blurb}
                    </p>
                  </div>
                </Link>

                <div className="p-6 pt-2 flex items-center justify-between">
                  <Link
                    to={`/equipo/${id}`}
                    className="font-semibold text-sm hover:text-fire-300 transition-colors"
                  >
                    Ver perfil →
                  </Link>

                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="flex gap-3">
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
                            <Icon size={18} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
