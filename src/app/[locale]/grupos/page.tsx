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
}: PageProps<"/[locale]/grupos">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.groups.title,
    description: t.groups.subtitle,
    alternates: {
      canonical: `/${locale}/grupos`,
      languages: {
        "es-MX": "/es/grupos",
        "en-US": "/en/grupos",
        "x-default": "/es/grupos",
      },
    },
  };
}

export default async function GroupsPage({
  params,
}: PageProps<"/[locale]/grupos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.groups.eyebrow}
        title={t.groups.title}
        subtitle={t.groups.subtitle}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">{t.groups.typesTitle}</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {t.groups.types.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-linea bg-panel p-6 transition-colors hover:border-marca/40"
              >
                <h3 className="text-lg leading-snug">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-texto">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-3xl sm:text-4xl">{t.groups.includesTitle}</h2>
            <ul className="mt-6 space-y-3">
              {t.groups.includes.map((item) => (
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
            <h2 className="text-2xl">{t.groups.ctaTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-texto">
              {t.groups.ctaBody}
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.groups.ctaTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full btn-grad px-6 py-3.5 text-center text-sm font-semibold"
            >
              {t.groups.ctaButton}
            </a>
            <div className="mt-6 space-y-2 border-t border-linea pt-5 text-sm">
              <a
                href={`tel:${PHONE_HREF}`}
                className="block font-semibold hover:text-marca"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="block text-texto hover:text-marca"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
