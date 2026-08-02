import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import { PageShell, PageHero } from "@/components/page-shell";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/nosotros">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.about.title,
    description: t.about.lead,
    alternates: {
      canonical: `/${locale}/nosotros`,
      languages: {
        "es-MX": "/es/nosotros",
        "en-US": "/en/nosotros",
        "x-default": "/es/nosotros",
      },
    },
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/nosotros">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        subtitle={t.about.lead}
      />

      {/* Misión y visión */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-2xl border border-linea bg-panel p-7">
            <h2 className="text-2xl">{t.about.missionTitle}</h2>
            <p className="mt-3 leading-relaxed text-texto">
              {t.about.missionBody}
            </p>
          </div>
          <div className="rounded-2xl border border-linea bg-panel p-7">
            <h2 className="text-2xl">{t.about.visionTitle}</h2>
            <p className="mt-3 leading-relaxed text-texto">
              {t.about.visionBody}
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            {t.about.valuesTitle}
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {t.about.values.map((item, i) => (
              <div key={item.title} className="border-t border-linea pt-5">
                <span className="font-display text-xs font-bold text-marca">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg leading-snug">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-texto">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenidades del parque */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">
            {t.about.amenitiesTitle}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.amenities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-linea bg-panel p-6 transition-colors hover:border-marca/40"
              >
                <h3 className="text-base font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-texto">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
