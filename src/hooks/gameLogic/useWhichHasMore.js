import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, countingObjects, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const roundTypes = {
  1: ['more'],
  2: ['more', 'fewer'],
  3: ['more', 'fewer', 'equal']
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRound(difficulty) {
  const promptType = roundTypes[difficulty][Math.floor(Math.random() * roundTypes[difficulty].length)];
  const theme = countingObjects[Math.floor(Math.random() * countingObjects.length)];

  if (promptType === 'equal') {
    const count = randomInRange(3 + difficulty, 5 + difficulty);
    return {
      theme,
      promptType,
      leftCount: count,
      rightCount: count,
      answer: 'equal'
    };
  }

  const base = randomInRange(3 + difficulty, 5 + difficulty);
  const diff = difficulty === 1 ? randomInRange(2, 3) : randomInRange(1, 3);
  const leftBigger = Math.random() > 0.5;
  const leftCount = leftBigger ? base + diff : base;
  const rightCount = leftBigger ? base : base + diff;
  const answer = promptType === 'more' ? (leftCount > rightCount ? 'left' : 'right') : (leftCount < rightCount ? 'left' : 'right');

  return {
    theme,
    promptType,
    leftCount,
    rightCount,
    answer
  };
}

export function useWhichHasMore() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(() => buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('which-has-more');

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

    const prompt =
      next.promptType === 'more'
        ? `Which side has more ${next.theme.name}?`
        : next.promptType === 'fewer'
          ? `Which side has fewer ${next.theme.name}?`
          : `Do both sides have the same number of ${next.theme.name}?`;
    speak(prompt, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleChoice = useCallback(async (choice) => {
    if (choice === round.answer) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('which-has-more', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('which-has-more', true);
      speak(phrase, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('which-has-more', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round.answer, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleChoice,
    speak
  };
}
