import { useState } from "react";

interface DeckSectionProps {
  deck: any[];
  onRemove: (card: any) => void;
  maxSlots?: number;
}

export default function DeckSection({ deck, onRemove, maxSlots = 8 }: DeckSectionProps) {
  const [copied, setCopied] = useState(false);
  const emptySlots = maxSlots - deck.length;

  const handleCopyDeck = async () => {
    if (deck.length < maxSlots) return;

    const ids = deck.map((c) => c.id).join(";");
    const link = `https://link.clashroyale.com/en?clashroyale://copyDeck?deck=${ids}&slots=0;0;0;0;0;0;0;0`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy deck:", err);
    }
  };

  return (
    <div className="flex flex-col gap-1 p-3">
      {/* Deck Grid */}
      <div className="grid grid-cols-4 max-w-[1200px] sm:grid-cols-8 gap-2 bg-[#12153f] p-1 rounded-xl shadow-md border w-full">
        {deck.map((card) => (
          <div
            key={card.id}
            className="min-h-[100px] min-w-[75px] max-h-[180px] max-w-[140px] relative rounded-lg flex flex-col items-center justify-center text-sm font-mediu overflow-hidden"
          >
            {/* Remove Button */}
            <button
              onClick={() => onRemove(card)}
              className="h-full w-full absolute top-1 right-1"
              title="Remove card" > <div></div> </button>

            {/* Card Image */}
            <img
              src={card.iconUrls.medium}
              alt={card.name}
              className="w-full object-contain rounded-md"
            />
          </div>
        ))}

        {/* Empty Slots */}
        {[...Array(emptySlots)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="min-h-[100px] min-w-[75px] max-h-[180px] max-w-[140px]  relative rounded-lg flex flex-col items-center justify-center text-sm font-medium
            bg-primary border-2 border-accentsecondary text-gray-400"
          >
            Empty
          </div>
        ))}
      </div>

      {/* Copy Deck Button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleCopyDeck}
          disabled={deck.length < maxSlots}
          className={`px-4 py-1 rounded-lg text-sm font-semibold transition
            ${deck.length === maxSlots ? "bg-green-600 hover:bg-green-600 text-gray-200" : "bg-gray-500 text-gray-700 cursor-not-allowed"}`}
        >
          {copied ? "Copied! ✅" : "Copy Deck"}
        </button>
      </div>
    </div>
  );
}
