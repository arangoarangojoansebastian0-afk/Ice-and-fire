import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-void"
    >
      {/* Ambient gradient background */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-ice-500/20 blur-[120px]" />
        <div className="absolute -right-24 bottom-[-10%] h-[560px] w-[560px] rounded-full bg-fire-500/20 blur-[130px]" />
        <div className="absolute inset-0 bg-grain" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-28 lg:px-10"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted backdrop-blur"
        >
          Proyecto de investigación · Colegio Loyola · Medellín
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-balance font-display text-6xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-ice-300 to-ice-500 bg-clip-text text-transparent">
            Ice
          </span>{" "}
          and{" "}
          <span className="bg-gradient-to-r from-fire-300 to-fire-500 bg-clip-text text-transparent">
            Fire
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-balance text-lg text-ink-muted sm:text-xl"
        >
          Un spray ignífugo natural y un videojuego educativo, creados por
          cinco estudiantes de 8° para frenar los incendios forestales en
          Medellín antes de que empiecen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <a
            href="#investigacion"
            className="rounded-full bg-gradient-to-r from-fire-500 to-fire-300 px-7 py-3.5 text-sm font-semibold text-void shadow-lg shadow-fire-500/20 transition-transform hover:scale-[1.03]"
          >
            Conocer el proyecto
          </a>
          <a
            href="#metodologia"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors hover:bg-white/10"
          >
            Explorar la investigación
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
