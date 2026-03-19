import CardFilters from "../components/CardFilters";
import SlotMachine from "../components/SlotMachine";
import { useDeckManager } from "../hooks/useDeckManager";

export default function SlotMachinePage() {
  const {
    deck,
    addCard,
    removeCard,
    availableCards,
    loading,
    filters,
    setFilters,
    currentSlot,
  } = useDeckManager('slot_machine');

  return (
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto py-10">
      <div className="w-full flex justify-center">
        <SlotMachine
          pool={availableCards}
          deck={deck}
          currentSlot={currentSlot}
          onCardAdded={addCard}
          onCardRemoved={removeCard}
          isLoading={loading}
        />
      </div>

      <div className="w-full px-3">
        <CardFilters filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}