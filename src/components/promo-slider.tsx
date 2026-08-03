"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/locales";

export type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  photo: string;
};

const PHOTO: Record<string, string> = {
  desierto: "ph-desierto",
  dunas: "ph-dunas",
  mar: "ph-mar",
  canon: "ph-canon",
  motor: "ph-motor",
};

/**
 * Carrusel de promociones de la portada.
 *
 * Es el hero de cactustours.com: un swiper de banners de oferta, no un hero
 * estático. Aquí se replica con avance automático, puntos y control por
 * teclado, y se detiene si el visitante prefiere menos movimiento.
 */
export function PromoSlider({
  slides,
  locale,
  images,
  focus,
}: {
  slides: readonly Slide[];
  locale: Locale;
  /** Fotos por índice de slide; si falta, cae al degradado. */
  images?: (string | undefined)[];
  /**
   * Punto focal de cada foto (`background-position`). El hero es mucho más
   * ancho que alto, así que una foto casi cuadrada se recorta por arriba y
   * por abajo: sin esto, al camello se le cortan las caras de quienes lo
   * montan. Si no se indica, se centra.
   */
  focus?: (string | undefined)[];
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (n: number) => setI(((n % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(i + 1), 6000);
    return () => clearInterval(id);
  }, [i, paused, go, slides.length]);

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, n) => (
        <div
          key={s.title}
          className={`${n === i ? "block" : "hidden"}`}
          aria-hidden={n !== i}
        >
          <div className="noise relative isolate text-white">
            {images?.[n] ? (
              <div
                className={`absolute inset-0 -z-10 bg-cover ${n === i ? "hero-zoom" : ""}`}
                style={{
                  backgroundImage: `url(${images[n]})`,
                  backgroundPosition: focus?.[n] ?? "center",
                }}
              />
            ) : (
              <div className={`absolute inset-0 -z-10 ${PHOTO[s.photo]} ${n === i ? "hero-zoom" : ""}`} />
            )}
            {/* Scrims del Pacífico profundo: lateral para el texto, viñeta
                inferior para anclar los controles, y un lavado cálido suave
                que tiñe las luces de atardecer. Nunca negro puro. */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-abismo/85 via-abismo/40 to-transparent" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-abismo/70 via-abismo/10 to-transparent" />
            <div className="absolute inset-0 -z-10 bg-coral/15 mix-blend-soft-light" />

            <div className="container-x flex min-h-[84svh] flex-col justify-center pb-24 pt-32 sm:pt-36">
              <div className="max-w-2xl">
                <h2
                  className="rise text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
                >
                  {s.title}
                </h2>
                <p
                  className="rise mt-4 max-w-xl leading-relaxed text-white/85"
                  style={{ animationDelay: "90ms" }}
                >
                  {s.body}
                </p>
                <Link
                  href={`/${locale}${s.href}`}
                  className="rise btn-grad mt-7 inline-block rounded-full px-7 py-3.5 text-sm"
                  style={{ animationDelay: "180ms" }}
                >
                  {s.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-5 z-10">
        <div className="container-x flex items-center gap-2">
          {slides.map((s, n) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(n)}
              aria-label={s.title}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? "w-8 bg-coral" : "w-4 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
          {/* Contador de livery: numeración de competencia en Archivo. */}
          <span
            aria-hidden
            className="ml-auto font-display text-xs font-bold tracking-[0.2em] text-white/70"
          >
            {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
