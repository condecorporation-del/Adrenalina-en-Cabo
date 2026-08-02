"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aparición al entrar en pantalla, con retardo escalonado.
 *
 * Se usa para que las rejillas de promociones y categorías entren en cascada
 * en vez de aparecer de golpe.
 *
 * Quien pidió menos movimiento ve el contenido completo y sin transición: eso
 * se resuelve en CSS con `motion-reduce`, no en JavaScript, para que el
 * contenido nunca dependa de que un efecto llegue a ejecutarse.
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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
