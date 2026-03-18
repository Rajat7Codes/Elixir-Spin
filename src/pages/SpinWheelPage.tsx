import apiClient from "../api/apiClient";
import SpinWheel from "../components/SpinWheel";
import CardFilters from "../components/CardFilters";
import DeckSection from "../components/DeckSection";
import { useDeckManager } from "../hooks/useDeckManager";

export interface SpinCard {
  id: number;
  name: string;
  imageUrl: string;
}

export default function SpinWheelPage() {
  const {
    deck,
    setDeck,
    availableCards,
    loading,
    filters,
    setFilters,
    currentSlot,
    removeCard,
  } = useDeckManager();

  const handleCardSelected = async (selected: { id: number }) => {
    try {
      // Get the specific image (Evo/Hero/Normal) based on slot rules
      const response = await apiClient.get(`/spin/slot/${currentSlot}/card/${selected.id}`);
      setDeck((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error fetching final deck card:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 mx-auto py-10">
      <div className="w-full">
        <h2 className="text-white text-center mb-4 font-bold">Your Deck ({deck.length}/8)</h2>
        <DeckSection deck={deck} onRemove={removeCard} />
      </div>

      <SpinWheel
        cards={availableCards as unknown as SpinCard[]}
        onCardSelected={handleCardSelected}
        maxSpins={8}
        currentSlot={currentSlot}
        isLoading={loading}
      />

      <div className="w-full px-3">
        <CardFilters filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}