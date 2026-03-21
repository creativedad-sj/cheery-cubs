import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, countingObjects, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

export function useCounting() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { questionModes } = useSettings();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [count, setCount] = useState(1);
  const [object, setObject] = useState(countingObjects[0]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const difficulty = getDifficulty('counting');
  const maxCount = useMemo(() => (difficulty === 1 ? 5 : difficulty === 2 ? 10 : 15), [difficulty]);

  const speakRef = useRef(speak);
  const questionModesRef = useRef(questionModes);
  const maxCountRef = useRef(maxCount);

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  useEffect(() => {
    questionModesRef.current = questionModes;
  }, [questionModes]);

  useEffect(() => {
    maxCountRef.current = maxCount;
  }, [maxCount]);

  const clearRoundTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => clearRoundTimer, []);

  const nextRound = useCallback(() => {
    const newCount = Math.floor(Math.random() * maxCountRef.current) + 1;
    const newObject = countingObjects[Math.floor(Math.random() * countingObjects.length)];

    setCount(newCount);
    setObject(newObject);
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);

    if (questionModesRef.current.includes('sound')) {
      speakRef.current(`How many ${newObject.name}?`);
    }
  }, []);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleNumberClick = useCallback(async (number) => {
    if (number === count) {
      const phrase = getRandomPhrase(correctPhrases);
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      const nextStats = getProjectedStats('counting', true);
      recordAttempt('counting', true);
      speak(phrase, 'effect');
      setFeedback({ show: true, type: 'success', message: phrase });
      clearRoundTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        setShowConfetti(false);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    await vibrate();
    setShakeId(number);
    recordAttempt('counting', false);
    speak(phrase, 'effect');
    setFeedback({ show: true, type: 'error', message: phrase });
    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 800);
  }, [checkAndAwardStickers, count, getProjectedStats, nextRound, recordAttempt, speak, vibrate]);

  return {
    count,
    object,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleNumberClick,
    speak,
    maxCount
  };
}
