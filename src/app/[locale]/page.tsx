import Link from "next/link";
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
        images={[
          "/tours/hero-skybike.webp",
          "/tours/atv-playa.webp",
          "/tours/parque.webp",
          "/tours/sky-bike.webp",
        ]}
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
      <section className="py-16 text-center sm:py-20">
        <div className="container-x">
          <span className="eyebrow text-marca">{t.welcome.eyebrow}</span>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem]">
            {t.welcome.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-texto">
            {t.welcome.body}
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-semibold text-marca">
            {t.welcome.claim}
          </p>
          <Link
            href={`/${locale}/nosotros`}
            className="btn-grad mt-8 inline-block rounded-full px-7 py-3.5 text-sm"
          >
            {t.welcome.cta}
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------- 5. CÓMO RESERVAR */}
      <section className="border-y border-linea bg-fondo-2 py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.steps.eyebrow} title={t.steps.title} />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {t.steps.items.map((step) => (
              <div key={step.n} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-marca text-lg font-bold text-white">
                  {step.n}
                </span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-texto">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- 6. UBICACIÓN */}
      <section className="py-14 text-center sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.location.eyebrow} title={t.location.title} />
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-texto">
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
      <section className="border-y border-linea bg-fondo-2 py-14 text-center sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.closing.eyebrow} title={t.closing.title} />
          <p className="mt-5 text-lg text-texto">{t.closing.body}</p>
          <Link
            href={`/${locale}/tours`}
            className="btn-naranja mt-7 inline-block rounded-full px-8 py-3.5 text-sm"
          >
            {t.closing.cta}
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------- 10. POR QUÉ ELEGIRNOS */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <Titulo eyebrow={t.why.eyebrow} title={t.why.title} />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {t.why.items.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-texto">
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
