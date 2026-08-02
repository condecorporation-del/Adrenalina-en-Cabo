/**
 * Catálogo. Adrenalina Cabo revende los tours de Cactus Tours, así que la
 * oferta, los precios y las restricciones son los suyos:
 *
 *   price        precio de adulto con descuento
 *   priceBefore  precio de lista
 *   childPrice   mitad, hasta los 11 años (de 12 en adelante paga adulto)
 *
 * La entrada al parque (PARK_FEE) NO va incluida: son $25 USD por persona,
 * obligatorios en todos los tours, y se cobran aparte.
 */

export type Photo = "desierto" | "dunas" | "mar" | "canon" | "motor";
export type Category =
  | "combo"
  | "skybike"
  | "utv"
  | "atv"
  | "camel"
  | "horse"
  | "bike";

/** El orden de sus mosaicos en la portada. */
export const CATEGORY_ORDER: Category[] = [
  "combo",
  "skybike",
  "utv",
  "atv",
  "camel",
  "horse",
  "bike",
];

export type Activity = {
  slug: string;
  /** Ambiente del marco degradado, mientras no haya foto real. */
  photo: Photo;
  /** Foto en `public/tours/`. Ver public/tours/LEEME.md. */
  image?: string;
  category: Category;
  price: number;
  priceBefore: number | null;
  /** Precio de niño hasta 11 años. De 12 en adelante paga tarifa de adulto. */
  childPrice: number;
  /** Segundo asiento en la misma unidad. 0 = incluido, null = no aplica. */
  pricePassenger: number | null;
  durationMin: number;
  minAgeDriver: number;
  minAgePassenger: number | null;
  minHeightCm: number | null;
  maxWeightKg: number | null;
  groupMax: number;
  rating: number;
  reviews: number;
  badge: "popular" | "nuevo" | "familiar" | "premium" | null;
  /** Aparece en la portada. */
  featured?: boolean;
  /** Apto para el bloque de niños. */
  kids?: boolean;
};

export const ACTIVITIES: readonly Activity[] = [
  // --- Cuatrimotos ---------------------------------------------------------
  {
    slug: "atv-migrino",
    image: "/tours/atv.webp",
    photo: "motor",
    category: "atv",
    price: 100,
    priceBefore: 125,
    childPrice: 50.0,
    pricePassenger: 95,
    durationMin: 120,
    minAgeDriver: 16,
    minAgePassenger: 7,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 12,
    rating: 4.9,
    reviews: 312,
    badge: "popular",
    featured: true,
  },
  {
    slug: "atv-playa-dunas",
    image: "/tours/atv-playa.webp",
    photo: "dunas",
    category: "atv",
    price: 136,
    priceBefore: 170,
    childPrice: 68.0,
    pricePassenger: 120,
    durationMin: 120,
    minAgeDriver: 16,
    minAgePassenger: 7,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 10,
    rating: 4.9,
    reviews: 204,
    badge: null,
    featured: true,
  },

  // --- UTV / Can-Am --------------------------------------------------------
  {
    slug: "utv-side-by-side",
    image: "/tours/utv.webp",
    photo: "desierto",
    category: "utv",
    price: 164,
    priceBefore: 205,
    childPrice: 82.0,
    pricePassenger: 0,
    durationMin: 120,
    minAgeDriver: 16,
    minAgePassenger: 5,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 10,
    rating: 4.8,
    reviews: 168,
    badge: "familiar",
    featured: true,
  },
  {
    slug: "can-am-x3",
    image: "/tours/utv.webp",
    photo: "motor",
    category: "utv",
    price: 240,
    priceBefore: 300,
    childPrice: 120.0,
    pricePassenger: 0,
    durationMin: 120,
    minAgeDriver: 16,
    minAgePassenger: 5,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 8,
    rating: 5.0,
    reviews: 97,
    badge: "premium",
    featured: true,
  },
  {
    slug: "maverick-turbo",
    image: "/tours/utv.webp",
    photo: "motor",
    category: "utv",
    price: 480,
    priceBefore: 600,
    childPrice: 240.0,
    pricePassenger: 0,
    durationMin: 120,
    minAgeDriver: 18,
    minAgePassenger: 12,
    minHeightCm: 140,
    maxWeightKg: 125,
    groupMax: 6,
    rating: 5.0,
    reviews: 48,
    badge: "premium",
  },
  {
    slug: "mini-rzr",
    image: "/tours/ninos.webp",
    photo: "desierto",
    category: "utv",
    price: 112,
    priceBefore: 140,
    childPrice: 56.0,
    pricePassenger: 0,
    durationMin: 120,
    minAgeDriver: 10,
    minAgePassenger: 7,
    minHeightCm: 110,
    maxWeightKg: 80,
    groupMax: 8,
    rating: 4.9,
    reviews: 132,
    badge: "familiar",
    kids: true,
  },

  // --- Con animales --------------------------------------------------------
  {
    slug: "camellos",
    image: "/tours/camellos.webp",
    photo: "desierto",
    category: "camel",
    price: 100,
    priceBefore: 125,
    childPrice: 50.0,
    pricePassenger: null,
    durationMin: 120,
    minAgeDriver: 5,
    minAgePassenger: null,
    minHeightCm: 100,
    maxWeightKg: 125,
    groupMax: 14,
    rating: 4.9,
    reviews: 421,
    badge: "familiar",
    featured: true,
    kids: true,
  },
  {
    slug: "caballos",
    image: "/tours/caballos.webp",
    photo: "canon",
    category: "horse",
    price: 100,
    priceBefore: 125,
    childPrice: 50.0,
    pricePassenger: null,
    durationMin: 120,
    minAgeDriver: 6,
    minAgePassenger: null,
    minHeightCm: 120,
    maxWeightKg: 110,
    groupMax: 10,
    rating: 4.7,
    reviews: 156,
    badge: null,
    kids: true,
  },

  // --- Altura --------------------------------------------------------------
  {
    slug: "sky-bike",
    image: "/tours/sky-bike.webp",
    photo: "canon",
    category: "skybike",
    price: 100,
    priceBefore: 125,
    childPrice: 50.0,
    pricePassenger: null,
    durationMin: 120,
    minAgeDriver: 8,
    minAgePassenger: null,
    minHeightCm: 120,
    maxWeightKg: 120,
    groupMax: 12,
    rating: 4.9,
    reviews: 289,
    badge: "popular",
    kids: true,
  },

  // --- Bicicletas ----------------------------------------------------------
  {
    slug: "bici-electrica",
    image: "/tours/parque.webp",
    photo: "desierto",
    category: "bike",
    price: 60,
    priceBefore: 75,
    childPrice: 30.0,
    pricePassenger: null,
    durationMin: 120,
    minAgeDriver: 12,
    minAgePassenger: null,
    minHeightCm: 140,
    maxWeightKg: 110,
    groupMax: 10,
    rating: 4.8,
    reviews: 64,
    badge: "nuevo",
  },
  {
    slug: "bici-montana",
    image: "/tours/parque.webp",
    photo: "canon",
    category: "bike",
    price: 69,
    priceBefore: 75,
    childPrice: 34.5,
    pricePassenger: null,
    durationMin: 120,
    minAgeDriver: 12,
    minAgePassenger: null,
    minHeightCm: 140,
    maxWeightKg: 110,
    groupMax: 10,
    rating: 4.6,
    reviews: 41,
    badge: null,
  },

  // --- Combos --------------------------------------------------------------
  {
    slug: "combo-2x1",
    image: "/tours/camellos-2.webp",
    photo: "mar",
    category: "combo",
    price: 100,
    priceBefore: 125,
    childPrice: 50.0,
    pricePassenger: 115,
    durationMin: 120,
    minAgeDriver: 16,
    minAgePassenger: 7,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 12,
    rating: 4.9,
    reviews: 143,
    badge: "popular",
  },
  {
    slug: "combo-2x1-premium",
    image: "/tours/utv.webp",
    photo: "motor",
    category: "combo",
    price: 140,
    priceBefore: 175,
    childPrice: 70.0,
    pricePassenger: 150,
    durationMin: 120,
    minAgeDriver: 16,
    minAgePassenger: 7,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 10,
    rating: 4.9,
    reviews: 76,
    badge: "premium",
  },
  {
    slug: "combo-3x1",
    image: "/tours/hero-skybike.webp",
    photo: "dunas",
    category: "combo",
    price: 125,
    priceBefore: 175,
    childPrice: 62.5,
    pricePassenger: 145,
    durationMin: 180,
    minAgeDriver: 16,
    minAgePassenger: 7,
    minHeightCm: 120,
    maxWeightKg: 125,
    groupMax: 12,
    rating: 4.9,
    reviews: 88,
    badge: null,
  },
  {
    slug: "combo-balandra",
    image: "/tours/torre.webp",
    photo: "mar",
    category: "combo",
    price: 139,
    priceBefore: 174,
    childPrice: 69.5,
    pricePassenger: null,
    durationMin: 720,
    minAgeDriver: 8,
    minAgePassenger: null,
    minHeightCm: null,
    maxWeightKg: null,
    groupMax: 16,
    rating: 4.8,
    reviews: 52,
    badge: "nuevo",
  },
];

export const getActivity = (slug: string) =>
  ACTIVITIES.find((a) => a.slug === slug);

export const byCategory = (category: Category) =>
  ACTIVITIES.filter((a) => a.category === category);

/** Pase de día: acceso libre al parque, tú eliges qué hacer y cuántas veces. */
export type PassTier = {
  slug: string;
  price: number;
  priceBefore: number | null;
  hours: number | null;
  featured: boolean;
};

export const PASSES: readonly PassTier[] = [
  {
    slug: "medio-dia",
    price: 199,
    priceBefore: null,
    hours: 4,
    featured: false,
  },
  {
    slug: "medio-dia-extendido",
    price: 249,
    priceBefore: null,
    hours: 6,
    featured: false,
  },
  {
    slug: "dia-completo",
    price: 239,
    priceBefore: 299,
    hours: null,
    featured: true,
  },
];

export const DEPARTURES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

/** Entrada al parque: obligatoria, por persona, NO incluida en el precio. */
export const PARK_FEE = 25;

/** Edad hasta la que aplica tarifa de niño. */
export const CHILD_MAX_AGE = 11;

export const WHATSAPP = "5216241214870";
export const PHONE_DISPLAY = "+52 624 121 4870";
export const PHONE_HREF = "+526241214870";
export const EMAIL = "adrenalinacabo@gmail.com";
export const MAPS_URL = "https://maps.app.goo.gl/SjHPgNDpzDimEMmk9";
export const INSTAGRAM = "https://instagram.com/adrenalinacabo";
