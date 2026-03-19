import { useState } from "react";
import apiClient from "../api/apiClient";
import DeckSection from "../components/DeckSection";
import type { DeckCard } from "../types/deck";

type CategoryKey =
  | "evolution"
  | "building"
  | "champion"
  | "smallSpell"
  | "winCondition"
  | "bigSpell"
  | "airCounter"
  | "trollCard";

const INITIAL_CATEGORIES: Record<CategoryKey, boolean> = {
  evolution: false,
  building: false,
  champion: false,
  smallSpell: false,
  winCondition: false,
  bigSpell: false,
  airCounter: false,
  trollCard: false,
};

export default function RandomizerPage() {
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const handleRandomize = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/randomize", {
        filters: categories,
        source: 'randomizer'
      });
      setDeck(response.data.items);
    } catch (error) {
      console.error("Failed to generate deck from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id: number) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCategory = (key: CategoryKey) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full px-5 py-10 mx-auto max-w-6xl">
      <DeckSection
        deck={deck}
        onRemove={handleRemove}
        maxSlots={8}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 bg-[#12153f]/80 p-2 rounded-3xl shadow-2xl border border-indigo-500/30 w-full">
        {(Object.entries(categories) as [CategoryKey, boolean][]).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between bg-indigo-900/40 hover:bg-indigo-800/60 transition-all rounded-2xl px-4 py-2 cursor-pointer border border-white/5 shadow-inner"
            onClick={() => toggleCategory(key)}
          >
            <span className="text-sm font-bold text-white tracking-tight">
              {key === "evolution" ? "S1: Evolution" : key === "champion" ? "S2: Hero/Champ" : key.replace(/([A-Z])/g, " $1")}
            </span>

            <div className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-gray-700'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-7' : 'left-1'}`} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleRandomize}
        disabled={loading}
        className={`relative group overflow-hidden px-12 py-4 rounded-2xl font-black text-white uppercase tracking-tighter transition-all shadow-xl
          ${loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:scale-105 active:scale-95 shadow-indigo-500/20"
          }`}
      >
        <div className="flex items-center gap-2">
          <span className={loading ? "animate-spin" : "group-hover:rotate-12 transition-transform"}>
            {loading ? "⌛" : "🎲"}
          </span>
          {loading ? "Building Deck..." : "Randomize Deck"}
        </div>
      </button>
    </div>
  );
}
