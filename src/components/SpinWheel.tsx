import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import DeckSection from "./DeckSection";
import Wheel from "./Wheel";
import type { Card } from "../model/Card";

interface SpinWheelProps {
  cards: Card[];
  maxSpins?: number;
  onCardSelected: (card: Card) => void;
}

export default function SpinWheel({ cards = [], maxSpins = 8 } : SpinWheelProps) {
  const [spunCards, setSpunCards] = useState<any[]>([]);
  const [displayedCards, setDisplayedCards] = useState<any[]>(cards);
  const [spinning, setSpinning] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement | null>(null);

  const [radius, setRadius] = useState(() =>
    Math.min(300, window.innerWidth / 2 - 40)
  );

  useEffect(() => {
    const handleResize = () =>
      setRadius(Math.min(300, window.innerWidth / 2 - 40));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedCard(null);
    setDisplayedCards(cards);
    setCurrentRotation(0);
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  }, [cards]);

  const normalizeDeg = (deg: number) => ((deg % 360) + 360) % 360;

  const handleSpin = () => {
    if (displayedCards.length === 0 || spunCards.length >= maxSpins || spinning)
      return;

    const total = displayedCards.length;
    const randomIndex = Math.floor(Math.random() * total);
    const card = displayedCards[randomIndex];

    const sectorAngleDeg = 360 / total;
    const midAngleDeg = sectorAngleDeg * randomIndex + sectorAngleDeg / 2;
    const normalizedMid = normalizeDeg(midAngleDeg);
    const desiredFinal = normalizeDeg(360 - normalizedMid);
    const currentNorm = normalizeDeg(currentRotation);
    const delta = normalizeDeg(desiredFinal - currentNorm);
    const baseSpins = 5 + Math.floor(Math.random() * 3);
    const rotationChange = baseSpins * 360 + delta;
    const newRotation = currentRotation + rotationChange;

    setSpinning(true);

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 2.5s cubic-bezier(0.25, 1.5, 0.5, 1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    const onEnd = () => {
      setSelectedCard(card);
      setSpunCards((prev) => [...prev, card]);
      setDisplayedCards((prev) => prev.filter((c) => c.id !== card.id));
      setSpinning(false);
      setCurrentRotation(normalizeDeg(newRotation));
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    };

    if (wheelRef.current) {
      wheelRef.current.addEventListener("transitionend", onEnd, { once: true });
    } else setTimeout(onEnd, 5000);
  };

  const handleRemove = (card: any) => {
    setSpunCards((prev) => prev.filter((c) => c.id !== card.id));
    setDisplayedCards((prev) => [...prev, card]);
  };

  return (
    <div className="flex flex-col gap-0 items-center relative">
      {/* Top - Deck */}
      <DeckSection deck={spunCards} onRemove={handleRemove} />

      {/* Middle - Wheel */}
      <div className="relative">
        <Wheel
          displayedCards={displayedCards}
          selectedCard={selectedCard}
          wheelRef={wheelRef}
          radius={radius}
        />

        {/* Interactive Spin Button in the center */}
        <button
          onClick={handleSpin}
          disabled={spinning || displayedCards.length === 0 || spunCards.length >= maxSpins}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-20 h-20 rounded-full bg-accentsecondary shadow-lg flex items-center justify-center
                      font-bold text-lg text-amber-50 transition 
                      ${spinning ? "bg-gray-700 opacity-50 w-25 h-25 cursor-not-allowed animate-pulse" : "hover:scale-105"}`}
        >
          {spinning ? "Spinning..." : "SPIN"}
        </button>
      </div>
    </div>
  );
}
