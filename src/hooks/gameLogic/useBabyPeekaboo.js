import { useMemo, useState } from 'react';
import { useSpeech } from '../useSpeech';

const friends = [
  { id: 'bunny', name: 'Bunny', emoji: '🐰' },
  { id: 'bear', name: 'Bear', emoji: '🧸' },
  { id: 'cat', name: 'Kitty', emoji: '🐱' },
  { id: 'duck', name: 'Duck', emoji: '🦆' }
];

export function useBabyPeekaboo() {
  const speak = useSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(true);

  const friend = useMemo(() => friends[currentIndex % friends.length], [currentIndex]);

  const handlePeek = () => {
    if (isHidden) {
      setIsHidden(false);
      speak(`Peekaboo! It's ${friend.name}.`, 'question');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setIsHidden(true);
    speak('Hide again.', 'effect');
  };

  return {
    friend,
    isHidden,
    handlePeek,
    speak
  };
}
