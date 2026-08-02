"use client";

import { useState } from "react";

export type TabKey =
  | "reserve"
  | "included"
  | "extra"
  | "before"
  | "recommend"
  | "safety";

const ORDER: TabKey[] = [
  "reserve",
  "included",
  "extra",
  "before",
  "recommend",
  "safety",
];

/**
 * Las seis pestañas de la ficha de actividad, en el mismo orden que las publica
 * Cactus Tours: RESERVE / INCLUDED / EXTRA FEES / BEFORE YOU RESERVE /
 * RECOMMENDATIONS / SAFETY.
 */
export function TourTabs({
  labels,
  panels,
}: {
  labels: Record<TabKey, string>;
  panels: Record<TabKey, React.ReactNode>;
}) {
  const [active, setActive] = useState<TabKey>("reserve");

  return (
    <div>
      {/* En móvil la fila de pestañas hace scroll horizontal en su propio
          contenedor; la página nunca se desplaza de lado. */}
      <div
        role="tablist"
        aria-label="Detalle de la actividad"
        className="-mx-5 flex gap-1 overflow-x-auto border-b border-linea px-5 sm:mx-0 sm:px-0"
      >
        {ORDER.map((key) => {
          const on = key === active;
          return (
            <button
              key={key}
              role="tab"
              type="button"
              id={`tab-${key}`}
              aria-selected={on}
              aria-controls={`panel-${key}`}
              onClick={() => setActive(key)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-sm font-bold tracking-wide transition-colors ${
                on
                  ? "border-marca text-marca"
                  : "border-transparent text-texto hover:text-hueso"
              }`}
            >
              {labels[key]}
            </button>
          );
        })}
      </div>

      {ORDER.map((key) => (
        <div
          key={key}
          role="tabpanel"
          id={`panel-${key}`}
          aria-labelledby={`tab-${key}`}
          hidden={key !== active}
          className="pt-7"
        >
          {panels[key]}
        </div>
      ))}
    </div>
  );
}
