import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { MAPS_URL, WHATSAPP } from "@/lib/activities";
import { PageShell } from "@/components/page-shell";
import { Star } from "@/components/activity-card";
import { CategoryTiles } from "@/components/category-tiles";
import { PromoSlider } from "@/components/promo-slider";
import { PromoCards } from "@/components/promo-cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";

/** Trazo fino y limpio, igual para los seis íconos de esta página. */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7",
  "aria-hidden": true as const,
};

const STEP_ICONS = [
  <svg key="explore" {...iconProps}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.3-4.3" />
  </svg>,
  <svg key="choose" {...iconProps}>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="M8.5 15.5l2 2 4-4.5" />
  </svg>,
  <svg key="pay" {...iconProps}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
    <path d="M2.5 10h19M6 15h4" />
  </svg>,
];

const WHY_ICONS = [
  <svg key="variety" {...iconProps}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
  </svg>,
  <svg key="safety" {...iconProps}>
    <path d="M12 3l7 3v5.5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z" />
    <path d="M9 12l2 2 4-4.5" />
  </svg>,
  <svg key="quality" {...iconProps}>
    <circle cx="12" cy="8.5" r="5.5" />
    <path d="M8.3 13.2L6.5 21l5.5-3 5.5 3-1.8-7.8" />
  </svg>,
];

/**
 * Portada — misma estructura que cactustours.com, sacada de su DOM.
 * Ver docs/comparacion-cactus.md para el inventario completo.
 *
 *   1. Carrusel de promociones
 *   2. "¡Compra ahora y ahorra!" / Promociones
 *   3. Categorías
 *   4. Bienvenida
 *   5. "3 pasos sencillos" / Cómo reservar
 *   6. Ubicación
 *   7. Testimonios
 *   8. Preguntas frecuentes
 *   9. Reserva tu tour
 *  10. ¿Por qué elegirnos?
 */

/**
 * Encabezado de sección centrado, como los suyos.
 *
 * El filete verde bajo el título es el detalle que da jerarquía sin sumar
 * peso: marca dónde empieza la sección sin necesidad de una caja ni un borde.
 */
function Titulo({
  eyebrow,
  title,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      {eyebrow && <span className="eyebrow text-coral">{eyebrow}</span>}
      <Tag
        className={`text-[1.75rem] sm:text-[2.25rem] lg:text-[2.625rem] ${eyebrow ? "mt-3.5" : ""}`}
      >
        {title}
      </Tag>
      <span className="filete mt-5" aria-hidden />
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getDictionary(locale);
  const faqHome = t.faq.items.slice(0, 5);

  return (
    <PageShell locale={locale} t={t} overHero>
      {/* ---------------------------------------------------- 1. PROMO SLIDER */}
      <PromoSlider
        slides={t.promoSlider}
        locale={locale}
        /* Una actividad distinta por diapositiva, no cuatro tomas del Sky
           Bike. El orden sigue al texto de cada slide: el parque completo,
           el 2 en 1 (cuatrimoto y camello), el 3 en 1 (motor) y el Sky Bike.
           Ojo: camellos.webp y ninos.webp son de 450 px, así que se ven
           suaves a pantalla completa. Ver public/tours/LEEME.md. */
        images={[
          "/tours/camellos.webp",
          "/tours/atv-playa.webp",
          "/tours/ninos.webp",
          "/tours/sky-bike.webp",
        ]}
        /* El camello se sube para que no se corten las caras; el RZR se baja
           un poco para que quede la unidad y no el muro del fondo. */
        focus={["center 22%", "center", "center 62%", "center"]}
      />

      {/* ----------------------------------------------------- 2. PROMOCIONES */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.promos.eyebrow} title={t.promos.title} />
          <div className="mt-10">
            <PromoCards
              promos={t.promos.items}
              locale={locale}
              labels={t.tours}
              images={{
                mar: "/tours/camellos-2.webp",
                dunas: "/tours/hero-skybike.webp",
                desierto: "/tours/torre.webp",
                canon: "/tours/utv.webp",
              }}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ 3. CATEGORÍAS */}
      <section className="border-y border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <Titulo title={t.cats.title} as="h3" />
          <div className="mt-10">
            <CategoryTiles
              locale={locale}
              labels={{
                from: t.tours.from,
                combo: t.tours.catCombo,
                pass: t.nav.pass,
                skybike: t.tours.catSkybike,
                utv: t.tours.catUtv,
                atv: t.tours.catAtv,
                camel: t.tours.catCamel,
                horse: t.tours.catHorse,
                kids: t.nav.kids,
              }}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ 4. BIENVENIDA */}
      <section className="py-16 sm:py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow text-marca">{t.welcome.eyebrow}</span>
            <h2 className="mt-3.5 text-3xl sm:text-4xl lg:text-[2.75rem]">
              {t.welcome.title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-texto">
              {t.welcome.body}
            </p>
            <p className="mt-4 max-w-lg font-semibold text-marca">
              {t.welcome.claim}
            </p>
            <Link
              href={`/${locale}/nosotros`}
              className="btn-grad mt-8 inline-block rounded-full px-7 py-3.5 text-sm"
            >
              {t.welcome.cta}
            </Link>
          </div>

          <Reveal className="relative mx-auto w-full max-w-md pb-8 sm:pb-10 lg:mx-0 lg:max-w-none">
            <div className="tile relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] shadow-alta">
              <Image
                src="/tours/sky-bike.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-[38%_center]"
              />
            </div>

            {/* La ficha rompe el borde de la foto a propósito: el mismo
                gesto de tarjeta flotante que separa un sitio con acabado
                fino de uno plano. El dato es real: el récord Guinness del
                Sky Bike, ya en el diccionario pero sin usar hasta ahora. */}
            <div className="edge shadow-alta absolute bottom-0 left-1/2 w-[calc(100%-2.5rem)] max-w-xs -translate-x-1/2 rounded-2xl bg-panel p-5 sm:left-0 sm:translate-x-0 sm:px-6">
              <span className="text-2xl font-extrabold leading-none tracking-[-0.02em] text-marca">
                {t.welcome.claimTitle}
              </span>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-texto">
                {t.welcome.claimBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- 5. CÓMO RESERVAR */}
      <section className="border-y border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.steps.eyebrow} title={t.steps.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-7">
            {t.steps.items.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <div className="shadow-suave group relative h-full rounded-2xl bg-panel p-7 ring-1 ring-linea transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-alta">
                  <span className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-marca text-sm font-bold text-white shadow-[0_6px_14px_-4px_rgb(14_124_192/0.6)]">
                    {step.n}
                  </span>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-marca-soft text-marca">
                    {STEP_ICONS[i]}
                  </span>
                  <h3 className="mt-5 text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-texto">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- 6. UBICACIÓN */}
      <section className="py-14 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="eyebrow text-marca">{t.location.eyebrow}</span>
            <h2 className="mt-3.5 text-[1.75rem] sm:text-[2.25rem] lg:text-[2.625rem]">
              {t.location.title}
            </h2>
            <span className="filete mt-5" aria-hidden />
            <p className="mt-5 max-w-md leading-relaxed text-texto">
              {t.location.body}
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border border-linea px-6 py-3 text-sm font-semibold transition-colors hover:border-marca hover:text-marca"
            >
              {t.location.cta}
            </a>
          </div>

          <Reveal>
            <div className="shadow-suave overflow-hidden rounded-2xl ring-1 ring-linea">
              <iframe
                title={t.location.title}
                src={`https://www.google.com/maps?q=${encodeURIComponent(t.footer.address)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full sm:h-96"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- 7. TESTIMONIOS */}
      <section className="border-y border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.reviews.eyebrow} title={t.reviews.title} />

          {/* Las etiquetas que ellos ponen sobre los testimonios. */}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {t.reviews.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-linea bg-panel px-3.5 py-1.5 text-xs font-semibold text-texto"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {t.reviews.items.map((review) => (
              <figure key={review.author} className="edge flex flex-col p-6">
                <div className="flex gap-0.5" aria-label="5 / 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sol" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-texto">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-linea pt-4">
                  <span className="block text-sm font-bold">
                    {review.author}
                  </span>
                  <span className="text-xs text-tenue">
                    {review.origin} · {review.guide}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ 8. FAQ */}
      <section id="faq" className="scroll-mt-20 py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="mx-auto mt-9 max-w-3xl">
            <FaqAccordion items={faqHome} />
            <div className="mt-6 text-center">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-linea px-6 py-3 text-sm font-semibold transition-colors hover:border-marca hover:text-marca"
              >
                {t.faq.seeMore}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 9. RESERVA TU TOUR */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] text-center">
            <Image
              src="/tours/atv-playa.webp"
              alt=""
              fill
              sizes="100vw"
              className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noche/70 via-noche/55 to-noche/80" />

            <div className="px-6 py-20 sm:py-28">
              <span className="eyebrow text-coral">{t.closing.eyebrow}</span>
              <h2 className="mx-auto mt-3.5 max-w-2xl text-[1.75rem] text-white sm:text-[2.25rem] lg:text-[2.625rem]">
                {t.closing.title}
              </h2>
              <span className="mx-auto mt-5 block h-0.5 w-10 rounded-full bg-white/70" aria-hidden />
              <p className="mt-5 text-lg text-white/85">{t.closing.body}</p>
              <Link
                href={`/${locale}/tours`}
                className="btn-naranja mt-7 inline-block rounded-full px-8 py-3.5 text-sm"
              >
                {t.closing.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 10. POR QUÉ ELEGIRNOS */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.why.eyebrow} title={t.why.title} />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {t.why.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-marca-soft text-marca">
                  {WHY_ICONS[i]}
                </span>
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-texto">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
