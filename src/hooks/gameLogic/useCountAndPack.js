import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, countingObjects, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const roundConfig = {
  1: { targetRange: [3, 4], extras: 2 },
  2: { targetRange: [4, 6], extras: 3 },
  3: { targetRange: [6, 8], extras: 4 }
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useCountAndPack() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [theme, setTheme] = useState(countingObjects[0]);
  const [targetCount, setTargetCount] = useState(3);
  const [items, setItems] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('count-and-pack');
  const selectedCountRef = useRef(0);
  const targetCountRef = useRef(0);

  useEffect(() => {
    selectedCountRef.current = selectedCount;
  }, [selectedCount]);

  useEffect(() => {
    targetCountRef.current = targetCount;
  }, [targetCount]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();

    const config = roundConfig[difficulty] || roundConfig[1];
    const nextTheme = countingObjects[Math.floor(Math.random() * countingObjects.length)];
    const nextTarget = randomInRange(config.targetRange[0], config.targetRange[1]);
    const totalItems = nextTarget + config.extras;
    const nextItems = shuffle(
      Array.from({ length: totalItems }, (_, index) => ({
        id: `${nextTheme.name}-${index}`,
        selected: false
      }))
    );

    setTheme(nextTheme);
    setTargetCount(nextTarget);
    setItems(nextItems);
    setSelectedCount(0);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Pack ${nextTarget} ${nextTheme.name}. Tap them, then tap pack it.`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleItemPress = useCallback((itemId) => {
    setItems((prev) => {
      const nextItems = prev.map((item) => (item.id === itemId ? { ...item, selected: !item.selected } : item));
      const nextSelectedCount = nextItems.filter((item) => item.selected).length;

      setSelectedCount(nextSelectedCount);
      return nextItems;
    });
    setFeedback({ show: false, type: '', message: '' });
  }, []);

  const handlePack = useCallback(async () => {
    const isCorrect = selectedCountRef.current === targetCountRef.current;

    if (isCorrect) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('count-and-pack', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('count-and-pack', true);
      speak(phrase, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase =
      selectedCountRef.current < targetCountRef.current
        ? `You need ${targetCountRef.current - selectedCountRef.current} more.`
        : `That is too many. Try taking some out.`;

    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('count-and-pack', false);
    speak(getRandomPhrase(wrongPhrases), 'effect');
    await vibrate();
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, speak, vibrate]);

  return {
    theme,
    targetCount,
    items,
    selectedCount,
    score,
    feedback,
    showConfetti,
    handleItemPress,
    handlePack,
    speak
  };
}
