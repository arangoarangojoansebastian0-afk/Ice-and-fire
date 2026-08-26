interface LogoProps {
  size?: number;
  className?: string;
}

// Marca original creada para el proyecto: una gota/llama dividida en dos
// mitades (hielo/fuego) que se encuentran en el centro. No reemplaza al
// escudo oficial del colegio — si el equipo ya tiene un logo propio o el
// del colegio en archivo, se puede sustituir este componente por una
// etiqueta <img src="/images/logo-oficial.svg" />.
export default function Logo({ size = 28, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-ice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FDCF2" />
          <stop offset="100%" stopColor="#2D7FA0" />
        </linearGradient>
        <linearGradient id="logo-fire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#C23A12" />
        </linearGradient>
      </defs>
      <path
        d="M20 3C13 12 8 18 8 25a12 12 0 0 0 12 12V3Z"
        fill="url(#logo-ice)"
      />
      <path
        d="M20 3c7 9 12 15 12 22a12 12 0 0 1-12 12V3Z"
        fill="url(#logo-fire)"
      />
      <circle cx="20" cy="20" r="19" fill="none" stroke="white" strokeOpacity="0.08" />
    </svg>
  );
}
