import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { animals, correctPhrases, getRandomPhrase, shuffle, vehicles, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const visualSearchPools = [
  {
    id: 'animals',
    items: animals.slice(0, 10)
  },
  {
    id: 'vehicles',
    items: vehicles.slice(0, 8)
  }
];

const difficultyConfig = {
  1: { cells: 6, columns: 3 },
  2: { cells: 9, columns: 3 },
  3: { cells: 12, columns: 4 }
};

function buildRound(difficulty) {
  const config = difficultyConfig[difficulty] || difficultyConfig[1];
  const pool = visualSearchPools[Math.floor(Math.random() * visualSearchPools.length)];
  const target = shuffle(pool.items)[0];
  const distractors = shuffle(pool.items.filter((item) => item.id !== target.id)).slice(0, config.cells - 1);
  const cells = shuffle([target, ...distractors]);

  return {
    target,
    cells,
    columns: config.columns
  };
}

export function useVisualSearch() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(() => buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const previousTargetIdRef = useRef('');
  const difficulty = getDifficulty('visual-search');

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const nextRound = useCallback(() => {
    clearTimer();
    let next = buildRound(difficulty);
    let attempts = 0;

    while (attempts < 6 && next.target.id === previousTargetIdRef.current) {
      next = buildRound(difficulty);
      attempts += 1;
    }

    previousTargetIdRef.current = next.target.id;
    setRound(next);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak(`Find the ${next.target.name}.`, 'question');
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleChoice = useCallback(async (item) => {
    if (item.id === round.target.id) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('visual-search', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('visual-search', true);
      speak(`You found the ${item.name}. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('visual-search', false);
    speak(`Keep looking for the ${round.target.name}.`, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, recordAttempt, round.target.name, round.target.id, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    handleChoice,
    speak
  };
}
