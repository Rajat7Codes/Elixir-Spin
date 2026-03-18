import { useState, useCallback, useEffect } from "react";
import apiClient from "../api/apiClient";
import type { DeckCard } from "../types/deck";

export interface FilterState {
  rarity: string;
  elixirCost: string;
  name: string;
  isEvolution: boolean;
  isHero: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  rarity: "ALL",
  elixirCost: "ALL",
  name: "",
  isEvolution: false,
  isHero: false,
};

export function useDeckManager() {
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [availableCards, setAvailableCards] = useState<DeckCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const currentSlot = deck.length + 1;

  const fetchAvailableCards = useCallback(async () => {
    if (currentSlot > 8) return;
    setLoading(true);
    try {
      const response = await apiClient.post("/spin/load", {
        slotNumber: currentSlot,
        filter: filters,
        deckState: deck,
      });
      setAvailableCards(response.data.availableCard);
    } catch (error) {
      console.error("Failed to load cards:", error);
    } finally {
      setLoading(false);
    }
  }, [currentSlot, filters, deck]);

  useEffect(() => {
    fetchAvailableCards();
  }, [fetchAvailableCards]);

  const addCard = useCallback((newCard: DeckCard) => {
    setDeck((prev) => [...prev, newCard]);
  }, []);

  const removeCard = useCallback((id: number) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    deck,
    setDeck,
    availableCards,
    loading,
    filters,
    setFilters,
    currentSlot,
    addCard,
    removeCard,
    refreshCards: fetchAvailableCards,
  };
}
