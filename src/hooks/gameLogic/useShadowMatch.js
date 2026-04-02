import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shadowMatchThemes, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

export function useShadowMatch() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [themeName, setThemeName] = useState('');
  const [targetItem, setTargetItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [revealedItem, setRevealedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const previousThemeRef = useRef('');

  const difficulty = getDifficulty('shadow-match');
  const optionCount = difficulty === 1 ? 3 : 4;
  const speakRef = useRef(speak);

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  const clearRoundTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearRoundTimer, [clearRoundTimer]);

  const nextRound = useCallback(() => {
    clearRoundTimer();

    const themeOptions =
      shadowMatchThemes.length > 1
        ? shadowMatchThemes.filter((entry) => entry.id !== previousThemeRef.current)
        : shadowMatchThemes;
    const theme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    const items = shuffle(theme.items);
    const answer = items[0];
    const wrong = items.slice(1, optionCount);

    previousThemeRef.current = theme.id;
    setThemeName(theme.name);
    setTargetItem(answer);
    setOptions(shuffle([answer, ...wrong]));
    setRevealedItem(null);
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);
    setShowConfetti(false);

    speakRef.current(`Find the picture that matches the shadow. ${theme.name}.`, 'question');
  }, [clearRoundTimer, optionCount]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (item) => {
    if (item.id === targetItem?.id) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('shadow-match', true);

      setRevealedItem(item);
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('shadow-match', true);
      speak(phrase, 'effect');

      clearRoundTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setShakeId(item.id);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('shadow-match', false);
    speak(phrase, 'effect');
    await vibrate();

    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 850);
  }, [checkAndAwardStickers, clearRoundTimer, getProjectedStats, nextRound, recordAttempt, speak, targetItem?.id, vibrate]);

  return {
    themeName,
    targetItem,
    options,
    revealedItem,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleOptionPress,
    speak
  };
}
