"use client";

import { useState } from "react";

export function FaqAccordion({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="edge">
      <div className="edge-in divide-y divide-linea overflow-hidden">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-panel-2 sm:px-6 sm:py-5"
              >
                <span
                  className={`text-[0.9375rem] font-semibold transition-colors sm:text-base ${
                    isOpen ? "text-marca" : ""
                  }`}
                >
                  {item.q}
                </span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-transparent bg-gradient-to-br from-marca to-azul text-noche"
                      : "border-linea text-texto"
                  }`}
                  aria-hidden
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                    <path d="M9 3h2v14H9z" />
                    <path d="M3 9h14v2H3z" />
                  </svg>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-texto sm:px-6 sm:pb-6">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
