import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/locales";

export type Promo = {
  tag: string;
  title: string;
  body: string;
  price: number | null;
  before: number | null;
  href: string;
  photo: string;
};

const PHOTO: Record<string, string> = {
  desierto: "ph-desierto",
  dunas: "ph-dunas",
  mar: "ph-mar",
  canon: "ph-canon",
  motor: "ph-motor",
};

/**
 * Tarjetas de "¡Compra ahora y ahorra!".
 *
 * La misma información de sus banners. El acabado está en el detalle fino:
 * canto interior claro, sombra en tres capas, etiqueta de ahorro en versalitas
 * y el precio anterior tachado en fino. El movimiento es uno solo.
 */
export function PromoCards({
  promos,
  locale,
  labels,
  images,
}: {
  promos: readonly Promo[];
  locale: Locale;
  labels: { from: string; perPerson: string; details: string };
  images?: Record<string, string>;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {promos.map((p, i) => (
        <Reveal key={p.title} delay={i * 70} className="h-full">
          <Link
            href={`/${locale}${p.href}`}
            className="shadow-suave group flex h-full flex-col overflow-hidden rounded-[0.875rem] bg-panel ring-1 ring-linea transition-[box-shadow,transform,--tw-ring-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-alta hover:ring-marca/35"
          >
            <div className="tile relative aspect-[7/6] w-full rounded-none">
              {images?.[p.photo] ? (
                <Image
                  src={images[p.photo]}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className={`absolute inset-0 ${PHOTO[p.photo]}`} />
              )}

              <span className="absolute left-4 top-4 rounded-md bg-coral px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.09em] text-white">
                {p.tag}
              </span>
            </div>

            <div className="filo flex flex-1 flex-col p-5">
              <h3 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.015em] transition-colors duration-300 group-hover:text-marca">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-texto">
                {p.body}
              </p>

              <div className="mt-5 flex items-end justify-between gap-3 border-t border-linea pt-4">
                {p.price !== null ? (
                  <div>
                    <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-tenue">
                      {labels.from}
                    </span>
                    <span className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold leading-none tracking-[-0.02em] text-marca">
                        ${p.price}
                      </span>
                      {p.before && (
                        <span className="text-[0.8125rem] font-medium text-tenue line-through">
                          ${p.before}
                        </span>
                      )}
                    </span>
                  </div>
                ) : (
                  <span />
                )}

                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-coral ring-1 ring-coral/25 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-coral group-hover:text-white group-hover:ring-coral"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M10.6 4.6l5 5-5 5-1.4-1.4 2.6-2.6H4v-2h7.8L9.2 6z" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
