import { useState, useEffect, useMemo } from "react";
import DeckSection from "./DeckSection";
import apiClient from "../api/apiClient";
import type { DeckCard } from "../types/deck";

interface SlotMachineProps {
  pool: DeckCard[];
  deck: DeckCard[];
  currentSlot: number;
  onCardAdded: (card: DeckCard) => void;
  onCardRemoved: (id: number) => void;
  isLoading: boolean;
}

export default function SlotMachine({ pool, deck, currentSlot, onCardAdded, onCardRemoved, isLoading }: SlotMachineProps) {
  const [slotOptions, setSlotOptions] = useState<DeckCard[]>([]);
  const [tempOptions, setTempOptions] = useState<DeckCard[]>([]); 
  const [rolling, setRolling] = useState(false);
  const [blindMode, setBlindMode] = useState(false);
  const maxSlots = 8;

  // 1. Available pool for the "fake" shuffle animation
  const availablePool = useMemo(() => {
    if (!pool || !deck) return [];
    const deckIds = new Set(deck.map(c => c.id));
    return pool.filter(card => !deckIds.has(card.id));
  }, [pool, deck]);

  // 2. Shuffle Effect (Flicker 3 random cards)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (rolling && availablePool.length > 0) {
      interval = setInterval(() => {
        const shuffle = [...availablePool].sort(() => 0.5 - Math.random()).slice(0, 3);
        setTempOptions(shuffle);
      }, 80);
    } else {
      setTempOptions([]);
    }
    return () => clearInterval(interval);
  }, [rolling, availablePool]);

  const handleRoll = () => {
    if (rolling || !pool || pool.length === 0 || deck.length >= maxSlots) return;

    // Record the roll metric
    apiClient.post("/metrics/roll").catch(e => console.error("Failed to record roll:", e));

    setRolling(true);
    setSlotOptions([]); 
    
    setTimeout(() => {
      // Randomly pick 3 cards from the pool on each roll
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const selection = shuffled.slice(0, 3);
      setSlotOptions(selection); 
      setRolling(false);
    }, 1000); 
  };

  const handlePick = async (card: DeckCard) => {
    if (rolling || deck.length >= maxSlots) return;
    try {
      const response = await apiClient.get(`/slot/${currentSlot}/card/${card.id}?source=slot_machine`);
      onCardAdded(response.data);
      setSlotOptions([]); 
      // Auto-roll for the next card after a short delay to let them see the selection,
      // provided they haven't reached the max slots
      if (deck.length + 1 < maxSlots) {
        setTimeout(() => {
          handleRoll();
        }, 500);
      }
    } catch (error) {
      console.error("Error picking card:", error);
    }
  };

  // Ensure we NEVER show more than 3 cards, even if state updates oddly
  const displayCards = rolling ? tempOptions.slice(0, 3) : slotOptions.slice(0, 3);

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <DeckSection deck={deck} onRemove={onCardRemoved} maxSlots={maxSlots} />

      {/* Middle - Slot Machine Container */}
      <div className="flex gap-4 justify-center items-center h-44 md:h-52 px-4 bg-gradient-to-t from-blue-900 via-indigo-900 to-purple-800 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-2 border-indigo-400/30 relative w-full max-w-2xl overflow-hidden">
        
        {displayCards.length === 0 && !rolling ? (
          <div className="text-yellow-300 font-bold uppercase tracking-widest animate-pulse drop-shadow-md">
             🎰 Click Roll to Spin
          </div>
        ) : (
          displayCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className={`relative w-24 h-32 md:w-28 md:h-36 bg-[#1a1c3d] border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-100
                ${rolling 
                  ? "border-indigo-500/50 scale-95 blur-[1px] opacity-70" 
                  : "border-yellow-400 cursor-pointer hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(250,204,21,0.3)] animate-in zoom-in-90"
                }`}
              onClick={() => !rolling && handlePick(card)}
            >
              {blindMode && !rolling ? (
                <div className="text-4xl font-extrabold text-yellow-300 animate-pulse">?</div>
              ) : (
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}

              {!rolling && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-900 bg-yellow-400 rounded-md px-2 py-0.5 w-[85%] text-center truncate uppercase">
                  {blindMode ? "???" : card.name}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleRoll}
          disabled={rolling || isLoading || deck.length >= maxSlots}
          className={`px-10 py-2.5 rounded-full font-black uppercase transition-all
            ${rolling ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-[0_4px_0_rgb(180,140,0)] active:translate-y-1 active:shadow-none"}`}
        >
          {rolling ? "Spinning..." : "Roll"}
        </button>

        <button
          onClick={() => setBlindMode(!blindMode)}
          className={`px-6 py-2 rounded-full font-bold text-xs transition-all uppercase border-2 ${blindMode ? "bg-red-500 border-red-400 text-white shadow-lg" : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"}`}
        >
          {blindMode ? "Blind: ON" : "Blind: OFF"}
        </button>
      </div>
    </div>
  );
}