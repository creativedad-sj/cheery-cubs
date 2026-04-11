import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, shuffle, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const letterPairs = [
  { upper: 'A', lower: 'a' },
  { upper: 'B', lower: 'b' },
  { upper: 'C', lower: 'c' },
  { upper: 'D', lower: 'd' },
  { upper: 'M', lower: 'm' },
  { upper: 'S', lower: 's' },
  { upper: 'T', lower: 't' }
];

const optionCounts = { 1: 3, 2: 4, 3: 4 };

function buildRound(difficulty) {
  const pair = letterPairs[Math.floor(Math.random() * letterPairs.length)];
  const showUpper = Math.random() > 0.5;
  const target = showUpper ? pair.upper : pair.lower;
  const answer = showUpper ? pair.lower : pair.upper;
  const distractors = shuffle(
    letterPairs
      .filter((entry) => entry.upper !== pair.upper)
      .map((entry) => (showUpper ? entry.lower : entry.upper))
  ).slice(0, (optionCounts[difficulty] || optionCounts[1]) - 1);

  return {
    target,
    answer,
    prompt: showUpper ? 'lowercase' : 'uppercase',
    options: shuffle([answer, ...distractors])
  };
}

export function useUpperLowerMatch() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(() => buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('upper-lower-match');

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
    speak(`Find the ${next.prompt} match for ${next.target}.`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleOptionPress = useCallback(async (value) => {
    if (value === round.answer) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('upper-lower-match', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('upper-lower-match', true);
      speak(`${round.target} matches ${value}. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('upper-lower-match', false);
    speak(phrase, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round.answer, round.target, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleOptionPress,
    speak
  };
}
