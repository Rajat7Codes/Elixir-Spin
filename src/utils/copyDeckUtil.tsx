import type { Card } from "../model/Card";

export const shareDeck = async (deck: Card[]) => {
  if (deck.length < 8) return;

  const ids = deck.map((c) => c.id).join(";");

  const deckLink = `https://link.clashroyale.com/?clashroyale://copyDeck?deck=${ids}`;
  const clashRoyaleURL = `clashroyale://copyDeck?deck=${ids}&l=Royals&tt=159000000`;

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isIOS || isAndroid) {
    const newWindow = window.open(clashRoyaleURL, "_blank");

    setTimeout(() => {
      if (newWindow && !newWindow.closed) {
        newWindow.location.href = deckLink;
      } else {
        window.open(deckLink, "_blank");
      }
    }, 1500);
  } else {
    window.open(deckLink, "_blank");
  }
};
