import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP } from "@/lib/activities";
import { PageShell, PageHero } from "@/components/page-shell";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/socios">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.partners.title,
    description: t.partners.subtitle,
    alternates: {
      canonical: `/${locale}/socios`,
      languages: {
        "es-MX": "/es/socios",
        "en-US": "/en/socios",
        "x-default": "/es/socios",
      },
    },
  };
}

export default async function PartnersPage({
  params,
}: PageProps<"/[locale]/socios">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.partners.eyebrow}
        title={t.partners.title}
        subtitle={t.partners.subtitle}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">{t.partners.benefitsTitle}</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {t.partners.benefits.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-linea bg-panel p-6 transition-colors hover:border-marca/40"
              >
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

      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-8 rounded-2xl border border-linea bg-panel p-8 lg:flex-row lg:items-center lg:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl">{t.partners.ctaTitle}</h2>
            <p className="mt-3 leading-relaxed text-texto">
              {t.partners.ctaBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href={`tel:${PHONE_HREF}`}
                className="font-semibold hover:text-marca"
              >
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="text-texto hover:text-marca">
                {EMAIL}
              </a>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.partners.ctaButton)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full btn-grad px-7 py-3.5 text-center text-sm font-semibold"
          >
            {t.partners.ctaButton}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
