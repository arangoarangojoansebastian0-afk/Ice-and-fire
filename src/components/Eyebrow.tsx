interface EyebrowProps {
  children: string;
  tone?: "fire" | "ice" | "forest";
}

const toneClasses: Record<string, string> = {
  fire: "text-fire-300 before:bg-fire-500",
  ice: "text-ice-300 before:bg-ice-500",
  forest: "text-[#8fd0ac] before:bg-forest-400",
};

export default function Eyebrow({ children, tone = "fire" }: EyebrowProps) {
  return (
    <span
      className={`relative pl-4 text-xs font-semibold uppercase tracking-[0.2em] ${toneClasses[tone]} before:absolute before:left-0 before:top-1/2 before:h-[6px] before:w-[6px] before:-translate-y-1/2 before:rounded-full`}
    >
      {children}
    </span>
  );
}
