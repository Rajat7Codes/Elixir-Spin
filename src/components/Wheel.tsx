import React from "react";
import type { Card } from "../model/Card";

interface WheelProps {
  displayedCards: Card[];
  selectedCard: Card | null;
  wheelRef: React.RefObject<SVGSVGElement | null>;
  radius: number;
}

export default function Wheel({ displayedCards, selectedCard, wheelRef, radius }: WheelProps) {
  const center = radius;
  return (
    <div className="relative mx-auto" style={{ width: radius * 2, height: radius * 2 }}>
      {/* Pointer */}
      <div
        className="absolute top-2 left-24/50 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ width: 0, height: 0 }}
      >
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-gray-800 shadow-lg animate-bounce"></div>
      </div>


      {/* Wheel */}
      <svg
        ref={wheelRef}
        width={radius * 2}
        height={radius * 2}
        className="rounded-full border-2 border-gray-300"
        style={{ transformOrigin: "center center" }}
      >
        <defs>
          <linearGradient id="sectorColor1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#97D2FB" />
            <stop offset="100%" stopColor="#97D2FB" />
          </linearGradient>
          <linearGradient id="sectorColor2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DBF4A7" />
            <stop offset="100%" stopColor="#DBF4A7" />
          </linearGradient>
          <linearGradient id="sectorColor3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0B0D5" />
            <stop offset="100%" stopColor="#E0B0D5" />
          </linearGradient>
          <linearGradient id="sectorColor4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#CCDAD1" />
            <stop offset="100%" stopColor="#CCDAD1" />
          </linearGradient>
          <linearGradient id="sectorColor5" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC9B9" />
            <stop offset="100%" stopColor="#FFC9B9" />
          </linearGradient>

          <linearGradient id="lightGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdfdfd" />
            <stop offset="100%" stopColor="#dcdcdc" />
          </linearGradient>
          <linearGradient id="darkGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e6e6e6" />
            <stop offset="100%" stopColor="#bfbfbf" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="gold" />
          </filter>
        </defs>

        {
        displayedCards.map((card, index) => {
          const total = displayedCards.length;
          const sectorAngle = (2 * Math.PI) / total;
          const startAngle = sectorAngle * index;
          const endAngle = startAngle + sectorAngle;
          const x1 = center + radius * Math.cos(startAngle - Math.PI / 2);
          const y1 = center + radius * Math.sin(startAngle - Math.PI / 2);
          const x2 = center + radius * Math.cos(endAngle - Math.PI / 2);
          const y2 = center + radius * Math.sin(endAngle - Math.PI / 2);
          const isSelected = selectedCard?.id === card.id;
          const fill = isSelected
            ? "url(#goldGradient)"
            : "url(#sectorColor"+(Math.floor(Math.random()*5)+1)+")";
          return (
            <path
              key={card.id}
              d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
              fill={fill}
              stroke="#999"
              filter={isSelected ? "url(#glow)" : undefined}
            />
          );
        })}

        {displayedCards.map((card, index) => {
          const total = displayedCards.length;
          const sectorAngle = (2 * Math.PI) / total;
          const startAngle = sectorAngle * index;
          const endAngle = startAngle + sectorAngle;
          const midAngle = (startAngle + endAngle) / 2 - Math.PI / 2;
          const textRadius = radius - 10;
          const x = center + textRadius * Math.cos(midAngle);
          const y = center + textRadius * Math.sin(midAngle);
          const rotation = (midAngle * 180) / Math.PI;

          return (
            <text
              key={card.id}
              x={x}
              y={y}
              fontSize={Math.max(5, Math.min(18, (radius * 3 - 200) / total))}
              textAnchor="end"
              dominantBaseline="middle"
              transform={`rotate(${rotation} ${x} ${y})`}
              fill="#000"
            >
              {card.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
