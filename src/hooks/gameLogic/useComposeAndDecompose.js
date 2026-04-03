import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const totalsByDifficulty = {
  1: [4, 5, 6],
  2: [5, 6, 7],
  3: [6, 7, 8]
};

function buildRound(difficulty) {
  const totals = totalsByDifficulty[difficulty] || totalsByDifficulty[1];
  const total = totals[Math.floor(Math.random() * totals.length)];
  const knownPart = Math.floor(Math.random() * (total - 1)) + 1;
  const missingPart = total - knownPart;
  const distractors = [1, 2, 3, 4, 5, 6, 7, 8].filter((value) => value !== missingPart).sort(() => Math.random() - 0.5).slice(0, 2);

  return {
    total,
    knownPart,
    missingPart,
    options: [missingPart, ...distractors].sort(() => Math.random() - 0.5)
  };
}

export function useComposeAndDecompose() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('compose-decompose');

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
    speak(`What number goes with ${next.knownPart} to make ${next.total}?`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (value) => {
    if (value === round.missingPart) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('compose-decompose', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('compose-decompose', true);
      speak(`${round.knownPart} and ${value} make ${round.total}. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('compose-decompose', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round.knownPart, round.missingPart, round.total, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
