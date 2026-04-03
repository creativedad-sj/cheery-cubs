import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const rhymeFamilies = [
  {
    clue: { word: 'Cat', emoji: '🐱' },
    answer: { word: 'Hat', emoji: '🎩' },
    distractors: [
      { word: 'Sun', emoji: '☀️' },
      { word: 'Dog', emoji: '🐶' },
      { word: 'Bus', emoji: '🚌' }
    ]
  },
  {
    clue: { word: 'Bee', emoji: '🐝' },
    answer: { word: 'Tree', emoji: '🌳' },
    distractors: [
      { word: 'Car', emoji: '🚗' },
      { word: 'Ball', emoji: '⚽' },
      { word: 'Moon', emoji: '🌙' }
    ]
  },
  {
    clue: { word: 'Star', emoji: '⭐' },
    answer: { word: 'Car', emoji: '🚗' },
    distractors: [
      { word: 'Fish', emoji: '🐟' },
      { word: 'Clock', emoji: '⏰' },
      { word: 'Tree', emoji: '🌳' }
    ]
  },
  {
    clue: { word: 'Dog', emoji: '🐶' },
    answer: { word: 'Frog', emoji: '🐸' },
    distractors: [
      { word: 'Cake', emoji: '🍰' },
      { word: 'Bus', emoji: '🚌' },
      { word: 'Moon', emoji: '🌙' }
    ]
  },
  {
    clue: { word: 'Moon', emoji: '🌙' },
    answer: { word: 'Spoon', emoji: '🥄' },
    distractors: [
      { word: 'Hat', emoji: '🎩' },
      { word: 'Dog', emoji: '🐶' },
      { word: 'Tree', emoji: '🌳' }
    ]
  },
  {
    clue: { word: 'Cake', emoji: '🍰' },
    answer: { word: 'Snake', emoji: '🐍' },
    distractors: [
      { word: 'Car', emoji: '🚗' },
      { word: 'Bee', emoji: '🐝' },
      { word: 'Fish', emoji: '🐟' }
    ]
  }
];

const optionCounts = { 1: 3, 2: 3, 3: 4 };

export function useRhymeTime() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('rhyme-time');

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const family = rhymeFamilies[Math.floor(Math.random() * rhymeFamilies.length)];
    const totalOptions = optionCounts[difficulty] || optionCounts[1];
    const options = shuffle([
      { ...family.answer, isCorrect: true },
      ...family.distractors.slice(0, totalOptions - 1).map((item) => ({ ...item, isCorrect: false }))
    ]);

    setRound({ clue: family.clue, answer: family.answer, options });
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Which word rhymes with ${family.clue.word}?`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (option) => {
    if (option.isCorrect) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('rhyme-time', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('rhyme-time', true);
      speak(`${option.word} rhymes with ${round.clue.word}. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('rhyme-time', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round?.clue.word, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
