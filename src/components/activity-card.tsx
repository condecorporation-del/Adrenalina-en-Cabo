import Link from "next/link";
import type { Activity } from "@/lib/activities";
import type { Locale } from "@/lib/locales";
import { Photo } from "@/components/photo";

export { PHOTO_CLASS } from "@/components/photo";

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

export type CardLabels = {
  from: string;
  perPerson: string;
  hours: string;
  minAge: string;
  years: string;
  details: string;
  reviews: string;
  badgePopular: string;
  badgeNuevo: string;
  badgeFamiliar: string;
  badgePremium: string;
};

/* Texto claro sobre coral/azul, oscuro sobre aqua y sol: cada uno donde
   contrasta de verdad. */
const BADGE_TONE: Record<string, string> = {
  popular: "bg-gradient-to-r from-coral to-sol text-claro",
  nuevo: "bg-aqua text-noche",
  familiar: "bg-marca text-claro",
  premium: "bg-gradient-to-r from-azul to-marca text-claro",
};

export function ActivityCard({
  activity,
  locale,
  name,
  tagline,
  labels,
}: {
  activity: Activity;
  locale: Locale;
  name: string;
  tagline: string;
  labels: CardLabels;
}) {
  const badgeText =
    activity.badge === "popular"
      ? labels.badgePopular
      : activity.badge === "nuevo"
        ? labels.badgeNuevo
        : activity.badge === "familiar"
          ? labels.badgeFamiliar
          : activity.badge === "premium"
            ? labels.badgePremium
            : null;

  return (
    /* El contenedor es el borde: 1px de degradado que se enciende al hover. */
    <article className="edge edge-i glow group relative h-full">
      <div className="edge-in flex h-full flex-col overflow-hidden">
        <Link
          href={`/${locale}/tours/${activity.slug}`}
          className="absolute inset-0 z-10 rounded-[1.25rem]"
        >
          <span className="sr-only">{name}</span>
        </Link>

        {/* Foto real si existe; si no, degradado en malla con grano. */}
        <Photo activity={activity} alt={name} className="aspect-[3/2] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-noche/80 via-noche/10 to-transparent" />

          {badgeText && (
            <span
              className={`absolute left-3.5 top-3.5 z-10 rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider ${
                BADGE_TONE[activity.badge ?? ""] ?? "bg-panel text-hueso"
              }`}
            >
              {badgeText}
            </span>
          )}

          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-end justify-between gap-3">
            <span className="flex items-center gap-1 rounded-full bg-noche/70 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              {activity.rating.toFixed(1)}
              <span className="font-normal text-claro/70">
                ({activity.reviews})
              </span>
            </span>
            <span className="rounded-full bg-noche/70 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
              {activity.durationMin / 60} {labels.hours}
            </span>
          </div>
        </Photo>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg leading-tight transition-colors group-hover:text-marca">
            {name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-texto">
            {tagline}
          </p>

          <div className="mt-5 flex items-end justify-between gap-3 border-t border-linea pt-4">
            <div>
              <span className="eyebrow block text-tenue">{labels.from}</span>
              <span className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold text-grad">
                  ${activity.price}
                </span>
                {activity.priceBefore && (
                  <span className="text-sm text-tenue line-through">
                    ${activity.priceBefore}
                  </span>
                )}
              </span>
            </div>

            <span className="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-marca transition-transform group-hover:translate-x-0.5">
              {labels.details}
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 fill-current"
                aria-hidden
              >
                <path d="M10.6 4.6l5 5-5 5-1.4-1.4 2.6-2.6H4v-2h7.8L9.2 6z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
