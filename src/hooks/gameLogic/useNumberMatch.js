import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, countingObjects, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const roundConfig = {
  1: { min: 1, max: 4, options: 3 },
  2: { min: 2, max: 6, options: 3 },
  3: { min: 3, max: 8, options: 4 }
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRound(difficulty) {
  const config = roundConfig[difficulty] || roundConfig[1];
  const count = randomInRange(config.min, config.max);
  const theme = countingObjects[Math.floor(Math.random() * countingObjects.length)];
  const distractors = shuffle(Array.from({ length: 9 }, (_, index) => index + 1).filter((value) => value !== count)).slice(0, config.options - 1);

  return {
    count,
    theme,
    options: shuffle([count, ...distractors])
  };
}

export function useNumberMatch() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(() => buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('number-match');

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    const next = buildRound(difficulty);
    setRound(next);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`How many ${next.theme.name} do you see?`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (value) => {
    if (value === round.count) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('number-match', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('number-match', true);
      speak(`${value} is the right number. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('number-match', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round.count, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
