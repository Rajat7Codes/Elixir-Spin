import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import DeckSection from "../components/DeckSection";
import type { Card } from "../model/Card";
import { generateDeck } from "../utils/randomizeDeck";

export default function RandomizerPage() {
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  
  // Category selections for streamer
  const [categories, setCategories] = useState({
    evolution: false,
    building: false,
    champion: false,
    smallSpell: false,
    winCondition: false,
    bigSpell: false,
    airCounter: false,
    trollCard: false,
  });

  // Fetch cards
  useEffect(() => {
    apiClient
      .get("/clash/cards")
      .then((res) => {
        setFilteredCards(res.data.items);
      })
      .catch(console.error);
  }, []);

  // Randomizer core logic
  const handleRandomize = () => {
    setDeck(generateDeck(filteredCards, categories));
  };

  const handleRemove = (card: Card) => {
    setDeck((prev) => prev.filter((c) => c.id !== card.id));
  };

  const toggleCategory = (key: keyof typeof categories) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full px-5 py-10 mx-auto">

      {/* Deck */}
      <DeckSection deck={deck} onRemove={handleRemove} maxSlots={8} />
      
      {/* Category Toggles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-2 rounded-2xl shadow-xl border border-indigo-400 text-white w-full">
        {Object.entries(categories).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-2 bg-primary hover:bg-white/20 transition-all rounded-xl p-2 cursor-pointer shadow-md"
            onClick={() => toggleCategory(key as keyof typeof categories)}
          >
            {/* Label */}
            <span className="text-xs sm:text-sm font-semibold text-center capitalize tracking-wide">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            
            {/* Switch */}
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                readOnly
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/30 peer-checked:bg-emerald-600 peer-focus:outline-none rounded-full peer transition-all"></div>
              <div className="absolute left-1 top-1  bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5 shadow-md "></div>
            </div>
          </div>
        ))}
      </div>


      {/* Randomize Button */}
      <button
        onClick={handleRandomize}
        className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
      >
        🎲 Randomize Deck
      </button>
    </div>
  );
}
