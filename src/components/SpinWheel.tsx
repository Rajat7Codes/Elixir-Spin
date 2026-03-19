import { useEffect, useState, useRef } from "react";
import apiClient from "../api/apiClient";
import confetti from "canvas-confetti";
import Wheel from "./Wheel";
import type { SpinCard } from "../pages/SpinWheelPage";

interface SpinWheelProps {
  cards: SpinCard[];
  onCardSelected: (card: SpinCard) => void;
  maxSpins?: number;
  currentSlot: number;
  isLoading: boolean;
}

export default function SpinWheel({ cards = [], onCardSelected, maxSpins = 8, currentSlot, isLoading }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
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

  // Your original normalization logic
  const normalizeDeg = (deg: number) => ((deg % 360) + 360) % 360;

  const handleSpin = () => {
    if (cards.length === 0 || currentSlot > maxSpins || spinning || isLoading) return;

    // Record the spin metric
    apiClient.post("/metrics/spin").catch(() => { });

    const total = cards.length;
    const randomIndex = Math.floor(Math.random() * total);
    const card = cards[randomIndex];

    // 1. Calculate the angle of the target sector's middle
    const sectorAngleDeg = 360 / total;

    // The middle of the chosen slice relative to the start of the wheel (12 o'clock)
    const midAngleDeg = (sectorAngleDeg * randomIndex) + (sectorAngleDeg / 2);

    // 2. The wheel rotates CLOCKWISE. 
    // To bring 'midAngleDeg' to the top (0deg), we need to rotate by (360 - midAngleDeg)
    const desiredFinalRotation = (360 - midAngleDeg) % 360;

    // 3. Calculate the delta from current position
    const currentNorm = currentRotation % 360;
    let delta = desiredFinalRotation - currentNorm;

    // Ensure we always rotate forward
    if (delta <= 0) delta += 360;

    // 4. Add full spins for cinematic effect
    const baseSpins = 5 + Math.floor(Math.random() * 3);
    const rotationChange = (baseSpins * 360) + delta;
    const newRotation = currentRotation + rotationChange;

    setSpinning(true);

    if (wheelRef.current) {
      // Restoring your exact transition timing and bezier curve
      wheelRef.current.style.transition =
        "transform 2.5s cubic-bezier(0.25, 1.5, 0.5, 1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    const onEnd = () => {
      setSpinning(false);
      setCurrentRotation(normalizeDeg(newRotation));

      // Trigger the backend API call for the high-res image
      onCardSelected(card);

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    };

    if (wheelRef.current) {
      wheelRef.current.addEventListener("transitionend", onEnd, { once: true });
    } else {
      setTimeout(onEnd, 2500);
    }
  };

  return (
    <div className="flex flex-col items-center relative w-full pt-4">
      {/* WHEEL CONTAINER */}
      <div
        className="relative overflow-hidden"
        style={{ width: radius * 2, height: radius }}
      >
        <Wheel
          displayedCards={cards}
          wheelRef={wheelRef}
          radius={radius}
        />

        {/* 1. THE "FOG" FADE: Hides the flat bottom edge perfectly */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#1a1b4b] to-transparent z-10" />

        {/* 2. THE GLOWING RIFT: This is the "Creative" part. It makes the cut intentional. */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[4px] z-20"
          style={{
            background: 'linear-gradient(90deg, transparent, #60a5fa, #fff, #60a5fa, transparent)',
            boxShadow: '0 -4px 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.4)',
            filter: 'blur(1px)',
            borderRadius: '50%'
          }}
        />

        {/* 3. THE "GEM" BUTTON: Change the Spin button into a glowing focal point */}
        <button
          onClick={handleSpin}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                  w-24 h-24 rounded-full z-40 flex items-start justify-center pt-4
                  font-black text-xl tracking-widest text-white transition-all duration-300
                  ${spinning ? "scale-90 brightness-75" : "hover:scale-110 hover:brightness-110 active:scale-95"}`}
          style={{
            background: 'radial-gradient(circle at center, #3b82f6 0%, #1e3a8a 100%)',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), inset 0 2px 4px rgba(255,255,255,0.5)',
            border: '4px solid #fff'
          }}
        >
          {spinning ? "..." : "SPIN"}
        </button>
      </div>

      {/* 4. GROUND REFLECTION: Makes the wheel feel like it's emitting light downward */}
      <div
        className="w-1/2 h-8 -mt-2 opacity-30 blur-2xl rounded-full"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
      />
    </div>
  );
}