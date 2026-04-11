import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { animals, correctPhrases, getRandomPhrase, instruments, shuffle, vehicles, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const memoryItems = [...animals.slice(0, 10), ...vehicles.slice(0, 8), ...instruments.slice(0, 6)];

function buildRound(difficulty) {
  const itemCount = difficulty === 1 ? 3 : 4;
  const original = shuffle(memoryItems).slice(0, itemCount);
  const changedIndex = Math.floor(Math.random() * original.length);
  const replacement = shuffle(memoryItems.filter((item) => !original.some((entry) => entry.id === item.id)))[0];
  const changed = [...original];
  changed[changedIndex] = replacement;

  return {
    original,
    changed,
    changedIndex,
    replacement
  };
}

export function useFindWhatChanged() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(() => buildRound(1));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [previewPhase, setPreviewPhase] = useState(true);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('find-what-changed');

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
    setPreviewPhase(true);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak('Look closely. Something is about to change.', 'question');

    timeoutRef.current = setTimeout(() => {
      setPreviewPhase(false);
      speak('Which picture changed?', 'question');
    }, difficulty === 1 ? 1700 : 1400);
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleChoice = useCallback(async (index) => {
    if (previewPhase) {
      return;
    }

    if (index === round.changedIndex) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('find-what-changed', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('find-what-changed', true);
      speak(`${round.replacement.name} is the new picture. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('find-what-changed', false);
    speak('Look for the picture that is different now.', 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, previewPhase, recordAttempt, round.changedIndex, round.replacement.name, speak, vibrate]);

  return {
    round,
    score,
    feedback,
    showConfetti,
    previewPhase,
    handleChoice,
    speak
  };
}
