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
  icon: string;
  gradient: string;
  badge: string;
}

export const CHALLENGE_TYPES: ChallengeType[] = [
  {
    id: 1,
    name: "Spin Wheel",
    description: "Spin the wheel and let fate decide your cards — rarity, elixir cost, win condition and more.",
    path: "/challenge-types/spin-wheel",
    icon: "🎡",
    gradient: "from-orange-500 via-red-500 to-rose-600",
    badge: "Luck-based",
  },
  {
    id: 2,
    name: "Slot Machine",
    description: "Pull the lever! Three cards are shown — pick one for your deck, slot by slot.",
    path: "/challenge-types/slot-machine",
    icon: "🎰",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    badge: "Choice-based",
  },
  {
    id: 3,
    name: "Randomizer",
    description: "Get a fully randomized deck instantly or apply wild rule modifiers for chaos mode.",
    path: "/challenge-types/randomizer",
    icon: "🎲",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    badge: "Full random",
  },
];
