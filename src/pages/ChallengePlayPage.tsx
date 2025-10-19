import { useEffect, useState } from "react";
import SpinWheel from "../components/SpinWheel"; // <-- your custom wheel component
import apiClient from "../api/apiClient";

const RARITIES = ["COMMON", "RARE", "EPIC", "LEGENDARY", "CHAMPION"];

export default function ChallengePlayPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    rarity: "",
    elixir: "",
    name: "",
    hasEvolution: false,
  });

  // 🔥 Load from backend once
  useEffect(() => {
    apiClient
      .get("/clash/cards")
      .then((res) => {
        setCards(res.data.items);         // store full list
        setFilteredCards(res.data.items); // initially show all
      })
      .catch(console.error);
  }, []);

  // 🎯 Apply filters whenever filters or cards change
  useEffect(() => {
    let result = [...cards];

    if (filters.rarity) {
      result = result.filter((c) => c.rarity === filters.rarity);
    }
    if (filters.elixir) {
      result = result.filter((c) => c.elixirCost === parseInt(filters.elixir));
    }
    if (filters.name) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.hasEvolution) {
      result = result.filter((c) => (c.maxEvolutionLevel ?? 0) > 0);
    }

    setFilteredCards(result);
  }, [filters, cards]);

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* 🔎 Filter Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-xl shadow-lg">
        <div>
          <label className="block text-sm font-semibold mb-1">Rarity</label>
          <select
            className="w-full border rounded-lg p-2"
            value={filters.rarity}
            onChange={(e) => setFilters({ ...filters, rarity: e.target.value })}
          >
            <option value="">All</option>
            {RARITIES.map((r) => (
              <option key={r} value={r.toLowerCase()}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Elixir</label>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="e.g. 3"
            className="w-full border rounded-lg p-2"
            value={filters.elixir}
            onChange={(e) =>
              setFilters({ ...filters, elixir: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-lg p-2"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.hasEvolution}
              onChange={(e) =>
                setFilters({ ...filters, hasEvolution: e.target.checked })
              }
            />
            Has Evolution
          </label>
        </div>
      </div>

      {/* 🎡 Spin Wheel */}
      <div className="flex flex-col items-center gap-4">
        {filteredCards.length > 0 ? (
          <SpinWheel cards={filteredCards} maxSpins={8} />
        ) : (
          <p className="text-gray-600 italic">
            No cards match your filters. Try adjusting!
          </p>
        )}
      </div>
    </div>
  );
}
