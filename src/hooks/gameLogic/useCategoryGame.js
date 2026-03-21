import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

export function useCategoryGame(categoryItems, gameId, categoryName) {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { questionModes } = useSettings();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [currentItem, setCurrentItem] = useState(null);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const difficulty = getDifficulty(gameId);
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
    const count = optionCountRef.current;
    const randomIndex = Math.floor(Math.random() * categoryItems.length);
    const newItem = categoryItems[randomIndex];
    const otherItems = categoryItems.filter((item) => item.id !== newItem.id);
    const options = shuffle([newItem, ...shuffle(otherItems).slice(0, count - 1)]);

    setCurrentItem(newItem);
    setShuffledItems(options);
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);

    if (questionModesRef.current.includes('sound')) {
      speakRef.current(`Find the ${newItem.name || categoryName}`);
    }
  }, [categoryItems, categoryName]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleItemClick = useCallback(async (item) => {
    if (!currentItem) {
      return;
    }

    if (item.id === currentItem.id) {
      const phrase = getRandomPhrase(correctPhrases);
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      const nextStats = getProjectedStats(gameId, true);
      recordAttempt(gameId, true);
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
    recordAttempt(gameId, false);
    speak(phrase, 'effect');
    setFeedback({ show: true, type: 'error', message: phrase });
    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 800);
  }, [checkAndAwardStickers, currentItem, gameId, getProjectedStats, nextRound, recordAttempt, speak, vibrate]);

  return {
    currentItem,
    shuffledItems,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleItemClick,
    speak,
    optionCount
  };
}
