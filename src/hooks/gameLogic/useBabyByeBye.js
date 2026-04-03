import { useMemo, useState } from 'react';
import { useSpeech } from '../useSpeech';

const friends = [
  { id: 'grandma', name: 'Grandma', emoji: '👵' },
  { id: 'dog', name: 'Doggie', emoji: '🐶' },
  { id: 'duck', name: 'Duck', emoji: '🦆' },
  { id: 'moon', name: 'Moon', emoji: '🌙' }
];

export function useBabyByeBye() {
  const speak = useSpeech();
  const [friendIndex, setFriendIndex] = useState(0);
  const [waveCount, setWaveCount] = useState(0);

  const friend = useMemo(() => friends[friendIndex % friends.length], [friendIndex]);

  const handleWave = () => {
    setWaveCount((prev) => prev + 1);
    speak(`Bye-bye, ${friend.name}!`, 'question');
    setFriendIndex((prev) => prev + 1);
  };

  return {
    friend,
    waveCount,
    handleWave,
    speak
  };
}
