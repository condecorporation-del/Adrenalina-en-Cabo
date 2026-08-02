import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, getTours } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import { ACTIVITIES } from "@/lib/activities";
import { PageShell, PageHero } from "@/components/page-shell";
import { ActivityCard } from "@/components/activity-card";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/ninos">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.kids.title,
    description: t.kids.subtitle,
    alternates: {
      canonical: `/${locale}/ninos`,
      languages: {
        "es-MX": "/es/ninos",
        "en-US": "/en/ninos",
        "x-default": "/es/ninos",
      },
    },
  };
}

export default async function KidsPage({ params }: PageProps<"/[locale]/ninos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getDictionary(locale);
  const tours = await getTours(locale);
  const kidsActivities = ACTIVITIES.filter((a) => a.kids);

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.kids.eyebrow}
        title={t.kids.title}
        subtitle={t.kids.subtitle}
      />

      {/* Kids Club */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="ph-dunas aspect-[4/3] w-full rounded-xl" />
          <div>
            <h2 className="text-3xl sm:text-4xl">{t.kids.clubTitle}</h2>
            <p className="mt-4 leading-relaxed text-texto">{t.kids.clubBody}</p>
            <ul className="mt-6 space-y-3">
              {t.kids.clubItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 h-4 w-4 shrink-0 fill-aqua"
                    aria-hidden
                  >
                    <path d="M8.2 13.4L5 10.2l1.4-1.4 1.8 1.8 5.4-5.4L15 6.6z" />
                    <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Actividades para niños */}
      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">{t.kids.activitiesTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-texto">
            {t.kids.activitiesBody}
          </p>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kidsActivities.map((activity) => (
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

      {/* Seguridad */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">{t.kids.safetyTitle}</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.kids.safetyItems.map((item, i) => (
              <div key={item.title} className="border-t border-linea pt-5">
                <span className="font-display text-xs font-bold text-marca">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg leading-snug">{item.title}</h3>
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
