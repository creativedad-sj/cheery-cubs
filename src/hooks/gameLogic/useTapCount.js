import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, countingObjects, getRandomPhrase } from '../../utils/constants';
import { useSpeech } from '../useSpeech';

export function useTapCount() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const [items, setItems] = useState([]);
  const [targetCount, setTargetCount] = useState(0);
  const [tappedCount, setTappedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const completeTimerRef = useRef(null);
  const roundTimerRef = useRef(null);

  const difficulty = getDifficulty('tap-count');
  const maxCount = difficulty === 1 ? 5 : difficulty === 2 ? 8 : 10;

  const speakRef = useRef(speak);
  const nextRoundRef = useRef(null);

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  const clearTimers = useCallback(() => {
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }

    if (roundTimerRef.current) {
      clearTimeout(roundTimerRef.current);
      roundTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const nextRound = useCallback(() => {
    clearTimers();
    const count = Math.floor(Math.random() * maxCount) + 1;
    const obj = countingObjects[Math.floor(Math.random() * countingObjects.length)];

    setTargetCount(count);
    setTappedCount(0);
    setItems(
      Array.from({ length: count }, (_, index) => ({
        id: `${obj.name}-${index}`,
        emoji: obj.emoji,
        name: obj.name,
        tapped: false,
        order: null
      }))
    );
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speakRef.current(`Count ${count} ${obj.name}`, 'question');
  }, [clearTimers, maxCount]);

  useEffect(() => {
    nextRoundRef.current = nextRound;
  }, [nextRound]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleTap = useCallback((index) => {
    setItems((prev) => {
      if (prev[index]?.tapped) {
        return prev;
      }

      const nextItems = [...prev];
      const newTappedCount = nextItems.filter((item) => item.tapped).length + 1;
      nextItems[index] = {
        ...nextItems[index],
        tapped: true,
        order: newTappedCount
      };

      setTappedCount(newTappedCount);
      speakRef.current(String(newTappedCount), 'effect');

      if (newTappedCount === prev.length) {
        clearTimers();
        completeTimerRef.current = setTimeout(() => {
          const phrase = getRandomPhrase(correctPhrases);
          const nextStats = getProjectedStats('tap-count', true);
          recordAttempt('tap-count', true);
          setScore((value) => value + 1);
          setShowConfetti(true);
          setFeedback({ show: true, type: 'success', message: phrase });
          speakRef.current(phrase, 'effect');
          checkAndAwardStickers(nextStats);
          roundTimerRef.current = setTimeout(() => {
            setShowConfetti(false);
            nextRoundRef.current?.();
          }, 1500);
        }, 250);
      }

      return nextItems;
    });
  }, [checkAndAwardStickers, clearTimers, getProjectedStats, recordAttempt]);

  return {
    items,
    targetCount,
    tappedCount,
    score,
    feedback,
    showConfetti,
    handleTap,
    speak
  };
}
