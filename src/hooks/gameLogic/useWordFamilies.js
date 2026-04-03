import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const familyRounds = [
  {
    family: 'at',
    clue: { word: 'cat', emoji: '🐱' },
    correct: { word: 'hat', emoji: '🎩' },
    distractors: [
      { word: 'sun', emoji: '☀️' },
      { word: 'dog', emoji: '🐶' },
      { word: 'bee', emoji: '🐝' }
    ]
  },
  {
    family: 'og',
    clue: { word: 'dog', emoji: '🐶' },
    correct: { word: 'frog', emoji: '🐸' },
    distractors: [
      { word: 'hat', emoji: '🎩' },
      { word: 'sun', emoji: '☀️' },
      { word: 'car', emoji: '🚗' }
    ]
  },
  {
    family: 'ee',
    clue: { word: 'bee', emoji: '🐝' },
    correct: { word: 'tree', emoji: '🌳' },
    distractors: [
      { word: 'dog', emoji: '🐶' },
      { word: 'sun', emoji: '☀️' },
      { word: 'hat', emoji: '🎩' }
    ]
  },
  {
    family: 'ake',
    clue: { word: 'cake', emoji: '🍰' },
    correct: { word: 'snake', emoji: '🐍' },
    distractors: [
      { word: 'car', emoji: '🚗' },
      { word: 'bee', emoji: '🐝' },
      { word: 'frog', emoji: '🐸' }
    ]
  }
];

export function useWordFamilies() {
  const { recordAttempt, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(null);
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
    const family = familyRounds[Math.floor(Math.random() * familyRounds.length)];
    const options = shuffle([
      { ...family.correct, isCorrect: true },
      ...family.distractors.slice(0, 2).map((item) => ({ ...item, isCorrect: false }))
    ]);

    setRound({ ...family, options });
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Which word belongs in the ${family.family} family?`, 'question');
  }, [clearTimer, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (option) => {
    if (option.isCorrect) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('word-families', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('word-families', true);
      speak(`${option.word} is in the ${round.family} family. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('word-families', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round?.family, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}

