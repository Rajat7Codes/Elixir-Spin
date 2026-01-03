import { useState } from "react";
import type { Card } from "../model/Card";

interface RollConfig {
  frames?: number;
  interval?: number;
}

export function useSlotRoll() {
  const [rolling, setRolling] = useState(false);
  const [slotOptions, setSlotOptions] = useState<Card[]>([]);

  const roll = (
    availableCards: Card[],
    finalOptions: Card[],
    config: RollConfig = {}
  ) => {
    const { frames = 8, interval = 100 } = config;

    if (availableCards.length === 0) return;

    setRolling(true);
    setSlotOptions([]);

    let remainingFrames = frames;

    const rollInterval = setInterval(() => {
      if (remainingFrames <= 0) {
        clearInterval(rollInterval);
        setSlotOptions(finalOptions);
        setRolling(false);
        return;
      }

      const rollingCards = finalOptions.map(() => {
        const idx = Math.floor(Math.random() * availableCards.length);
        return availableCards[idx];
      });

      setSlotOptions(rollingCards);
      remainingFrames--;
    }, interval);
  };

  return {
    rolling,
    slotOptions,
    roll,
    clearSlots: () => setSlotOptions([]),
  };
}
