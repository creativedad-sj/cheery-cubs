import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const pairSets = {
  1: [[1, 9], [2, 8], [3, 7]],
  2: [[1, 9], [2, 8], [3, 7], [4, 6]],
  3: [[1, 9], [2, 8], [3, 7], [4, 6], [5, 5]]
};

function buildRound(difficulty) {
  const pairs = pairSets[difficulty] || pairSets[1];
  const pair = pairs[Math.floor(Math.random() * pairs.length)];
  const leftFirst = Math.random() > 0.5;
  const leftValue = leftFirst ? pair[0] : pair[1];
  const missingValue = leftFirst ? pair[1] : pair[0];
  const distractors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((value) => value !== missingValue).sort(() => Math.random() - 0.5).slice(0, 2);

  return {
    leftValue,
    missingValue,
    options: [missingValue, ...distractors].sort(() => Math.random() - 0.5)
  };
}

export function useMakeTen() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('make-ten');

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
    speak(`What number goes with ${next.leftValue} to make 10?`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (value) => {
    if (value === round.missingValue) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('make-ten', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('make-ten', true);
      speak(`${round.leftValue} and ${value} make 10. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('make-ten', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round.leftValue, round.missingValue, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
