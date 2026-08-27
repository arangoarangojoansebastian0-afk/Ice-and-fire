import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Flame, Snowflake, Sprout, Gamepad2 } from "lucide-react";
import content from "../data/content.json";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroData = content.home || {
    title: "Ice and Fire",
    description:
      "Un spray ignífugo natural y un videojuego educativo creados para prevenir incendios forestales.",
  };

  return (
    <section
      ref={ref}
      className="hero relative min-h-[100svh] overflow-hidden bg-void"
    >
      {/* Fondo dividido: hielo + fuego */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb-ice" />
        <div className="hero-orb hero-orb-fire" />
        <div className="hero-beam hero-beam-ice" />
        <div className="hero-beam hero-beam-fire" />
        <div className="hero-split" />
        <div className="bg-grain absolute inset-0" />
      </motion.div>

      {/* Pequeñas partículas ambientales */}
      <div className="hero-particles pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ ["--i" as string]: index } as React.CSSProperties} />
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-20 pt-28 lg:px-10"
      >
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 flex flex-wrap items-center gap-3"
            >
              <span className="hero-kicker">
                <span className="hero-kicker-dot" />
                Proyecto de investigación · Colegio Loyola · Medellín
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-ink-muted"
            >
              El fuego destruye. <span className="text-fire-300">La ciencia responde.</span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14 }}
              className="hero-title text-balance font-display font-semibold tracking-[-0.055em] text-ink"
            >
              <span className="hero-title-ice">Ice</span>{" "}
              <span className="hero-title-and">and</span>{" "}
              <span className="hero-title-fire">Fire</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted sm:text-xl"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link to="/investigacion" className="hero-primary group">
                Descubre el proyecto
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/investigacion#metodologia" className="hero-secondary">
                Ver cómo lo hacemos
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3"
            >
              <div className="hero-stat">
                <Flame size={16} className="text-fire-300" />
                <span>Prevención</span>
              </div>
              <div className="hero-stat">
                <Sprout size={16} className="text-forest-400" />
                <span>Biodegradable</span>
              </div>
              <div className="hero-stat hidden sm:flex">
                <Gamepad2 size={16} className="text-ice-300" />
                <span>Educación</span>
              </div>
            </motion.div>
          </div>

          {/* Elemento visual principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 35 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: "easeOut" }}
            className="relative mx-auto hidden h-[520px] w-full max-w-[560px] lg:block"
          >
            <div className="hero-ring hero-ring-outer" />
            <div className="hero-ring hero-ring-inner" />

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hero-core"
            >
              <div className="hero-core-glow" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Snowflake size={42} strokeWidth={1.4} className="text-ice-300" />
                <span className="font-display text-3xl font-semibold text-ink">VS</span>
                <Flame size={42} strokeWidth={1.4} className="text-fire-300" />
              </div>
              <p className="relative z-10 mt-3 text-center text-xs uppercase tracking-[0.3em] text-ink-muted">
                ciencia + tecnología
              </p>
            </motion.div>

            <div className="hero-card hero-card-top">
              <Flame size={18} className="text-fire-300" />
              <div>
                <strong>Spray Fire</strong>
                <span>Protección natural</span>
              </div>
            </div>

            <div className="hero-card hero-card-bottom">
              <Gamepad2 size={18} className="text-ice-300" />
              <div>
                <strong>Videojuego</strong>
                <span>Aprender para prevenir</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-ink-faint"
        aria-hidden="true"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
