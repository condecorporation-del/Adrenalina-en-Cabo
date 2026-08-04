"use client";

import { useRef } from "react";

/**
 * Luz que sigue al cursor sobre una rejilla de tarjetas.
 *
 * El brillo no vive en cada tarjeta: vive aquí, en el contenedor, y se mueve
 * con el puntero. Así una sola escucha de movimiento cubre toda la rejilla en
 * vez de una por tarjeta, y el efecto se siente continuo al pasar de una a
 * otra en lugar de encenderse y apagarse por pedazos.
 *
 * La posición viaja por variables CSS, no por estado de React: mover el mouse
 * no vuelve a renderizar nada.
 */
export function Spotlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`spot ${className}`}
    >
      {children}
    </div>
  );
}
