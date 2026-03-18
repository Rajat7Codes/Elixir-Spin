import React from "react";
import type { SpinCard } from "../pages/SpinWheelPage";

interface WheelProps {
  displayedCards: SpinCard[];
  wheelRef: React.RefObject<SVGSVGElement | null>;
  radius: number;
}

export default function Wheel({ displayedCards, wheelRef, radius }: WheelProps) {
  const center = radius;

  return (
    <div className="relative mx-auto" style={{ width: '100%', maxWidth: radius * 2 }}>

      {/* THE POINTER */}
      <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="w-0 h-0 border-l-[12px] sm:border-l-[15px] border-l-transparent border-r-[12px] sm:border-r-[15px] border-r-transparent border-t-[24px] sm:border-t-[30px] border-white drop-shadow-[0_0_8px_white]" />
      </div>

      <svg
        ref={wheelRef}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="w-full h-auto overflow-visible"
        style={{ transformOrigin: "center center" }}
      >
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1d4ed8" /></linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#4338ca" /></linearGradient>
          <linearGradient id="color3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#5b21b6" /></linearGradient>
          <linearGradient id="color4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#1e3a8a" /></linearGradient>
          <linearGradient id="color5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0ea5e9" /><stop offset="100%" stopColor="#0369a1" /></linearGradient>

          <radialGradient id="glassReflection" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g>
          {displayedCards.map((card, index) => {
            const total = displayedCards.length;
            const sectorAngle = (2 * Math.PI) / total;
            const startAngle = (sectorAngle * index) - (Math.PI / 2);
            const endAngle = startAngle + sectorAngle;

            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);

            const midAngle = (startAngle + endAngle) / 2;
            const textRadius = radius - 6;
            const tx = center + textRadius * Math.cos(midAngle);
            const ty = center + textRadius * Math.sin(midAngle);
            const rotation = (midAngle * 180) / Math.PI;

            return (
              <g key={card.id}>
                <path
                  d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
                  fill={`url(#color${(index % 5) + 1})`}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />

                <text
                  x={tx}
                  y={ty}
                  /** * DYNAMIC FONT SIZE: 
                   * This keeps it at ~12px on desktop but shrinks it 
                   * proportionally when there are too many cards.
                   */
                  fontSize={Math.max(5, Math.min(15, (radius * 2.8) / total))}
                  textAnchor="end"
                  dominantBaseline="middle"
                  transform={`rotate(${rotation} ${tx} ${ty})`}
                  fill="white"
                  className="font-bold uppercase tracking-tight pointer-events-none"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,1)' }}
                >
                  {card.name}
                </text>
              </g>
            );
          })}
        </g>

        <circle cx={center} cy={center} r={radius} fill="url(#glassReflection)" pointerEvents="none" />
      </svg>
    </div>
  );
}