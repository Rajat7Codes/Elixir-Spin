import { useState } from "react";
import DeckSection from "./DeckSection";

interface Card {
  id: number;
  name: string;
  rarity: string;
  elixirCost: number;
  maxEvolutionLevel?: number;
  iconUrls: { medium: string };
}

interface SlotMachineProps {
  cards: Card[];
  maxSpins?: number;
  onCardSelected: (card: Card) => void;
}

export default function SlotMachine({ cards, maxSpins = 8, onCardSelected }: SlotMachineProps) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [slotOptions, setSlotOptions] = useState<Card[]>([]);
  const [rolling, setRolling] = useState(false);
  const [blindMode, setBlindMode] = useState(false); // 🔹 BLIND mode
        console.log(cards);

  const handleRoll = () => {
    if (rolling || cards.length === 0 || deck.length >= maxSpins) return;

    setRolling(true);

    const hasChampion = deck.some((c) => c.rarity === "champion");

    // Filter out cards already picked + ensure Champion doesn’t repeat
    const availableCards = cards.filter((c) => {
      if (deck.some((d) => d.id === c.id)) return false;
      if (hasChampion && c.rarity === "champion") return false;
      return true;
    });

    if (availableCards.length === 0) {
      setSlotOptions([]);
      setRolling(false);
      return;
    }

    const options: Card[] = [];
    const copy = [...availableCards];
    for (let i = 0; i < 3 && copy.length > 0; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      options.push(copy[idx]);
      copy.splice(idx, 1);
    }

    setSlotOptions([]);

    const interval = 100;
    let frames = 8;
    const rollInterval = setInterval(() => {
      if (frames <= 0) {
        clearInterval(rollInterval);
        setSlotOptions(options);
        setRolling(false);
        return;
      }

      const rollingCards = options.map(() => {
        const idx = Math.floor(Math.random() * availableCards.length);
        return availableCards[idx];
      });

      setSlotOptions(rollingCards);
      frames--;
    }, interval);
  };

  const handlePick = (card: Card) => {
    if (deck.length >= maxSpins || deck.find((c) => c.id === card.id)) return;

    setDeck((prev) => [...prev, card]);
    onCardSelected(card);
    setSlotOptions([]);
    if (deck.length + 1 < maxSpins) setTimeout(handleRoll, 200);
  };

  const handleRemove = (card: Card) => {
    setDeck((prev) => prev.filter((c) => c.id !== card.id));
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* Top - Deck */}
      <DeckSection deck={deck} onRemove={handleRemove} maxSlots={maxSpins} />

      {/* Middle - Slot Machine */}
      <div className="flex gap-4 justify-center items-center h-44 md:h-52 px-4 py-2 bg-gradient-to-t from-blue-900 via-indigo-800 to-purple-700 rounded-2xl shadow-inner border border-indigo-500 relative overflow-hidden">

        {/* Subtle animated background shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)] animate-pulse" />

        {slotOptions.length === 0 ? (
          <div className="text-gray-200 text-center w-full text-sm md:text-base font-medium italic drop-shadow">
            🎰 Click <span className="text-yellow-300 font-semibold">Roll</span> to generate options
          </div>
        ) : (
          slotOptions.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="relative w-24 h-32 md:w-28 md:h-36 bg-white/10 backdrop-blur-md border-2 border-yellow-400/60 rounded-xl flex flex-col items-center justify-center cursor-pointer 
                        transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-yellow-400/40"
              onClick={() => handlePick(card)}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              {blindMode ? (
                <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-yellow-300 select-none animate-pulse">
                  ?
                </div>
              ) : (
                <img
                  src={card.iconUrls.medium}
                  alt={card.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}

              {/* Card name bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-bold 
                              text-gray-900 bg-yellow-300/80 rounded-md px-2 py-[2px] shadow-sm tracking-tight w-[85%] text-center truncate">
                {blindMode ? "???" : card.name}
              </div>

              {/* Decorative top glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 rounded-t-xl opacity-70" />
            </div>
          ))
        )}
      </div>


      {/* Bottom - Roll + Blind Button */}
      <div className="flex gap-4">
        <button
          onClick={handleRoll}
          disabled={rolling || cards.length === 0 || deck.length >= maxSpins}
          className={`px-6 py-2 rounded-lg font-semibold transition
            ${rolling ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"}`}
        >
          {rolling ? "Rolling..." : "Roll"}
        </button>

        <button
          onClick={() => setBlindMode((prev) => !prev)}
          className={`px-6 py-2 rounded-lg font-semibold transition
            ${blindMode ? "bg-red-400 hover:bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
        >
          {blindMode ? "BLIND ON" : "BLIND OFF"}
        </button>
      </div>
    </div>
  );
}
