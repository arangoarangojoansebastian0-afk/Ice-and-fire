// lucide-react dejó de incluir íconos de marcas (Github, Linkedin,
// Instagram, Twitter/X) por temas de licencia de logos. Estos son íconos
// genéricos propios, con el mismo tamaño/estilo que los de lucide-react
// (stroke, no relleno), para no depender de un logo registrado de terceros.

interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GithubIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 22v-3.4a3.3 3.3 0 0 0-.9-2.6c3 -.3 6-1.5 6-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.3-3.7 1.4a13 13 0 0 0-6.6 0C6 2.7 4.8 3 4.8 3a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3.3 9.3c0 5.2 3 6.4 6 6.7a3.3 3.3 0 0 0-.9 2.5V22" />
      <path d="M9 20c-3 1-3-1.5-4.5-2" />
    </svg>
  );
}

export function TiktokIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M16 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M16 3c.2 2.2 1.8 4 4 4.3" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5l5 2.5-5 2.5v-5Z" />
    </svg>
  );
}

export function WhatsappIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 20l1.3-3.8A8 8 0 1 1 8.7 19L4 20Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.5a.5.5 0 0 1 .5-.5H16Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TwitterIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 4l7.7 10.3L4.4 20H7l6-6.5L18 20h4l-8.1-10.8L20.4 4H18l-5.5 6L8 4H4Z" />
    </svg>
  );
}
