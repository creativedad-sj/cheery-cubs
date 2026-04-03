import { useMemo, useState } from 'react';
import { useSpeech } from '../useSpeech';

const toys = [
  { id: 'bear', name: 'Bear', emoji: '🧸' },
  { id: 'ball', name: 'Ball', emoji: '⚽' },
  { id: 'duck', name: 'Duck', emoji: '🦆' },
  { id: 'car', name: 'Car', emoji: '🚗' }
];

function nextRound(previousIndex = -1) {
  const toyIndex = (previousIndex + 1) % toys.length;
  const hiddenIndex = Math.floor(Math.random() * 3);

  return {
    toy: toys[toyIndex],
    hiddenIndex,
    revealedIndex: null
  };
}

export function useBabyFindToy() {
  const speak = useSpeech();
  const [round, setRound] = useState(() => nextRound());

  const blankets = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => ({
        id: `blanket-${index}`,
        hasToy: round.hiddenIndex === index,
        revealed: round.revealedIndex === index
      })),
    [round.hiddenIndex, round.revealedIndex]
  );

  const handleBlanketPress = (index) => {
    if (round.revealedIndex !== null) {
      setRound((prev) => nextRound(toys.findIndex((toy) => toy.id === prev.toy.id)));
      speak('Hide the toy again.', 'effect');
      return;
    }

    setRound((prev) => ({ ...prev, revealedIndex: index }));

    if (index === round.hiddenIndex) {
      speak(`You found the ${round.toy.name}!`, 'question');
      return;
    }

    speak(`Not here. Let's look again.`, 'effect');
  };

  return {
    toy: round.toy,
    blankets,
    handleBlanketPress,
    speak
  };
}
