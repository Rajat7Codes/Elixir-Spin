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
    // Correct universal link
    const deckLink = `https://link.clashroyale.com/?clashroyale://copyDeck?deck=${ids}`;

    try {
      // Copy to clipboard
      // await navigator.clipboard.writeText(deckLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // 🔹 Try opening the Clash Royale app via deep link
      const clashRoyaleURL = `clashroyale://copyDeck?deck=${ids}&l=Royals&tt=159000000`;
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);

      if (isIOS || isAndroid) {
        // Open app in new tab (browser will redirect to app if installed)
        const newWindow = window.open(clashRoyaleURL, "_blank");

        // Fallback to official link after short delay if app not installed
        setTimeout(() => {
          if (newWindow && !newWindow.closed) {
            newWindow.location.href = deckLink;
          } else {
            window.open(deckLink, "_blank");
          }
        }, 1500);
      } else {
        // Fallback for desktop browsers
        window.open(deckLink, "_blank");
      }
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
            className="min-h-[90px] min-w-[60px] max-h-[180px] max-w-[140px] relative rounded-lg flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Remove Button */}
            <button
              onClick={() => onRemove(card)}
              className="h-full w-full absolute top-1 right-1"
              title="Remove card"
            >
              <div></div>
            </button>

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
            className="min-h-[90px] min-w-[60px] max-h-[180px] max-w-[140px]  relative rounded-lg flex flex-col items-center justify-center text-sm font-medium
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
            ${
              deck.length === maxSlots
                ? "bg-green-600 hover:bg-green-600 text-gray-200"
                : "bg-gray-500 text-gray-700 cursor-not-allowed"
            }`}
        >
          {copied ? "Copied! ✅" : "Copy Deck"}
        </button>
      </div>
    </div>
  );
}
