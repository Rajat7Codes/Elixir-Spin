import type { Card } from "../model/Card";

export type DeckCategory =
  | "evolution"
  | "building"
  | "champion"
  | "smallSpell"
  | "bigSpell"
  | "airCounter"
  | "winCondition"
  | "trollCard";

type CategoryRule = {
  max?: number;
  filter: (c: Card) => boolean;
};

export const CATEGORY_RULES: Record<DeckCategory, CategoryRule> = {
  evolution: {
    max: 2,
    filter: (c) => (c.maxEvolutionLevel ?? 0) > 0,
  },
  building: {
    max: 1,
    filter: (c) =>
      [
        "tombstone",
        "goblin cage",
        "x-bow",
        "tesla",
        "barbarian hut",
        "bomb tower",
        "inferno tower",
        "mortar",
        "cannon",
        "goblin hut",
      ].includes(c.name.toLowerCase()),
  },
  champion: {
    max: 1,
    filter: (c) => c.rarity.toLowerCase() === "champion",
  },
  smallSpell: {
    max: 1,
    filter: (c) =>
      [
        "vines",
        "goblin curse",
        "void",
        "giant snowball",
        "tornado",
        "rage",
        "the log",
        "zap",
        "arrows",
      ].includes(c.name.toLowerCase()),
  },
  bigSpell: {
    max: 1,
    filter: (c) =>
      ["earthquake", "poison", "lightning", "rocket", "fireball"].includes(
        c.name.toLowerCase()
      ),
  },
  airCounter: {
    max: 1,
    filter: (c) =>
      [
        "archers",
        "phoenix",
        "spirit empress",
        "little prince",
        "magic archer",
        "mother witch",
        "electro dragon",
        "firecracker",
        "archer queen",
        "hunter",
        "princess",
        "executioner",
        "spear goblins",
        "dart goblin",
        "goblin gang",
        "minions",
        "mega minion",
        "minion horde",
        "ice wizard",
        "musketeer",
        "three musketeers",
        "baby dragon",
        "skeleton dragons",
        "wizard",
        "electro wizard",
      ].includes(c.name.toLowerCase()),
  },
  winCondition: {
    max: 1,
    filter: (c) =>
      [
        "goblin barrel",
        "battle ram",
        "balloon",
        "lava hound",
        "skeleton barrel",
        "hog rider",
        "ram rider",
        "wall breakers",
        "golem",
        "royal giant",
        "royal hogs",
        "x-bow",
        "mortar",
        "miner",
        "graveyard",
        "goblinstein",
        "suspicious bush",
        "electro giant",
        "elixir golem",
        "giant",
        "goblin giant",
      ].includes(c.name.toLowerCase()),
  },
  trollCard: {
    max: 1,
    filter: (c) =>
      ["mirror", "clone", "minion horde", "elite barbarians", "freeze", "goblin curse", "vines"].includes(
        c.name.toLowerCase()
      ),
  },
};

export function generateDeck(
  cards: Card[],
  categories: Record<DeckCategory, boolean>,
  maxDeckSize = 8
): Card[] {
  let available = [...cards];
  const deck: Card[] = [];
  let championChosen = false;

  const pick = (filter?: (c: Card) => boolean) => {
    const pool = filter ? available.filter(filter) : available;
    if (!pool.length) return null;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    available = available.filter((c) => c.id !== chosen.id);
    return chosen;
  };

  for (const [key, enabled] of Object.entries(categories) as [DeckCategory, boolean][]) {
    if (!enabled) continue;
    const rule = CATEGORY_RULES[key];
    for (let i = 0; i < (rule.max ?? 1); i++) {
      const card = pick(rule.filter);
      if (!card) break;
      if (card.rarity.toLowerCase() === "champion") championChosen = true;
      deck.push(card);
    }
  }

  while (deck.length < maxDeckSize && available.length) {
    const card = pick((c) =>
      championChosen ? c.rarity.toLowerCase() !== "champion" : true
    );
    if (!card) break;
    deck.push(card);
  }

  return deck.slice(0, maxDeckSize);
}
