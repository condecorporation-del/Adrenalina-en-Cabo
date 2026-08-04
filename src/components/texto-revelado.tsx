"use client";

import { m } from "motion/react";

/**
 * Titular que entra palabra por palabra, subiendo desde abajo.
 *
 * Cada palabra vive dentro de una ventana con el desbordamiento oculto, así
 * que no se desliza: aparece por detrás del borde, como en un letrero de
 * aeropuerto. Es el gesto que más rápido separa un titular vivo de uno que
 * solo está ahí escrito.
 *
 * El texto completo va en `aria-label` y las palabras se ocultan al lector de
 * pantalla, para que no lo lea entrecortado.
 */
export function TextoRevelado({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  /** Segundos de espera antes de arrancar. */
  delay?: number;
}) {
  const palabras = text.split(" ");

  return (
    <m.span
      aria-label={text}
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
    >
      {palabras.map((palabra, i) => (
        <span
          key={`${palabra}-${i}`}
          aria-hidden
          /* El relleno inferior y el margen que lo compensa dejan pasar las
             colas de la j, la g y la y, que si no se cortarían contra el
             borde de la ventana. */
          className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom"
        >
          <m.span
            className="inline-block"
            variants={{
              oculto: { y: "115%" },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            {palabra}
            {i < palabras.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
