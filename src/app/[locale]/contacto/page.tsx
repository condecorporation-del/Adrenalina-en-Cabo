import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import {
  EMAIL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP,
} from "@/lib/activities";
import { PageShell, PageHero } from "@/components/page-shell";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contacto">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.contact.title,
    description: t.contact.subtitle,
    alternates: {
      canonical: `/${locale}/contacto`,
      languages: {
        "es-MX": "/es/contacto",
        "en-US": "/en/contacto",
        "x-default": "/es/contacto",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  const channels = [
    {
      title: t.contact.whatsappTitle,
      body: t.contact.whatsappBody,
      value: PHONE_DISPLAY,
      href: `https://wa.me/${WHATSAPP}`,
      external: true,
    },
    {
      title: t.contact.phoneTitle,
      body: t.contact.phoneBody,
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_HREF}`,
      external: false,
    },
    {
      title: t.contact.emailTitle,
      body: t.contact.emailBody,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      external: false,
    },
  ];

  return (
    <PageShell locale={locale} t={t}>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group rounded-2xl border border-linea bg-panel p-7 transition-colors hover:border-marca"
            >
              <h2 className="text-xl">{c.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-texto">
                {c.body}
              </p>
              <span className="mt-5 block font-display text-base font-bold text-marca">
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl sm:text-3xl">{t.contact.locationTitle}</h2>
            <p className="mt-3 leading-relaxed text-texto">
              {t.contact.locationBody}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full border border-linea bg-panel px-5 py-2.5 text-sm font-semibold transition-colors hover:border-marca hover:text-marca"
            >
              {t.contact.mapsCta}
            </a>

            <h2 className="mt-10 text-2xl sm:text-3xl">
              {t.contact.hoursTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-texto">
              {t.contact.hoursBody}
            </p>
          </div>

          <div className="rounded-2xl border border-linea bg-panel p-7">
            <h2 className="text-2xl">{t.contact.groupTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-texto">
              {t.contact.groupBody}
            </p>
            <Link
              href={`/${locale}/grupos`}
              className="mt-6 block rounded-full btn-grad px-6 py-3.5 text-center text-sm font-semibold"
            >
              {t.contact.groupCta}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
