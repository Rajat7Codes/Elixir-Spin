import React from "react";

interface CardFiltersProps {
  filters: {
    rarity: string;
    elixir: string;
    name: string;
    hasEvolution: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      rarity: string;
      elixir: string;
      name: string;
      hasEvolution: boolean;
    }>
  >;
}

const RARITIES = ["Common", "Rare", "Epic", "Legendary", "Champion"];
const ELIXIR_COSTS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function CardFilters({ filters, setFilters }: CardFiltersProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 p-5 rounded-2xl shadow-xl border border-indigo-400 text-white">
      {/* Rarity */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1 opacity-90">Rarity</label>
        <select
          className="w-full rounded-lg bg-white/90 text-gray-800 p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition font-medium"
          value={filters.rarity}
          onChange={(e) => setFilters((f) => ({ ...f, rarity: e.target.value }))}
        >
          <option value="">All</option>
          {RARITIES.map((r) => (
            <option key={r} value={r.toLowerCase()}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Elixir */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1 opacity-90">Elixir</label>
        <select
          className="w-full rounded-lg bg-white/90 text-gray-800 p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition font-medium"
          value={filters.elixir}
          onChange={(e) => setFilters((f) => ({ ...f, elixir: e.target.value }))}
        >
          <option value="">All</option>
          {ELIXIR_COSTS.map((eCost) => (
            <option key={eCost} value={eCost}>
              {eCost} Elixir
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-semibold mb-1 opacity-90">Name</label>
        <input
          type="text"
          placeholder="Search cards..."
          className="w-full rounded-lg bg-white/90 text-gray-800 p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition font-medium placeholder-gray-500"
          value={filters.name}
          onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
        />
      </div>

      {/* Has Evolution (Styled Toggle) */}
      <div className="flex flex-col justify-center items-center">
        <label className="text-sm font-semibold mb-2 opacity-90">Evolution</label>
        <div
          className="relative inline-flex items-center cursor-pointer"
          onClick={() =>
            setFilters((f) => ({ ...f, hasEvolution: !f.hasEvolution }))
          }
        >
          <input
            type="checkbox"
            checked={filters.hasEvolution}
            readOnly
            className="sr-only peer"
          />
          <div className="w-11 h-6  bg-white/30 peer-checked:bg-emerald-600  peer-focus:outline-none rounded-full peer transition-all"></div>
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5 shadow-md"></div>
        </div>
      </div>
    </div>
  );
}
