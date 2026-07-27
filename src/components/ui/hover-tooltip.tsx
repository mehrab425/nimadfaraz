"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type HoverTooltipProps = {
  children: ReactNode;
  title: string;
  points: string[];
};

export function HoverTooltip({ children, title, points }: HoverTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX + 16, y: event.clientY + 16 });
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={(event) => {
        handleMove(event);
        setVisible(true);
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <div
          className="pointer-events-none fixed z-[60] max-w-[280px] rounded-2xl border border-gold/25 bg-[#171521]/95 px-4 py-3 text-right shadow-[0_24px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          style={{ left: position.x, top: position.y }}
        >
          <p className="mb-2 text-sm font-bold text-vanilla">{title}</p>
          <ul className="space-y-1 text-xs leading-6 text-secondary">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
