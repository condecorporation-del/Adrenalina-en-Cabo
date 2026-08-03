"use client";

import { m } from "motion/react";

/**
 * Aparición al entrar en pantalla, con retardo escalonado.
 *
 * Se usa para que las rejillas de promociones y categorías entren en cascada
 * en vez de aparecer de golpe.
 *
 * Va con Motion en vez del IntersectionObserver a mano que había antes: la
 * curva de salida es la misma del resto del sitio, pero ahora el retardo se
 * interrumpe bien si el visitante hace scroll rápido, y quien pidió menos
 * movimiento queda cubierto por el `reducedMotion` del proveedor.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Milisegundos de retardo, para escalonar dentro de una rejilla. */
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* `once`: una vez que apareció, se queda. Volver a animar al subir es
         justo lo que hace que un sitio se sienta inquieto. */
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.75,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  );
}
