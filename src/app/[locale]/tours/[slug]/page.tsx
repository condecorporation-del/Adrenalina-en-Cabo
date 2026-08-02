import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, getTours } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/locales";
import {
  ACTIVITIES,
  CHILD_MAX_AGE,
  DEPARTURES,
  PARK_FEE,
  WHATSAPP,
  getActivity,
} from "@/lib/activities";
import { PageShell } from "@/components/page-shell";
import { ActivityCard, Star } from "@/components/activity-card";
import { Photo } from "@/components/photo";
import { TourTabs } from "@/components/tour-tabs";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ACTIVITIES.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tours/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !getActivity(slug)) return {};
  const tours = await getTours(locale);
  const tour = tours[slug];
  return {
    title: tour.name,
    description: tour.tagline,
    alternates: {
      canonical: `/${locale}/tours/${slug}`,
      languages: {
        "es-MX": `/es/tours/${slug}`,
        "en-US": `/en/tours/${slug}`,
        "x-default": `/es/tours/${slug}`,
      },
    },
  };
}

function Bullet({
  children,
  tone = "ok",
}: {
  children: React.ReactNode;
  tone?: "ok" | "warn";
}) {
  return (
    <li className="flex gap-3 text-[0.9375rem] leading-relaxed">
      <svg
        viewBox="0 0 20 20"
        className={`mt-1 h-4 w-4 shrink-0 ${tone === "ok" ? "fill-marca" : "fill-coral"}`}
        aria-hidden
      >
        <path d="M8.2 13.4L5 10.2l1.4-1.4 1.8 1.8 5.4-5.4L15 6.6z" />
        <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export default async function TourPage({
  params,
}: PageProps<"/[locale]/tours/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const activity = getActivity(slug);
  if (!activity) notFound();

  const t = await getDictionary(locale);
  const tours = await getTours(locale);
  const tour = tours[slug];
  const tb = t.tabs;
  const d = t.detail;

  const related = ACTIVITIES.filter(
    (a) => a.slug !== slug && a.category === activity.category,
  )
    .concat(ACTIVITIES.filter((a) => a.slug !== slug))
    .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i)
    .slice(0, 3);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    locale === "es"
      ? `Hola, quiero reservar el tour "${tour.name}".`
      : `Hi, I'd like to book the "${tour.name}" tour.`,
  )}`;

  const hours = activity.durationMin / 60;

  /* El precio del tour NO incluye la entrada al parque: se cobra aparte y es
     obligatoria. Mostramos el total real para que nadie se lleve sorpresas. */
  const totalAdulto = activity.price + PARK_FEE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.name,
    description: tour.tagline,
    brand: { "@type": "Brand", name: "Adrenalina Cabo" },
    offers: {
      "@type": "Offer",
      price: activity.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://adrenalinacabo.com/${locale}/tours/${slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: activity.rating,
      reviewCount: activity.reviews,
    },
  };

  return (
    <PageShell locale={locale} t={t}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------------------- HERO */}
      <section className="relative isolate overflow-hidden text-white">
        <Photo
          activity={activity}
          alt={tour.name}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noche/80 via-noche/35 to-transparent" />

        <div className="container-x py-14 sm:py-20 lg:py-24">
          <Link
            href={`/${locale}/actividades/${activity.category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 fill-current"
              aria-hidden
            >
              <path d="M9.4 15.4l-5-5 5-5 1.4 1.4L8.2 9.4H16v2H8.2l2.6 2.6z" />
            </svg>
            {d.back}
          </Link>

          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            {tour.name}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80 sm:text-lg">
            {tour.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Star className="h-4 w-4 fill-sol" />
              {activity.rating.toFixed(1)}
              <span className="font-normal text-white/65">
                {d.rated} {activity.reviews} {t.tours.reviews}
              </span>
            </span>
            <span className="text-white/80">
              {hours} {t.tours.hours}
            </span>
            <span className="text-white/80">
              {t.tours.minAge} {activity.minAgeDriver} {t.tours.years}
            </span>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_20rem] lg:gap-14 lg:py-16">
        <div className="min-w-0">
          <section className="mb-10 space-y-4">
            {tour.desc.split("\n\n").map((p) => (
              <p key={p} className="leading-relaxed text-texto">
                {p}
              </p>
            ))}
          </section>

          {/* -------------------------------------------------------- PESTAÑAS
              Las seis de la referencia, con su contenido real. */}
          <TourTabs
            labels={{
              reserve: tb.reserve,
              included: tb.included,
              extra: tb.extra,
              before: tb.before,
              recommend: tb.recommend,
              safety: tb.safety,
            }}
            panels={{
              reserve: (
                <div>
                  <dl className="overflow-hidden rounded-xl border border-linea">
                    <div className="flex items-center justify-between gap-4 border-b border-linea px-5 py-4">
                      <dt className="font-semibold">{tb.adultPrice}</dt>
                      <dd className="text-lg font-bold text-marca">
                        ${activity.price} USD{" "}
                        <span className="text-sm font-normal text-tenue">
                          {tb.perPerson}
                        </span>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-linea px-5 py-4">
                      <dt className="font-semibold">{tb.childPrice}</dt>
                      <dd className="text-lg font-bold text-marca">
                        ${activity.childPrice} USD{" "}
                        <span className="text-sm font-normal text-tenue">
                          {tb.perPerson}
                        </span>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-coral-soft px-5 py-4">
                      <dt className="font-semibold">{tb.parkFee}</dt>
                      <dd className="text-lg font-bold text-coral">
                        ${PARK_FEE} USD{" "}
                        <span className="text-sm font-normal text-tenue">
                          {tb.perPerson}
                        </span>
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-texto">{tb.childNote}</p>
                  <p className="mt-2 text-sm font-semibold text-coral">
                    {tb.parkFeeNote}
                  </p>
                </div>
              ),

              included: (
                <div>
                  <h3 className="text-lg">{tb.includedTitle}</h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {t.included.map((x) => (
                      <Bullet key={x}>{x}</Bullet>
                    ))}
                  </ul>
                </div>
              ),

              extra: (
                <div>
                  <h3 className="text-lg">{tb.extraTitle}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {t.extraFees.map((x) => (
                      <Bullet key={x} tone="warn">
                        {x}
                      </Bullet>
                    ))}
                  </ul>
                </div>
              ),

              before: (
                <div>
                  <h3 className="text-lg">{tb.beforeTitle}</h3>
                  <dl className="mt-4 overflow-hidden rounded-xl border border-linea">
                    {(
                      [
                        {
                          k: d.reqAgeDriver,
                          v: `${activity.minAgeDriver} ${t.tours.years}`,
                        },
                        activity.minAgePassenger !== null && {
                          k: d.reqAgePassenger,
                          v: `${activity.minAgePassenger} ${t.tours.years}`,
                        },
                        activity.minHeightCm !== null && {
                          k: d.reqHeight,
                          v: `${(activity.minHeightCm / 100).toFixed(2)} m`,
                        },
                        activity.maxWeightKg !== null && {
                          k: d.reqWeight,
                          v: `${activity.maxWeightKg} kg (${Math.round(activity.maxWeightKg * 2.205)} lbs)`,
                        },
                        {
                          k: tb.childPrice,
                          v: `≤ ${CHILD_MAX_AGE} ${t.tours.years}`,
                        },
                      ].filter(Boolean) as { k: string; v: string }[]
                    ).map((row) => (
                      <div
                        key={row.k}
                        className="flex items-center justify-between gap-4 border-b border-linea px-5 py-3.5 last:border-0"
                      >
                        <dt className="text-sm text-texto">{row.k}</dt>
                        <dd className="text-sm font-bold">{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 rounded-xl border-l-4 border-coral bg-coral-soft p-4 text-sm leading-relaxed">
                    {d.warningBody}
                  </p>
                  <p className="mt-3 text-sm text-texto">{tb.admission}</p>
                </div>
              ),

              recommend: (
                <div>
                  <h3 className="text-lg">{tb.recommendTitle}</h3>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {t.recommendations.map((x) => (
                      <Bullet key={x}>{x}</Bullet>
                    ))}
                  </ul>
                </div>
              ),

              safety: (
                <div>
                  <h3 className="text-lg">{tb.safetyTitle}</h3>
                  <ul className="mt-4 space-y-3">
                    {t.safety.map((x) => (
                      <Bullet key={x} tone="warn">
                        {x}
                      </Bullet>
                    ))}
                  </ul>
                </div>
              ),
            }}
          />

          <section className="mt-12">
            <h2 className="text-xl">{tb.cancelTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {t.cancellation.map((x) => (
                <Bullet key={x}>{x}</Bullet>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-xl">{tb.infoTitle}</h2>
            <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-linea bg-linea sm:grid-cols-2">
              {[
                { k: tb.infoDuration, v: `${hours} ${t.tours.hours}` },
                {
                  k: tb.infoMinAge,
                  v: `${activity.minAgeDriver} ${t.tours.years}`,
                },
                { k: tb.infoTransport, v: tb.infoTransportValue },
                { k: tb.infoDepartures, v: DEPARTURES.join(" · ") },
              ].map((r) => (
                <div key={r.k} className="bg-panel px-5 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-tenue">
                    {r.k}
                  </dt>
                  <dd className="mt-1 font-semibold">{r.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12">
            <h2 className="text-xl">{tb.payTitle}</h2>
            <p className="mt-3 text-texto">{tb.payBody}</p>
          </section>
        </div>

        {/* ---------------------------------------------------- CAJA DE RESERVA */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-linea bg-panel p-6 shadow-[0_10px_36px_-22px_rgb(0_0_0/0.35)]">
            <span className="eyebrow text-tenue">{tb.adultPrice}</span>
            <div className="mt-1 flex items-baseline gap-2.5">
              <span className="text-4xl font-bold text-marca">
                ${activity.price}
              </span>
              {activity.priceBefore && (
                <span className="text-base text-tenue line-through">
                  ${activity.priceBefore}
                </span>
              )}
            </div>
            <span className="text-xs text-tenue">USD · {tb.perPerson}</span>

            <div className="mt-4 space-y-2 border-t border-linea pt-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-texto">{tb.childPrice}</span>
                <span className="font-bold">${activity.childPrice}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-coral">+ {tb.parkFee}</span>
                <span className="font-bold text-coral">${PARK_FEE}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-linea pt-2">
                <span className="font-semibold">{tb.total}</span>
                <span className="font-bold">${totalAdulto} USD</span>
              </div>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-naranja mt-5 block rounded-full px-6 py-3.5 text-center text-sm"
            >
              {d.bookCta}
            </a>
            <p className="mt-3 text-xs leading-relaxed text-tenue">
              {d.bookNote}
            </p>

            <div className="mt-5 border-t border-linea pt-4">
              <h3 className="eyebrow text-tenue">{tb.infoDepartures}</h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {DEPARTURES.map((time) => (
                  <span
                    key={time}
                    className="rounded-md border border-linea px-2 py-1 text-xs font-semibold"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* -------------------------------------------------------- RELACIONADAS */}
      <section className="border-t border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-2xl sm:text-3xl">{d.related}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ActivityCard
                key={a.slug}
                activity={a}
                locale={locale}
                name={tours[a.slug].name}
                tagline={tours[a.slug].tagline}
                labels={t.tours}
              />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
