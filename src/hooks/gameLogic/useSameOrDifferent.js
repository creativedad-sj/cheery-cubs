import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { animals, correctPhrases, getRandomPhrase, instruments, shuffle, vehicles, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const pools = [animals, vehicles, instruments];

function buildRound() {
  const pool = pools[Math.floor(Math.random() * pools.length)];
  const same = Math.random() > 0.5;
  const first = pool[Math.floor(Math.random() * pool.length)];

  if (same) {
    return { left: first, right: first, answer: 'same' };
  }

  const choices = shuffle(pool.filter((item) => item.id !== first.id));
  return { left: first, right: choices[0], answer: 'different' };
}

export function useSameOrDifferent() {
  const { recordAttempt, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(buildRound());
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
    const next = buildRound();
    setRound(next);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak('Are these the same or different?', 'question');
  }, [clearTimer, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleChoice = useCallback(async (choice) => {
    if (choice === round.answer) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('same-or-different', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('same-or-different', true);
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
    recordAttempt('same-or-different', false);
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
