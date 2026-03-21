import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useSettings } from '../../contexts/SettingsContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, oddOneOutCategories, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

export function useOddOneOut() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { questionModes } = useSettings();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [shakeId, setShakeId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);

  const difficulty = getDifficulty('odd-one-out');
  const sameCount = useMemo(() => (difficulty === 1 ? 2 : difficulty === 2 ? 2 : 3), [difficulty]);

  const speakRef = useRef(speak);
  const questionModesRef = useRef(questionModes);
  const sameCountRef = useRef(sameCount);

  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  useEffect(() => {
    questionModesRef.current = questionModes;
  }, [questionModes]);

  useEffect(() => {
    sameCountRef.current = sameCount;
  }, [sameCount]);

  const clearRoundTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => clearRoundTimer, []);

  const nextRound = useCallback(() => {
    const [catA, catB] = shuffle(oddOneOutCategories).slice(0, 2);
    const regularItems = shuffle(catA.items).slice(0, sameCountRef.current).map((item, index) => ({
      ...item,
      _uniqueId: `same-${item.id}-${index}`,
      _isOdd: false
    }));
    const oddBase = shuffle(catB.items)[0];
    const oddItem = {
      ...oddBase,
      _uniqueId: `odd-${oddBase.id}`,
      _isOdd: true
    };

    setOptions(shuffle([...regularItems, oddItem]));
    setFeedback({ show: false, type: '', message: '' });
    setShakeId(null);

    if (questionModesRef.current.includes('sound')) {
      speakRef.current('Which one is different');
    }
  }, []);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleItemClick = useCallback(async (item) => {
    if (item._isOdd) {
      const phrase = getRandomPhrase(correctPhrases);
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      const nextStats = getProjectedStats('odd-one-out', true);
      recordAttempt('odd-one-out', true);
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
    setShakeId(item._uniqueId);
    recordAttempt('odd-one-out', false);
    speak(phrase, 'effect');
    setFeedback({ show: true, type: 'error', message: phrase });
    clearRoundTimer();
    timeoutRef.current = setTimeout(() => {
      setShakeId(null);
      setFeedback({ show: false, type: '', message: '' });
    }, 800);
  }, [checkAndAwardStickers, getProjectedStats, nextRound, recordAttempt, speak, vibrate]);

  return {
    options,
    score,
    feedback,
    shakeId,
    showConfetti,
    handleItemClick,
    speak,
    optionCount: sameCount + 1
  };
}
