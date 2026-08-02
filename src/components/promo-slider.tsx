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
}: {
  slides: readonly Slide[];
  locale: Locale;
  /** Fotos por índice de slide; si falta, cae al degradado. */
  images?: (string | undefined)[];
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
          <div className="relative isolate text-white">
            {images?.[n] ? (
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${images[n]})` }}
              />
            ) : (
              <div className={`absolute inset-0 -z-10 ${PHOTO[s.photo]}`} />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noche/80 via-noche/35 to-transparent" />

            <div className="container-x pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
              <div className="max-w-2xl">
                <span className="eyebrow inline-block rounded-full bg-coral px-3 py-1.5 text-white">
                  {s.eyebrow}
                </span>
                <h2 className="mt-5 text-3xl leading-tight sm:text-5xl lg:text-6xl">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-white/80">
                  {s.body}
                </p>
                <Link
                  href={`/${locale}${s.href}`}
                  className="btn-grad mt-7 inline-block rounded-full px-7 py-3.5 text-sm"
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
        </div>
      </div>
    </section>
  );
}
