import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const scenes = [
  {
    id: 'garden',
    title: 'Garden Scene',
    prompt: 'Build the sunny garden.',
    items: [
      { id: 'sun', name: 'Sun', emoji: '\u2600\uFE0F', slot: 'sky' },
      { id: 'tree', name: 'Tree', emoji: '\u{1F333}', slot: 'garden' },
      { id: 'flower', name: 'Flower', emoji: '\u{1F338}', slot: 'ground' }
    ]
  },
  {
    id: 'pond',
    title: 'Pond Scene',
    prompt: 'Build the little pond.',
    items: [
      { id: 'cloud', name: 'Cloud', emoji: '\u2601\uFE0F', slot: 'sky' },
      { id: 'duck', name: 'Duck', emoji: '\u{1F986}', slot: 'water' },
      { id: 'frog', name: 'Frog', emoji: '\u{1F438}', slot: 'grass' }
    ]
  },
  {
    id: 'night',
    title: 'Night Scene',
    prompt: 'Build the sleepy night sky.',
    items: [
      { id: 'moon', name: 'Moon', emoji: '\u{1F319}', slot: 'sky' },
      { id: 'star', name: 'Star', emoji: '\u2B50', slot: 'stars' },
      { id: 'house', name: 'House', emoji: '\u{1F3E0}', slot: 'ground' }
    ]
  }
];

const slotLabels = {
  sky: 'Sky',
  garden: 'Garden',
  ground: 'Ground',
  water: 'Water',
  grass: 'Grass',
  stars: 'Stars'
};

export function useBuildAScene() {
  const { recordAttempt, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [scene, setScene] = useState(scenes[0]);
  const [tray, setTray] = useState(scenes[0].items);
  const [placed, setPlaced] = useState({});
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const nextScene = scenes[Math.floor(Math.random() * scenes.length)];
    setScene(nextScene);
    setTray(shuffle([...nextScene.items]));
    setPlaced({});
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(nextScene.prompt, 'question');
  }, [clearTimer, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const targetItem = scene.items[Object.keys(placed).length];

  const handleItemPress = useCallback(async (item) => {
    if (!targetItem) {
      return;
    }

    if (item.id === targetItem.id) {
      const nextPlaced = { ...placed, [item.slot]: item };
      const finished = Object.keys(nextPlaced).length === scene.items.length;

      setPlaced(nextPlaced);
      setTray((prev) => prev.filter((entry) => entry.id !== item.id));

      if (finished) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('build-a-scene', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('build-a-scene', true);
        speak(`${scene.title} is all built. ${phrase}`, 'effect');

        clearTimer();
        timeoutRef.current = setTimeout(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      } else {
        speak(`Nice. Now place the ${scene.items[Object.keys(nextPlaced).length].name}.`, 'effect');
      }

      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('build-a-scene', false);
    speak(`Let's find the ${targetItem.name}.`, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, placed, recordAttempt, scene.items, scene.title, speak, targetItem, vibrate]);

  return {
    scene,
    tray,
    placed,
    targetItem,
    score,
    feedback,
    showConfetti,
    handleItemPress,
    speak,
    slotLabels
  };
}
