import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const sortableShapes = [
  { id: 'circle', name: 'Circle', emoji: '●', color: '#F87171', bucket: 'round' },
  { id: 'oval', name: 'Oval', emoji: '⬭', color: '#818CF8', bucket: 'round' },
  { id: 'square', name: 'Square', emoji: '■', color: '#60A5FA', bucket: 'corners' },
  { id: 'rectangle', name: 'Rectangle', emoji: '▬', color: '#FBBF24', bucket: 'corners' },
  { id: 'triangle', name: 'Triangle', emoji: '▲', color: '#34D399', bucket: 'corners' },
  { id: 'diamond', name: 'Diamond', emoji: '♦', color: '#FB923C', bucket: 'corners' }
];

const roundLengths = {
  1: 4,
  2: 5,
  3: 6
};

export function useShapeSortYard() {
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
  const difficulty = getDifficulty('shape-sort-yard');

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
    const nextQueue = shuffle([...sortableShapes]).slice(0, nextLength);

    setQueue(nextQueue);
    setCurrentIndex(0);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak('Sort each shape into the right tray.', 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const currentShape = queue[currentIndex] || sortableShapes[0];

  const handleBucketPress = useCallback(async (bucketId) => {
    if (!currentShape) {
      return;
    }

    if (bucketId === currentShape.bucket) {
      const isLast = currentIndex === queue.length - 1;

      if (isLast) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('shape-sort-yard', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('shape-sort-yard', true);
        speak(phrase, 'effect');

        clearTimer();
        timeoutRef.current = setTimeout(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setFeedback({ show: false, type: '', message: '' });
        speak('Nice sorting.', 'effect');
      }

      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('shape-sort-yard', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, currentIndex, currentShape, getProjectedStats, nextRound, queue.length, recordAttempt, speak, vibrate]);

  return {
    currentShape,
    currentIndex,
    totalShapes: queue.length,
    score,
    feedback,
    showConfetti,
    handleBucketPress,
    speak
  };
}

