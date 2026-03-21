import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useStickers } from '../../contexts/StickerContext';
import { allColors, colorItems, correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

export function useColorMatch() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { questionModes } = useSettings();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [targetColor, setTargetColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const difficulty = getDifficulty('color-match');
  const optionCount = useMemo(() => (difficulty === 1 ? 2 : difficulty === 2 ? 4 : 6), [difficulty]);

  const speakRef = useRef(speak);
  const questionModesRef = useRef(questionModes);
  const optionCountRef = useRef(optionCount);

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  useEffect(() => {
    questionModesRef.current = questionModes;
  }, [questionModes]);

  useEffect(() => {
    optionCountRef.current = optionCount;
  }, [optionCount]);

  const clearRoundTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => clearRoundTimer, []);

  const nextRound = useCallback(() => {
    const color = allColors[Math.floor(Math.random() * allColors.length)];
    const colorPool = colorItems.filter((item) => item.color === color);
    const correctItem = colorPool[Math.floor(Math.random() * colorPool.length)];

    const wrongItems = shuffle(colorItems.filter((item) => item.color !== color)).slice(0, optionCountRef.current - 1);

    setTargetColor(color);
    setOptions(shuffle([correctItem, ...wrongItems]));
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);

    if (questionModesRef.current.includes('sound')) {
      speakRef.current(`Find something ${color}`);
    }
  }, []);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleItemClick = useCallback(async (item) => {
    if (item.color === targetColor) {
      const phrase = getRandomPhrase(correctPhrases);
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      const nextStats = getProjectedStats('color-match', true);
      recordAttempt('color-match', true);
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
    setShakeId(item.id);
    recordAttempt('color-match', false);
    speak(phrase, 'effect');
    setFeedback({ show: true, type: 'error', message: phrase });
    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 800);
  }, [checkAndAwardStickers, getProjectedStats, nextRound, recordAttempt, speak, targetColor, vibrate]);

  return {
    targetColor,
    options,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleItemClick,
    speak,
    optionCount
  };
}
