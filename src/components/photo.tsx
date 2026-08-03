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
  /**
   * `relative` solo si quien llama no puso ya su propia posición.
   *
   * Los heroes pasan `absolute inset-0`, y al quedar las dos clases juntas
   * ganaba `relative` —Tailwind la escribe después en la hoja—, así que el
   * `inset-0` no aplicaba, el contenedor medía cero de alto y la foto del
   * hero no se veía en ninguna página de tour ni de categoría.
   */
  const posicionada = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(
    className,
  );

  return (
    <div
      className={`${posicionada ? "" : "relative"} overflow-hidden ${activity.image ? "bg-noche" : PHOTO_CLASS[activity.photo]} ${className}`}
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
