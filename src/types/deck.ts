// This is for the Deck (DeckCard)
// Matches your: public record DeckCard(long id, String name, String imageUrl)
export interface DeckCard {
  id: number;
  name: string;
  imageUrl: string; // This will be the dynamic Evo/Hero/Normal URL from the backend
}