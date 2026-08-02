import Link from "next/link";
import Image from "next/image";
import { byCategory, type Category } from "@/lib/activities";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/locales";

/**
 * Los ocho mosaicos de la portada.
 *
 * Mismos nombres y mismo orden que cactustours.com:
 *   Combos · Park Pass · Sky Bikes · UTV Can-ams · ATVs · Camel Ride ·
 *   Horseback Ride · For kids
 *
 * Decisión de diseño: el texto va en una banda blanca DEBAJO de la foto, no
 * encima. Un velo oscuro sobre la imagen apaga el turquesa del mar y el ocre
 * de la arena, que es justo lo que vende. Aquí la foto se ve completa y a
 * plena luz, y el nombre se lee sobre blanco con contraste real.
 */
type Tile = {
  href: string;
  label: string;
  image: string;
  /** Categoría del catálogo, para el precio desde. `null` en las que son
   *  páginas propias (Park Pass, Para Niños). */
  category: Category | null;
};

export type TileLabels = {
  combo: string;
  pass: string;
  skybike: string;
  utv: string;
  atv: string;
  camel: string;
  horse: string;
  kids: string;
  from: string;
};

export function CategoryTiles({
  locale,
  labels,
}: {
  locale: Locale;
  labels: TileLabels;
}) {
  const tiles: Tile[] = [
    {
      href: `/${locale}/actividades/combo`,
      label: labels.combo,
      image: "/tours/camellos-2.webp",
      category: "combo",
    },
    {
      href: `/${locale}/pase-de-dia`,
      label: labels.pass,
      image: "/tours/torre.webp",
      category: null,
    },
    {
      href: `/${locale}/actividades/skybike`,
      label: labels.skybike,
      image: "/tours/sky-bike.webp",
      category: "skybike",
    },
    {
      href: `/${locale}/actividades/utv`,
      label: labels.utv,
      image: "/tours/utv.webp",
      category: "utv",
    },
    {
      href: `/${locale}/actividades/atv`,
      label: labels.atv,
      image: "/tours/atv.webp",
      category: "atv",
    },
    {
      href: `/${locale}/actividades/camel`,
      label: labels.camel,
      image: "/tours/camellos.webp",
      category: "camel",
    },
    {
      href: `/${locale}/actividades/horse`,
      label: labels.horse,
      image: "/tours/caballos.webp",
      category: "horse",
    },
    {
      href: `/${locale}/ninos`,
      label: labels.kids,
      image: "/tours/ninos.webp",
      category: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {tiles.map((tile, i) => {
        const items = tile.category ? byCategory(tile.category) : [];
        const price = items.length
          ? Math.min(...items.map((a) => a.price))
          : null;

        return (
          <Reveal key={tile.href} delay={i * 60}>
            <Link
              href={tile.href}
              className="shadow-suave group flex h-full flex-col overflow-hidden rounded-[0.875rem] bg-panel ring-1 ring-linea transition-[box-shadow,transform,--tw-ring-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-alta hover:ring-marca/40"
            >
              {/* La foto, entera y sin velo. */}
              <div className="tile relative aspect-[7/6] w-full rounded-none">
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                {price !== null && (
                  <span className="absolute bottom-3 left-3 rounded-md bg-noche/75 px-2.5 py-1 text-[0.6875rem] font-semibold text-white backdrop-blur-sm">
                    {labels.from} ${price}
                  </span>
                )}
              </div>

              {/* Banda de texto: aquí el nombre se lee con contraste real. */}
              <div className="filo flex flex-1 items-center justify-between gap-3 px-4 py-4 sm:px-5">
                <h3 className="text-[0.9375rem] font-bold leading-tight tracking-[-0.015em] transition-colors duration-300 group-hover:text-marca sm:text-base lg:text-[1.0625rem]">
                  {tile.label}
                </h3>

                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-marca ring-1 ring-marca/25 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-marca group-hover:text-white group-hover:ring-marca"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                    <path d="M10.6 4.6l5 5-5 5-1.4-1.4 2.6-2.6H4v-2h7.8L9.2 6z" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
