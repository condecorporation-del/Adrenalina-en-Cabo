import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import { WHATSAPP } from "@/lib/activities";
import { PageShell, PageHero } from "@/components/page-shell";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tarifa-local">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.local.title,
    description: t.local.subtitle,
    alternates: {
      canonical: `/${locale}/tarifa-local`,
      languages: {
        "es-MX": "/es/tarifa-local",
        "en-US": "/en/tarifa-local",
        "x-default": "/es/tarifa-local",
      },
    },
  };
}

export default async function LocalRatePage({
  params,
}: PageProps<"/[locale]/tarifa-local">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.local.eyebrow}
        title={t.local.title}
        subtitle={t.local.subtitle}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-2xl sm:text-3xl">{t.local.howTitle}</h2>
            <ol className="mt-7">
              {t.local.how.map((step, i) => (
                <li key={step} className="relative flex gap-5 pb-7 last:pb-0">
                  {i < t.local.how.length - 1 && (
                    <span
                      className="absolute left-[1.375rem] bottom-0 top-11 w-px bg-linea"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-linea bg-panel font-display text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="pt-2.5 leading-relaxed text-texto">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-linea bg-panel p-7">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.local.cta)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full btn-grad px-6 py-3.5 text-center text-sm font-semibold text-white"
              >
                {t.local.cta}
              </a>
              <p className="mt-5 text-xs leading-relaxed text-tenue">
                {t.local.note}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
