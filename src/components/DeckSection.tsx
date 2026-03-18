import { useState } from "react";
import { shareDeck } from "../utils/copyDeck";
import type { DeckCard } from "../types/deck";

interface DeckSectionProps {
  deck: DeckCard[];
  onRemove: (id: number) => void;
  maxSlots?: number;
}

export default function DeckSection({ deck, onRemove, maxSlots = 8 }: DeckSectionProps) {
  const [copied, setCopied] = useState(false);
  const emptySlots = maxSlots - deck.length;

  const handleCopyDeck = async () => {
    if (deck.length < maxSlots) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      await shareDeck(deck);
    } catch (err) {
      console.error("Failed to copy deck", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full px-2">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 bg-[#12153f] p-3 rounded-2xl shadow-xl border border-indigo-500/30 w-full">
        {deck.map((card) => (
          <div
            key={card.id}
            onClick={() => onRemove(card.id)}
            className="relative aspect-[2/3] w-full group rounded-lg overflow-hidden border border-white/5 cursor-pointer transition-transform hover:scale-105 bg-[#0a0c29]"
          >
            <img
              src={card.imageUrl}
              alt={card.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-red-600/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
               <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">REMOVE</span>
            </div>
            <div className="absolute bottom-0 w-full bg-black/60 text-[9px] text-white text-center py-0.5 truncate px-1 z-10">
              {card.name}
            </div>
          </div>
        ))}

        {[...Array(emptySlots)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="relative aspect-[2/3] w-full rounded-lg flex items-center justify-center text-[10px] font-bold uppercase
            bg-[#0a0c29] border-2 border-dashed border-indigo-900 text-indigo-400 opacity-50 overflow-hidden"
          >
            Slot {deck.length + i + 1}
          </div>
        ))}
      </div>

      <div className="flex justify-end pr-1">
        <button
          onClick={handleCopyDeck}
          disabled={deck.length < maxSlots}
          className={`px-5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
            ${deck.length === maxSlots
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
        >
          {copied ? "Copied! ✅" : "Copy Deck"}
        </button>
      </div>
    </div>
  );
}