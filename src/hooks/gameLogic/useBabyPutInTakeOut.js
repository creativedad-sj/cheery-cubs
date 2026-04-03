import { useMemo, useState } from 'react';
import { useSpeech } from '../useSpeech';

const toys = ['🧸', '⚽', '🦆', '🚗'];

export function useBabyPutInTakeOut() {
  const speak = useSpeech();
  const [inBasketIds, setInBasketIds] = useState([]);

  const items = useMemo(
    () =>
      toys.map((emoji, index) => ({
        id: `toy-${index}`,
        emoji,
        inBasket: inBasketIds.includes(`toy-${index}`)
      })),
    [inBasketIds]
  );

  const handleToyPress = (itemId) => {
    setInBasketIds((prev) => {
      const next = prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      speak(next.includes(itemId) ? 'In the basket.' : 'Out of the basket.', 'question');
      return next;
    });
  };

  const resetBasket = () => {
    setInBasketIds([]);
    speak('Take them out and play again.', 'effect');
  };

  return {
    items,
    basketCount: inBasketIds.length,
    allInBasket: inBasketIds.length === toys.length,
    handleToyPress,
    resetBasket,
    speak
  };
}
