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
   * siempre sólido, como antes. Con el mega-panel o el menú móvil abiertos
   * también se fuerza sólido: la barra debe ser legible sobre su propio
   * panel (el mismo comportamiento que visitabudhabi.ae).
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

  /* Escape cierra el mega-panel, como el botón X de la referencia. */
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  /* El overlay móvil ocupa toda la pantalla: se bloquea el scroll de fondo. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primary = [
    { href: `/${locale}/pase-de-dia`, label: nav.pass },
    { href: `/${locale}/ninos`, label: nav.kids },
    { href: `/${locale}/grupos`, label: nav.groups },
    { href: `/${locale}/nosotros`, label: nav.about },
    { href: `/${locale}/contacto`, label: nav.contact },
  ];

  const floating = overHero && !scrolled && !menu && !open;

  return (
    <header
      onMouseLeave={() => setMenu(false)}
      className={`${overHero ? "fixed" : "sticky"} top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        floating
          ? "border-transparent bg-gradient-to-b from-abismo/50 to-transparent"
          : "border-linea bg-fondo/85 shadow-[0_2px_24px_-8px_rgb(16_24_32/0.12)] backdrop-blur-xl"
      }`}
    >
      {/* Backdrop del mega-panel: oscurece la página bajo el menú, como en
          visitabudhabi.ae. Un clic fuera también lo cierra. */}
      {menu && (
        <div
          aria-hidden
          onClick={() => setMenu(false)}
          className="fade-in fixed inset-0 z-0 hidden bg-noche/40 backdrop-blur-[2px] lg:block"
        />
      )}

      <div className="container-x relative z-10 flex h-20 items-center justify-between gap-5 sm:h-24">
        {/* El emblema, a propósito más grande que la barra: rompe el marco
            hacia abajo como un parche, no un logo de trámite. Alineado
            arriba (no al centro) para que nunca se corte contra el borde
            superior de la ventana, que es donde vive el header fijo. */}
        <Link
          href={`/${locale}`}
          className="relative z-10 mt-1.5 h-20 w-20 shrink-0 self-start drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 sm:mt-2 sm:h-28 sm:w-28"
        >
          <Image
            src="/logo-adrenalina-cabo.png"
            alt="Adrenalina Cabo"
            fill
            sizes="112px"
            className="object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {/* Actividades dispara el mega-panel de ancho completo. El enlace
              sigue llevando a /tours al hacer clic; el panel se abre al
              pasar el cursor y se mantiene mientras se recorra el header. */}
          <div className="relative" onMouseEnter={() => setMenu(true)}>
            <Link
              href={`/${locale}/tours`}
              className={`relative flex items-center gap-1 py-6 text-sm font-semibold transition-colors after:absolute after:bottom-5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-marca after:to-coral after:transition-transform after:duration-300 hover:after:scale-x-100 ${
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
          </div>

          {primary.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-marca after:to-coral after:transition-transform after:duration-300 hover:after:scale-x-100 ${
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

          {/* Hamburguesa que se funde en X: el mismo gesto de la referencia. */}
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setMenu(false);
            }}
            aria-expanded={open}
            aria-label={open ? nav.closeMenu : nav.menu}
            className="-mr-1 p-2 lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""} ${floating ? "bg-white" : "bg-noche"}`}
            />
            <span
              className={`mt-1.5 block h-0.5 w-6 transition-all duration-300 ${open ? "opacity-0" : ""} ${floating ? "bg-white" : "bg-noche"}`}
            />
            <span
              className={`mt-1.5 block h-0.5 w-6 transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""} ${floating ? "bg-white" : "bg-noche"}`}
            />
          </button>
        </div>
      </div>

      {/* Mega-panel de escritorio: ancho completo bajo el header, al estilo
          de visitabudhabi.ae. A la izquierda la lista de categorías con
          chevrons; a la derecha una tarjeta editorial con foto y el CTA de
          reservar. Solo etiquetas que ya existen — cero texto nuevo. */}
      {menu && (
        <div className="menu-in absolute inset-x-0 top-full z-10 hidden border-t border-linea bg-fondo shadow-[0_40px_80px_-40px_rgb(9_36_52/0.35)] lg:block">
          <div className="container-x grid gap-10 py-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="eyebrow text-tenue">{nav.tours}</span>
              <ul className="mt-4 divide-y divide-linea border-y border-linea">
                {categories.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={() => setMenu(false)}
                      className="group flex items-center justify-between py-4 text-lg font-semibold text-noche transition-colors hover:text-marca"
                    >
                      {c.label}
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 fill-current text-tenue transition-all duration-300 group-hover:translate-x-1 group-hover:text-coral"
                        aria-hidden
                      >
                        <path d="M7.4 4.6L12.8 10l-5.4 5.4L6 13.8l3.8-3.8L6 6.2z" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <Link
                href={`/${locale}/tours`}
                onClick={() => setMenu(false)}
                className="group relative block overflow-hidden rounded-2xl shadow-suave"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/tours/hero-skybike.webp"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 42rem"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abismo/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-fondo/90 px-4 py-2 text-sm font-bold text-noche backdrop-blur-sm transition-colors group-hover:bg-fondo">
                    {nav.tours}
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5 fill-current text-coral transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    >
                      <path d="M7.4 4.6L12.8 10l-5.4 5.4L6 13.8l3.8-3.8L6 6.2z" />
                    </svg>
                  </span>
                </div>
              </Link>
              <div className="mt-5 flex justify-end">
                <Link
                  href={`/${locale}/tours`}
                  onClick={() => setMenu(false)}
                  className="btn-naranja rounded-full px-6 py-3 text-sm font-bold"
                >
                  {nav.book}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menú móvil: overlay a pantalla completa con acordeón de
          Actividades y enlaces grandes en Archivo, como el drawer de la
          referencia. El scroll de fondo queda bloqueado mientras está
          abierto. */}
      {open && (
        <div className="fade-in fixed inset-0 z-0 overflow-y-auto bg-fondo lg:hidden">
          <nav className="container-x flex flex-col pb-12 pt-28 sm:pt-32">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              className="flex items-center justify-between border-b border-linea py-4 text-left font-display text-2xl font-bold"
            >
              {nav.tours}
              <svg
                viewBox="0 0 20 20"
                className={`h-5 w-5 fill-current transition-transform duration-300 ${menu ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M5.6 7.4L10 11.8l4.4-4.4L15.8 8.8 10 14.6 4.2 8.8z" />
              </svg>
            </button>

            {menu && (
              <div className="border-b border-linea">
                <Link
                  href={`/${locale}/tours`}
                  onClick={() => setOpen(false)}
                  className="rise block py-3 pl-4 text-base font-semibold text-marca"
                  style={{ animationDelay: "40ms" }}
                >
                  {nav.tours}
                </Link>
                {categories.map((c, i) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="rise block py-3 pl-4 text-base text-texto"
                    style={{ animationDelay: `${80 + i * 40}ms` }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}

            {primary.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rise border-b border-linea py-4 font-display text-2xl font-bold"
                style={{ animationDelay: `${60 + i * 50}ms` }}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col">
              <Link
                href={`/${locale}/tarifa-local`}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-texto"
              >
                {nav.local}
              </Link>
              <Link
                href={`/${locale}/socios`}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-texto"
              >
                {nav.partners}
              </Link>
            </div>

            <Link
              href={`/${locale}/tours`}
              onClick={() => setOpen(false)}
              className="btn-naranja mt-6 rounded-full px-6 py-4 text-center text-sm font-bold"
            >
              {nav.book}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
