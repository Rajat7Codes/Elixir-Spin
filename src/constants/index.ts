// ClashHub Central Constants

export const RARITIES = ["ALL", "COMMON", "RARE", "EPIC", "LEGENDARY", "CHAMPION"];

export const ELIXIR_COSTS = [
  { value: "ALL", label: "All" },
  { value: "ONE", label: "1" },
  { value: "TWO", label: "2" },
  { value: "THREE", label: "3" },
  { value: "FOUR", label: "4" },
  { value: "FIVE", label: "5" },
  { value: "SIX", label: "6" },
  { value: "SEVEN", label: "7" },
  { value: "EIGHT", label: "8" },
];

export interface ChallengeType {
  id: number;
  name: string;
  description: string;
  path: string;
}

export const CHALLENGE_TYPES: ChallengeType[] = [
  {
    id: 1,
    name: "Spin Wheel",
    description: "Randomized spin mechanics like card, rarity, elixir, wincon.",
    path: "/challenge-types/spin-wheel",
  },
  {
    id: 2,
    name: "Slot Machine",
    description: "3-card slot machine spins to select one or more cards for the deck.",
    path: "/challenge-types/slot-machine",
  },
  {
    id: 3,
    name: "Randomizer",
    description: "Pure random deck or rules (mirror, lane restrictions, last-card cycle, etc).",
    path: "/challenge-types/randomizer",
  },
];
