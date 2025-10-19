import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import CardFilters from "../components/CardFilters";
import SlotMachine from "../components/SlotMachine";

export default function SlotMachinePage() {
  const [cards, setCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<any[]>([]); // persistent deck
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
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
      {/* 🎡 Spin Wheel (Middle) */}
      <div className="w-full flex justify-center">
        <SlotMachine
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
