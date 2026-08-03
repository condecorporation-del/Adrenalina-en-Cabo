"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Motor de animación del sitio.
 *
 * `LazyMotion` con `domAnimation` carga solo lo que usamos —transformaciones,
 * opacidad y detección de entrada en pantalla— en vez del paquete completo:
 * son unos 18 KB en lugar de 40 y pico.
 *
 * `strict` es a propósito: obliga a usar `<m.div>` en vez de `<motion.div>`.
 * Si alguien importa el segundo por costumbre, el sitio truena en desarrollo
 * en vez de arrastrar en silencio el paquete entero hasta producción.
 *
 * `reducedMotion="user"` respeta la preferencia del sistema sin que haya que
 * acordarse en cada componente.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
