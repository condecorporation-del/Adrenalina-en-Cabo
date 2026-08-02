import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import { PASSES, WHATSAPP } from "@/lib/activities";
import { PageShell, PageHero } from "@/components/page-shell";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/pase-de-dia">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pass.title,
    description: t.pass.subtitle,
    alternates: {
      canonical: `/${locale}/pase-de-dia`,
      languages: {
        "es-MX": "/es/pase-de-dia",
        "en-US": "/en/pase-de-dia",
        "x-default": "/es/pase-de-dia",
      },
    },
  };
}

export default async function DayPassPage({
  params,
}: PageProps<"/[locale]/pase-de-dia">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const tiers = t.pass.tiers as Record<string, { name: string; note: string }>;

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.pass.eyebrow}
        title={t.pass.title}
        subtitle={t.pass.subtitle}
      />

      {/* Los tres niveles */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {PASSES.map((tier) => {
            const info = tiers[tier.slug];
            return (
              <div
                key={tier.slug}
                className={`relative flex flex-col rounded-xl border p-7 ${
                  tier.featured
                    ? "border-marca bg-panel shadow-[0_20px_50px_-28px_rgb(226_71_15/0.6)]"
                    : "border-linea bg-panel"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-7 rounded-full btn-grad px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider">
                    {t.tours.badgePopular}
                  </span>
                )}

                <h2 className="text-2xl">{info.name}</h2>
                <p className="mt-1.5 text-sm text-tenue">
                  {tier.hours
                    ? `${t.pass.hoursLabel} ${tier.hours} ${t.tours.hours}`
                    : t.pass.hoursUnlimited}
                </p>

                <div className="mt-6 flex items-baseline gap-2.5">
                  <span className="font-display text-4xl font-extrabold">
                    ${tier.price}
                  </span>
                  {tier.priceBefore && (
                    <span className="text-base text-tenue line-through">
                      ${tier.priceBefore}
                    </span>
                  )}
                </div>
                <span className="text-xs text-tenue">
                  USD · {t.tours.perPerson}
                </span>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-texto">
                  {info.note}
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(info.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                    tier.featured
                      ? "btn-grad"
                      : "border border-linea hover:border-marca hover:text-marca"
                  }`}
                >
                  {t.pass.choose}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Incluye / No incluye */}
      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-linea bg-panel p-7">
            <h2 className="text-2xl">{t.pass.includesTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.pass.includes.map((item) => (
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

          <div className="rounded-2xl border border-linea bg-panel p-7">
            <h2 className="text-2xl">{t.pass.excludesTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.pass.excludes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-texto"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 h-4 w-4 shrink-0 fill-tenue"
                    aria-hidden
                  >
                    <path d="M13.4 5.2L10 8.6 6.6 5.2 5.2 6.6 8.6 10l-3.4 3.4 1.4 1.4L10 11.4l3.4 3.4 1.4-1.4L11.4 10l3.4-3.4z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-linea pt-5 text-xs leading-relaxed text-tenue">
              {t.pass.note}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
