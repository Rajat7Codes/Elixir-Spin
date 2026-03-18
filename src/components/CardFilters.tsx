import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { RARITIES, ELIXIR_COSTS } from "../constants";
import type { FilterState } from "../hooks/useDeckManager";

interface CardFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function CardFilters({ filters, setFilters }: CardFiltersProps) {
  // Local state for the input field so typing remains smooth
  const [searchTerm, setSearchTerm] = useState(filters.name);
  const debouncedSearch = useDebounce(searchTerm, 500);

  // When the debounced value changes, update the global filters
  useEffect(() => {
    setFilters((f) => ({ ...f, name: debouncedSearch }));
  }, [debouncedSearch, setFilters]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 p-5 rounded-2xl border border-indigo-400 text-white shadow-xl">
      {/* Rarity Select */}
      <div className="flex flex-col">
        <label className="text-xs uppercase font-bold text-indigo-200 mb-1">Rarity</label>
        <select
          className="rounded-lg bg-white/90 text-gray-800 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
          value={filters.rarity}
          onChange={(e) => setFilters((f) => ({ ...f, rarity: e.target.value }))}
        >
          {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Elixir Select */}
      <div className="flex flex-col">
        <label className="text-xs uppercase font-bold text-indigo-200 mb-1">Elixir</label>
        <select
          className="rounded-lg bg-white/90 text-gray-800 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
          value={filters.elixirCost}
          onChange={(e) => setFilters((f) => ({ ...f, elixirCost: e.target.value }))}
        >
          {ELIXIR_COSTS.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </div>

      {/* Debounced Name Input */}
      <div className="flex flex-col md:col-span-2">
        <label className="text-xs uppercase font-bold text-indigo-200 mb-1">Search Name</label>
        <input
          type="text"
          placeholder="Enter card name..."
          className="rounded-lg bg-white/90 text-gray-800 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Evolution Toggle */}
      <div className="flex flex-col items-center justify-center">
        <label className="text-xs uppercase font-bold text-indigo-200 mb-1">Evolution</label>
        <button 
          onClick={() => setFilters((f) => ({ ...f, isEvolution: !f.isEvolution }))}
          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${filters.isEvolution ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-600'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${filters.isEvolution ? 'left-7' : 'left-1'}`} />
        </button>
      </div>
    </div>
  );
}