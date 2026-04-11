import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

export const patternPads = [
  { id: 'sun', label: 'Sun', emoji: '\u2600\uFE0F', colors: ['#FDE68A', '#F59E0B'] },
  { id: 'cloud', label: 'Cloud', emoji: '\u2601\uFE0F', colors: ['#DBEAFE', '#60A5FA'] },
  { id: 'leaf', label: 'Leaf', emoji: '\u{1F343}', colors: ['#BBF7D0', '#22C55E'] },
  { id: 'heart', label: 'Heart', emoji: '\u2764\uFE0F', colors: ['#FBCFE8', '#F472B6'] }
];

function buildSequence(difficulty) {
  const length = difficulty === 1 ? 2 : difficulty === 2 ? 3 : 4;
  return Array.from({ length }, () => patternPads[Math.floor(Math.random() * patternPads.length)].id);
}

export function useCopyPattern() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [sequence, setSequence] = useState(() => buildSequence(1));
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activePadId, setActivePadId] = useState(null);
  const [previewPhase, setPreviewPhase] = useState(true);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timersRef = useRef([]);
  const difficulty = getDifficulty('copy-pattern');

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const schedule = useCallback((fn, delay) => {
    const timer = setTimeout(fn, delay);
    timersRef.current.push(timer);
  }, []);

  const playPreview = useCallback((nextSequence) => {
    clearTimers();
    setPreviewPhase(true);
    setPlayerIndex(0);
    setActivePadId(null);
    setFeedback({ show: false, type: '', message: '' });
    setShowConfetti(false);
    speak('Watch the pattern, then copy it.', 'question');

    nextSequence.forEach((padId, index) => {
      schedule(() => setActivePadId(padId), 500 + index * 650);
      schedule(() => setActivePadId(null), 900 + index * 650);
    });

    schedule(() => {
      setPreviewPhase(false);
      speak('Now it is your turn.', 'question');
    }, 500 + nextSequence.length * 650);
  }, [clearTimers, schedule, speak]);

  const nextRound = useCallback(() => {
    const nextSequence = buildSequence(difficulty);
    setSequence(nextSequence);
    playPreview(nextSequence);
  }, [difficulty, playPreview]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handlePadPress = useCallback(async (padId) => {
    if (previewPhase) {
      return;
    }

    const expected = sequence[playerIndex];
    setActivePadId(padId);
    schedule(() => setActivePadId((current) => (current === padId ? null : current)), 180);

    if (padId === expected) {
      const nextIndex = playerIndex + 1;
      setPlayerIndex(nextIndex);

      if (nextIndex === sequence.length) {
        const phrase = getRandomPhrase(correctPhrases);
        const nextStats = getProjectedStats('copy-pattern', true);

        setScore((prev) => prev + 1);
        setShowConfetti(true);
        setFeedback({ show: true, type: 'success', message: phrase });
        recordAttempt('copy-pattern', true);
        speak(`${phrase} You copied the pattern.`, 'effect');

        clearTimers();
        schedule(() => {
          checkAndAwardStickers(nextStats);
          nextRound();
        }, 1400);
      }

      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('copy-pattern', false);
    speak('Let’s watch the pattern again.', 'effect');
    await vibrate();

    clearTimers();
    schedule(() => {
      playPreview(sequence);
    }, 900);
  }, [checkAndAwardStickers, clearTimers, getProjectedStats, nextRound, playerIndex, playPreview, previewPhase, recordAttempt, schedule, sequence, speak, vibrate]);

  return {
    sequence,
    playerIndex,
    activePadId,
    previewPhase,
    score,
    feedback,
    showConfetti,
    handlePadPress
  };
}
