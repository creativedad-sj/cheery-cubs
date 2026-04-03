import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const objectPool = [
  { id: 'coin', name: 'Coin', emoji: '🪙', bucket: 'flat' },
  { id: 'plate', name: 'Plate', emoji: '🍽️', bucket: 'flat' },
  { id: 'sign', name: 'Sign', emoji: '🪧', bucket: 'flat' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', bucket: 'flat' },
  { id: 'ball', name: 'Ball', emoji: '⚽', bucket: 'solid' },
  { id: 'can', name: 'Can', emoji: '🥫', bucket: 'solid' },
  { id: 'box', name: 'Box', emoji: '📦', bucket: 'solid' },
  { id: 'party-hat', name: 'Party Hat', emoji: '🥳', bucket: 'solid' }
];

const roundLengths = { 1: 4, 2: 5, 3: 6 };

export function useFlatOrSolid() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('flat-or-solid');

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const nextLength = roundLengths[difficulty] || roundLengths[1];
    const nextQueue = shuffle([...objectPool]).slice(0, nextLength);

    setQueue(nextQueue);
    setCurrentIndex(0);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak('Sort each object into flat or solid.', 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const currentItem = queue[currentIndex] || objectPool[0];

  const handleBucketPress = useCallback(async (bucket) => {
    if (bucket === currentItem.bucket) {
      const isLast = currentIndex === queue.length - 1;

      if (isLast) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('flat-or-solid', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('flat-or-solid', true);
        speak(phrase, 'effect');

        clearTimer();
        timeoutRef.current = setTimeout(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      } else {
        setCurrentIndex((prev) => prev + 1);
        speak('Nice sorting.', 'effect');
      }
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('flat-or-solid', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, currentIndex, currentItem.bucket, getProjectedStats, nextRound, queue.length, recordAttempt, speak, vibrate]);

  return {
    currentItem,
    currentIndex,
    totalItems: queue.length,
    score,
    feedback,
    showConfetti,
    handleBucketPress,
    speak
  };
}
