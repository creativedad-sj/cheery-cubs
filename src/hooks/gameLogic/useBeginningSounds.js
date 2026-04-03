import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const soundFamilies = [
  {
    sound: 'B',
    phrase: 'buh',
    correct: { word: 'Ball', emoji: '⚽' },
    distractors: [
      { word: 'Cat', emoji: '🐱' },
      { word: 'Sun', emoji: '☀️' },
      { word: 'Fish', emoji: '🐟' }
    ]
  },
  {
    sound: 'M',
    phrase: 'mmm',
    correct: { word: 'Moon', emoji: '🌙' },
    distractors: [
      { word: 'Dog', emoji: '🐶' },
      { word: 'Car', emoji: '🚗' },
      { word: 'Bee', emoji: '🐝' }
    ]
  },
  {
    sound: 'S',
    phrase: 'sss',
    correct: { word: 'Sun', emoji: '☀️' },
    distractors: [
      { word: 'Ball', emoji: '⚽' },
      { word: 'Tree', emoji: '🌳' },
      { word: 'Moon', emoji: '🌙' }
    ]
  },
  {
    sound: 'T',
    phrase: 'tuh',
    correct: { word: 'Tree', emoji: '🌳' },
    distractors: [
      { word: 'Fish', emoji: '🐟' },
      { word: 'Ball', emoji: '⚽' },
      { word: 'Moon', emoji: '🌙' }
    ]
  },
  {
    sound: 'C',
    phrase: 'kuh',
    correct: { word: 'Car', emoji: '🚗' },
    distractors: [
      { word: 'Bee', emoji: '🐝' },
      { word: 'Sun', emoji: '☀️' },
      { word: 'Moon', emoji: '🌙' }
    ]
  }
];

const optionCounts = { 1: 3, 2: 4, 3: 4 };

export function useBeginningSounds() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('beginning-sounds');

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const family = soundFamilies[Math.floor(Math.random() * soundFamilies.length)];
    const totalOptions = optionCounts[difficulty] || optionCounts[1];
    const options = shuffle([
      { ...family.correct, isCorrect: true },
      ...family.distractors.slice(0, totalOptions - 1).map((item) => ({ ...item, isCorrect: false }))
    ]);

    setRound({ ...family, options });
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Which picture starts with ${family.phrase}?`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (option) => {
    if (option.isCorrect) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('beginning-sounds', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('beginning-sounds', true);
      speak(`${option.word} starts with ${round.sound}. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('beginning-sounds', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round?.sound, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
