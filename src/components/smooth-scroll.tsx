"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Scroll con inercia.
 *
 * Es el detalle que separa un sitio que se siente caro de uno que se siente
 * de plantilla: la página no salta con la rueda del mouse, se desliza y
 * frena. Lenis se monta sobre el scroll nativo de la ventana, así que
 * `window.scrollY` y el evento `scroll` siguen funcionando igual — el header
 * que cambia de transparente a sólido no se entera de nada.
 *
 * Quien pidió menos movimiento no lo lleva: se queda con el scroll del
 * sistema, sin inercia y sin retardo.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSmooth(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        /* Cuánto persigue la posición real en cada cuadro. Más bajo = más
           deslizamiento. 0.09 frena largo sin llegar a sentirse pesado. */
        lerp: 0.09,
        /* En celular se deja el scroll del sistema: sincronizarlo se siente
           pegajoso justo donde la gente está acostumbrada al de su teléfono. */
        syncTouch: false,
        /* Los enlaces con ancla (#faq del pie) se deslizan en vez de saltar. */
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
