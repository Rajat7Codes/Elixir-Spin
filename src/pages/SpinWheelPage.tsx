import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import SpinWheel from "../components/SpinWheel";
import CardFilters from "../components/CardFilters";
import type { Card } from "../model/Card";

export default function SpinWheelPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]); // persistent deck
  const [filters, setFilters] = useState({
    rarity: "",
    elixir: "",
    name: "",
    hasEvolution: false,
  });

  useEffect(() => {
    apiClient
      .get("/clash/cards")
      .then((res) => {
        setCards(res.data.items);
        setFilteredCards(res.data.items);
      })
      .catch(console.error);
  }, []);

  // ✅ Only re-filter — don’t reset selected cards
  useEffect(() => {
    let result = [...cards];

    if (filters.rarity) {
      result = result.filter((c) => c.rarity.toLowerCase() === filters.rarity);
    }
    if (filters.elixir) {
      result = result.filter(
        (c) => c.elixirCost === parseInt(filters.elixir, 10)
      );
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
    <div className="flex flex-col items-center gap-8 mx-auto py-10">
      {/* 🎡 Spin Wheel (Middle) */}
      <div className="flex justify-center">
        <SpinWheel
          cards={filteredCards}
          maxSpins={8}
          onCardSelected={(card) => {
            if (selectedCards.length < 8) setSelectedCards([...selectedCards, card]);
          }}
        />
      </div>

      {/* 🔎 Filters + Spin Button (Bottom) */}
      <div className="w-full px-3">
        <CardFilters filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}
