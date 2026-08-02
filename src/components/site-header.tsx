"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locales";

export type NavLabels = {
  home: string;
  pass: string;
  tours: string;
  combos: string;
  kids: string;
  groups: string;
  about: string;
  faq: string;
  contact: string;
  local: string;
  partners: string;
  book: string;
  menu: string;
  closeMenu: string;
};

export function SiteHeader({
  locale,
  nav,
  categories,
  overHero = false,
}: {
  locale: Locale;
  nav: NavLabels;
  /** Submenú de Actividades: se arma desde las categorías del catálogo. */
  categories: { href: string; label: string }[];
  /**
   * Si la página abre con una foto o video a pantalla completa (la portada),
   * el header flota transparente encima con logo y texto en blanco, y se
   * vuelve sólido en cuanto hay scroll. En páginas interiores se queda
   * siempre sólido, como antes.
   */
  overHero?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const other: Locale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primary = [
    { href: `/${locale}/pase-de-dia`, label: nav.pass },
    { href: `/${locale}/ninos`, label: nav.kids },
    { href: `/${locale}/grupos`, label: nav.groups },
    { href: `/${locale}/nosotros`, label: nav.about },
    { href: `/${locale}/contacto`, label: nav.contact },
  ];

  const floating = overHero && !scrolled;

  return (
    <header
      className={`${overHero ? "fixed" : "sticky"} top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        floating
          ? "border-transparent bg-transparent"
          : "border-linea bg-fondo/90 shadow-[0_2px_24px_-8px_rgb(16_24_32/0.1)] backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-5 sm:h-24">
        {/* El emblema, a propósito más grande que la barra: rompe el marco
            hacia abajo como un parche, no un logo de trámite. Alineado
            arriba (no al centro) para que nunca se corte contra el borde
            superior de la ventana, que es donde vive el header fijo. */}
        <Link
          href={`/${locale}`}
          className="relative z-10 mt-1.5 h-24 w-24 shrink-0 self-start drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 sm:mt-2 sm:h-32 sm:w-32"
        >
          <Image
            src="/logo-adrenalina-cabo.png"
            alt="Adrenalina Cabo"
            fill
            sizes="128px"
            className="object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {/* Actividades con submenú, como el dropdown de Tours de la referencia */}
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <Link
              href={`/${locale}/tours`}
              className={`flex items-center gap-1 py-6 text-sm font-semibold transition-colors ${
                floating ? "text-white hover:text-white/80" : "text-texto hover:text-marca"
              }`}
              onFocus={() => setMenu(true)}
            >
              {nav.tours}
              <svg
                viewBox="0 0 20 20"
                className={`h-3.5 w-3.5 fill-current transition-transform ${menu ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M5.6 7.4L10 11.8l4.4-4.4L15.8 8.8 10 14.6 4.2 8.8z" />
              </svg>
            </Link>

            {menu && (
              <div className="absolute left-0 top-full w-60 rounded-2xl border border-linea bg-panel py-2 shadow-[0_20px_50px_-24px_rgb(22_17_13/0.5)]">
                {categories.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block px-4 py-2.5 text-sm font-medium text-texto transition-colors hover:bg-panel-2 hover:text-marca"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primary.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors ${
                floating ? "text-white hover:text-white/80" : "text-texto hover:text-marca"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">

          <Link
            href={`/${other}`}
            className={`rounded-full border px-2.5 py-1 text-[0.6875rem] font-bold tracking-wider transition-colors ${
              floating
                ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                : "border-linea text-tenue hover:border-marca hover:text-marca"
            }`}
          >
            {other.toUpperCase()}
          </Link>

          <Link
            href={`/${locale}/tours`}
            className="hidden rounded-full btn-naranja px-5 py-2.5 text-sm font-bold sm:inline-block"
          >
            {nav.book}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? nav.closeMenu : nav.menu}
            className="-mr-1 p-2 lg:hidden"
          >
            <span className={`block h-0.5 w-6 ${floating ? "bg-white" : "bg-noche"}`} />
            <span className={`mt-1.5 block h-0.5 w-6 ${floating ? "bg-white" : "bg-noche"}`} />
            <span className={`mt-1.5 block h-0.5 w-6 ${floating ? "bg-white" : "bg-noche"}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-linea bg-fondo lg:hidden">
          <div className="container-x flex flex-col py-1">
            <Link
              href={`/${locale}/tours`}
              onClick={() => setOpen(false)}
              className="border-b border-linea py-3.5 text-sm font-bold"
            >
              {nav.tours}
            </Link>
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="border-b border-linea py-3 pl-4 text-sm text-texto"
              >
                {c.label}
              </Link>
            ))}
            {primary.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-linea py-3.5 text-sm font-medium text-texto"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/tarifa-local`}
              onClick={() => setOpen(false)}
              className="border-b border-linea py-3.5 text-sm font-medium text-texto"
            >
              {nav.local}
            </Link>
            <Link
              href={`/${locale}/socios`}
              onClick={() => setOpen(false)}
              className="border-b border-linea py-3.5 text-sm font-medium text-texto"
            >
              {nav.partners}
            </Link>
            <Link
              href={`/${locale}/tours`}
              onClick={() => setOpen(false)}
              className="my-3 rounded-full btn-grad px-5 py-3 text-center text-sm font-semibold"
            >
              {nav.book}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
