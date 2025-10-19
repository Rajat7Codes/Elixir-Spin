export interface Card {
  id: number;
  name: string;
  rarity: string;
  elixirCost: number;
  maxEvolutionLevel?: number;
  iconUrls: { medium: string };
  type?: string; // e.g. 'Building', 'Troop', 'Spell'
}