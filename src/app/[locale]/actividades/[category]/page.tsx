import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, getTours } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import {
  CATEGORY_ORDER,
  DEPARTURES,
  WHATSAPP,
  byCategory,
  type Category,
} from "@/lib/activities";
import { PageShell } from "@/components/page-shell";
import { ActivityCard, Star } from "@/components/activity-card";
import { Photo } from "@/components/photo";

const isCategory = (v: string): v is Category =>
  (CATEGORY_ORDER as readonly string[]).includes(v);

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CATEGORY_ORDER.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/actividades/[category]">): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) return {};

  const t = await getDictionary(locale);
  const c = (t.categories as Record<string, { name: string; tagline: string }>)[
    category
  ];

  return {
    title: c.name,
    description: c.tagline,
    alternates: {
      canonical: `/${locale}/actividades/${category}`,
      languages: {
        "es-MX": `/es/actividades/${category}`,
        "en-US": `/en/actividades/${category}`,
        "x-default": `/es/actividades/${category}`,
      },
    },
  };
}

type CategoryContent = {
  name: string;
  tagline: string;
  intro: string;
  note: string;
};

export default async function CategoryPage({
  params,
}: PageProps<"/[locale]/actividades/[category]">) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) notFound();

  const t = await getDictionary(locale);
  const tours = await getTours(locale);
  const cats = t.categories as Record<string, CategoryContent>;
  const c = cats[category];

  const items = byCategory(category);
  const cheapest = Math.min(...items.map((a) => a.price));
  /* La foto del encabezado es la de la primera actividad de la categoría. */
  const cover = items[0];

  const others = CATEGORY_ORDER.filter((x) => x !== category);

  return (
    <PageShell locale={locale} t={t}>
      {/* ------------------------------------------------------------- HERO */}
      <section className="relative isolate overflow-hidden text-white">
        <Photo
          activity={cover}
          alt={c.name}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noche/80 via-noche/35 to-transparent" />

        <div className="container-x py-16 sm:py-24 lg:py-28">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M9.4 15.4l-5-5 5-5 1.4 1.4L8.2 9.4H16v2H8.2l2.6 2.6z" />
            </svg>
            {t.detail.back}
          </Link>

          <span className="eyebrow mt-6 block text-aqua">{t.tours.eyebrow}</span>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            {c.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {c.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <span>
              <span className="block text-xs text-white/60">
                {t.tours.from}
              </span>
              <span className="font-display text-2xl font-extrabold">
                ${cheapest}
              </span>
            </span>
            <span>
              <span className="block text-xs text-white/60">
                {t.tours.eyebrow}
              </span>
              <span className="font-display text-2xl font-extrabold">
                {String(items.length).padStart(2, "0")}
              </span>
            </span>
            <span>
              <span className="block text-xs text-white/60">
                {t.detail.departures}
              </span>
              <span className="font-display text-2xl font-extrabold">
                {DEPARTURES.length}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- INTRO */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-4">
            {c.intro.split("\n\n").map((p) => (
              <p key={p} className="text-lg leading-relaxed text-texto">
                {p}
              </p>
            ))}
          </div>

          <aside className="edge h-fit">
            <div className="edge-in p-6">
              <h2 className="text-lg">{t.detail.departures}</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {DEPARTURES.map((time) => (
                  <span
                    key={time}
                    className="rounded-md border border-linea px-2.5 py-1 font-display text-xs font-semibold"
                  >
                    {time}
                  </span>
                ))}
              </div>
              <p className="mt-4 border-t border-linea pt-4 text-sm leading-relaxed text-texto">
                {c.note}
              </p>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(c.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-naranja mt-5 block rounded-full px-6 py-3 text-center text-sm font-semibold"
              >
                {t.detail.bookCta}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------ LAS ACTIVIDADES */}
      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">{t.tours.title}</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((activity) => (
              <ActivityCard
                key={activity.slug}
                activity={activity}
                locale={locale}
                name={tours[activity.slug].name}
                tagline={tours[activity.slug].tagline}
                labels={t.tours}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------- OTRAS CATEGORÍAS */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-2xl sm:text-3xl">{t.detail.related}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((oc) => {
              const first = byCategory(oc)[0];
              return (
                <Link
                  key={oc}
                  href={`/${locale}/actividades/${oc}`}
                  className="edge edge-i glow group relative"
                >
                  <div className="edge-in overflow-hidden">
                    <Photo
                      activity={first}
                      alt={cats[oc].name}
                      className="aspect-[4/3] w-full"
                      sizes="(min-width: 1024px) 20vw, 50vw"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-noche/85 to-transparent" />
                      <span className="absolute bottom-3 left-4 right-4 font-display text-sm font-bold text-white">
                        {cats[oc].name}
                      </span>
                    </Photo>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marcador de calificación, para que la categoría cierre con prueba. */}
      <section className="border-t border-linea bg-fondo-2 py-10">
        <div className="container-x flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-sol" />
            ))}
          </span>
          <span className="text-sm text-texto">
            <strong className="text-hueso">4.9</strong> {t.detail.rated}{" "}
            {items.reduce((n, a) => n + a.reviews, 0)} {t.tours.reviews}
          </span>
        </div>
      </section>
    </PageShell>
  );
}
