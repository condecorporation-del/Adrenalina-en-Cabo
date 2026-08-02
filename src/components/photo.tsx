import Image from "next/image";
import type { Activity } from "@/lib/activities";

export const PHOTO_CLASS: Record<Activity["photo"], string> = {
  desierto: "ph-desierto",
  dunas: "ph-dunas",
  mar: "ph-mar",
  canon: "ph-canon",
  motor: "ph-motor",
};

/**
 * Marco de imagen del sitio.
 *
 * Si la actividad tiene `image`, renderiza la foto real optimizada por Next
 * (AVIF/WebP, responsive, lazy). Si no, cae al degradado en malla con grano,
 * que lee como imagen tratada en vez de bloque de color.
 *
 * Para cargar fotos: archivo en `public/tours/` + ruta en `activities.ts`.
 */
export function Photo({
  activity,
  alt,
  className = "",
  sizes = "(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw",
  priority = false,
  children,
}: {
  activity: Activity;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overlays y badges que van encima de la imagen. */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`grain relative overflow-hidden ${activity.image ? "bg-noche" : PHOTO_CLASS[activity.photo]} ${className}`}
    >
      {activity.image && (
        <Image
          src={activity.image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      {children}
    </div>
  );
}
