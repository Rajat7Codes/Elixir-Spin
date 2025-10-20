import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import DeckSection from "../components/DeckSection";
import type { Card } from "../model/Card";

export default function RandomizerPage() {
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  
  // 🎛️ Category selections for streamer
  const [categories, setCategories] = useState({
    evolution: false,
    building: false,
    champion: false,
    smallSpell: false,
    winCondition: false,
    bigSpell: false,
    airCounter: false,
    trollCard: false,
  });

  // Fetch cards
  useEffect(() => {
    apiClient
      .get("/clash/cards")
      .then((res) => {
        setFilteredCards(res.data.items);
      })
      .catch(console.error);
  }, []);

  // 🎰 Randomizer core logic
  const handleRandomize = () => {
    let available = [...filteredCards];
    const newDeck: Card[] = [];

    const pickRandom = (filterFn?: (c: Card) => boolean) => {
      const pool = filterFn ? available.filter(filterFn) : available;
      if (pool.length === 0) return null;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      available = available.filter((c) => c.id !== chosen.id);
      return chosen;
    };

    // 🧬 Evolutions (slots 1 & 2)
    if (categories.evolution) {
      const evolutions = available.filter((c) => (c.maxEvolutionLevel ?? 0) > 0);
      for (let i = 0; i < 2 && evolutions.length > 0; i++) {
        const card = pickRandom((c) => evolutions.includes(c));
        if (card) newDeck.push(card);
      }
    }

    // 🏰 Building
    if (categories.building) {
      const building = pickRandom((c) => 
        ["tombstone", "goblin cage", "x-bow", "tesla", "barbarian hut", "bomb tower", "inferno tower", "mortar", "cannon", "goblin hut"].includes(
          c.name.toLowerCase()
        )
      );
      if (building) newDeck.push(building);
    }

    // 🏆 Champion (only 1)
    let championChosen = false;
    if (categories.champion) {
      const champ = pickRandom((c) => c.rarity.toLowerCase() === "champion");
      if (champ) {
        newDeck.push(champ);
        championChosen = true;
      }
    }

    // 🔮 Small Spell
    if (categories.smallSpell) {
      const smallSpell = pickRandom((c) => 
        ["vines", "goblin curse", "void", "giant snowball", "tornado", "rage", "the log", "zap", "arrows"].includes(
          c.name.toLowerCase()
        )
      );
      if (smallSpell) newDeck.push(smallSpell);
    }

    // 💣 Big Spell
    if (categories.bigSpell) {
      const bigSpell = pickRandom((c) => 
        ["earthquake", "poison", "lightning", "rocket", "fireball"].includes(
          c.name.toLowerCase()
        )
      );
      if (bigSpell) newDeck.push(bigSpell);
    }

    // 🏹 Air Counter
    if (categories.airCounter) {
      const airCounter = pickRandom((c) =>
        ["archers", "phoenix", "spirit empress", "little prince", "magic archer", "mother witch", "electro dragon", "firecracker", "archer queen", "hunter", "princess", "executioner", "spear goblins", "dart goblin", "goblin gang", "minions", "mega minion", "minion horde", "ice wizard", "musketeer", "three musketeers", "baby dragon", "skeleton dragons", "wizard", "electro wizard"].includes(
          c.name.toLowerCase()
        )
      );
      if (airCounter) newDeck.push(airCounter);
    }

    // 🌀 Win Condition
    if (categories.winCondition) {
      const winCond = pickRandom((c) =>
        ["goblin barrel", "battle ram", "balloon", "lava hound", "skeleton barrel", "hog rider", "ram rider", "wall breakers", "golem", "royal giant", "royal hogs", "x-bow", "mortar", "miner", "graveyard", "balloon", "goblinstein", "suspicious bush", "electro giant", "elixir golem", "giant", "goblin giant"].includes(
          c.name.toLowerCase()
        )
      );
      if (winCond) newDeck.push(winCond);
    }

    // 🃏 Troll Card
    if (categories.trollCard) {
      const troll = pickRandom((c) =>
        ["mirror", "clone", "minion horde", "elite barbarians", "freeze", "goblin curse", "vines"].includes(c.name.toLowerCase())
      );
      if (troll) newDeck.push(troll);
    }

    // 🧩 Fill remaining slots (avoid duplicates, max 1 champion)
    while (newDeck.length < 8 && available.length > 0) {
      const card = pickRandom((c) =>
        championChosen ? c.rarity.toLowerCase() !== "champion" : true
      );
      if (card) newDeck.push(card);
    }

    setDeck(newDeck.slice(0, 8));
  };

  const handleRemove = (card: Card) => {
    setDeck((prev) => prev.filter((c) => c.id !== card.id));
  };

  const toggleCategory = (key: keyof typeof categories) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full px-5 py-10 mx-auto">

      {/* 🧩 Deck */}
      <DeckSection deck={deck} onRemove={handleRemove} maxSlots={8} />
      
      {/* ⚙️ Category Toggles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-2 rounded-2xl shadow-xl border border-indigo-400 text-white w-full">
        {Object.entries(categories).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-2 bg-primary hover:bg-white/20 transition-all rounded-xl p-2 cursor-pointer shadow-md"
            onClick={() => toggleCategory(key as keyof typeof categories)}
          >
            {/* Label */}
            <span className="text-xs sm:text-sm font-semibold text-center capitalize tracking-wide">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            
            {/* Switch */}
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                readOnly
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/30 peer-checked:bg-emerald-600 peer-focus:outline-none rounded-full peer transition-all"></div>
              <div className="absolute left-1 top-1  bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5 shadow-md "></div>
            </div>
          </div>
        ))}
      </div>


      {/* 🎲 Randomize Button */}
      <button
        onClick={handleRandomize}
        className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
      >
        🎲 Randomize Deck
      </button>
    </div>
  );
}
