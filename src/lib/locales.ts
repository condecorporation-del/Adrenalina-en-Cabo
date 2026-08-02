/**
 * Constantes de locale sin `server-only`, para que las pueda importar
 * `proxy.ts` (que corre en el edge, antes del render) y los componentes
 * de cliente.
 */
export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);
