import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, getTours } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import { CATEGORY_ORDER, byCategory, type Category } from "@/lib/activities";
import { PageShell, PageHero } from "@/components/page-shell";
import { ActivityCard } from "@/components/activity-card";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tours">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.tours.title,
    description: t.tours.subtitle,
    alternates: {
      canonical: `/${locale}/tours`,
      languages: {
        "es-MX": "/es/tours",
        "en-US": "/en/tours",
        "x-default": "/es/tours",
      },
    },
  };
}

export default async function ToursIndex({
  params,
}: PageProps<"/[locale]/tours">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getDictionary(locale);
  const tours = await getTours(locale);

  const catLabel: Record<Category, string> = {
    atv: t.tours.catAtv,
    utv: t.tours.catUtv,
    camel: t.tours.catCamel,
    horse: t.tours.catHorse,
    skybike: t.tours.catSkybike,
    bike: t.tours.catBike,
    combo: t.tours.catCombo,
  };

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.tours.eyebrow}
        title={t.tours.title}
        subtitle={t.tours.subtitle}
      />

      {/* Índice rápido por categoría */}
      <div className="sticky top-[4.5rem] z-30 border-b border-linea bg-fondo/85 backdrop-blur-sm">
        <div className="container-x flex gap-5 overflow-x-auto py-3.5">
          {CATEGORY_ORDER.map((c) => (
            <Link
              key={c}
              href={`/${locale}/actividades/${c}`}
              className="shrink-0 text-sm font-medium text-texto transition-colors hover:text-marca"
            >
              {catLabel[c]}
            </Link>
          ))}
        </div>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const items = byCategory(category);
        if (items.length === 0) return null;

        return (
          <section
            key={category}
            id={category}
            className="scroll-mt-32 border-b border-linea py-12 last:border-0 sm:py-16"
          >
            <div className="container-x">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl sm:text-3xl">{catLabel[category]}</h2>
                  <span className="font-display text-sm font-semibold text-tenue">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <Link
                  href={`/${locale}/actividades/${category}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-marca hover:underline"
                >
                  {catLabel[category]}
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M10.6 4.6l5 5-5 5-1.4-1.4 2.6-2.6H4v-2h7.8L9.2 6z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        );
      })}
    </PageShell>
  );
}
