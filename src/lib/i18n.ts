import "server-only";
import type { Locale } from "@/lib/locales";
import type esDictionary from "@/dictionaries/es.json";
import type esTours from "@/content/tours.es.json";

/** El español es la forma canónica: si el inglés se desincroniza, TS lo marca. */
export type Dictionary = typeof esDictionary;
export type ToursContent = typeof esTours;

/** Forma de una actividad, para poder indexar por slug dinámico. */
export type TourContent = {
  name: string;
  tagline: string;
  desc: string;
  highlights: readonly string[];
  itinerary: readonly { time: string; title: string; text: string }[];
  includes: readonly string[];
  excludes: readonly string[];
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

const tours: Record<Locale, () => Promise<ToursContent>> = {
  es: () => import("@/content/tours.es.json").then((m) => m.default),
  en: () => import("@/content/tours.en.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export const getTours = async (locale: Locale) =>
  (await tours[locale]()) as unknown as Record<string, TourContent>;
