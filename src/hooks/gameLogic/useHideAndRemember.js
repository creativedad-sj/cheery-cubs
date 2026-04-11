import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameProgress } from '../../contexts/GameProgressContext';
import { useStickers } from '../../contexts/StickerContext';
import { correctPhrases, getRandomPhrase, wrongPhrases } from '../../utils/constants';
import { useSpeech } from '../useSpeech';
import { useVibration } from '../useVibration';

const hidingSpots = ['\u{1F6AA}', '\u{1F9FA}', '\u{1F4E6}', '\u{1F9FA}'];
const hidingFriends = [
  { id: 'bunny', name: 'bunny', emoji: '\u{1F430}' },
  { id: 'teddy', name: 'teddy', emoji: '\u{1F9F8}' },
  { id: 'duck', name: 'duck', emoji: '\u{1F986}' }
];

function buildRound(difficulty) {
  const spotCount = difficulty === 1 ? 3 : 4;
  const friend = hidingFriends[Math.floor(Math.random() * hidingFriends.length)];
  const targetIndex = Math.floor(Math.random() * spotCount);

  return {
    friend,
    targetIndex,
    spots: hidingSpots.slice(0, spotCount)
  };
}

export function useHideAndRemember() {
  const { recordAttempt, getDifficulty, getProjectedStats } = useGameProgress();
  const { checkAndAwardStickers } = useStickers();
  const speak = useSpeech();
  const vibrate = useVibration();
  const [round, setRound] = useState(() => buildRound(1));
  const [previewPhase, setPreviewPhase] = useState(true);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, type: '', message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef(null);
  const difficulty = getDifficulty('hide-and-remember');

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
    speak(`Remember where the ${next.friend.name} is hiding.`, 'question');

    timeoutRef.current = setTimeout(() => {
      setPreviewPhase(false);
      speak(`Where is the ${next.friend.name}?`, 'question');
    }, difficulty === 1 ? 1700 : 1400);
  }, [clearTimer, difficulty, speak]);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const handleSpotPress = useCallback(async (index) => {
    if (previewPhase) {
      return;
    }

    if (index === round.targetIndex) {
      const phrase = getRandomPhrase(correctPhrases);
      const nextStats = getProjectedStats('hide-and-remember', true);

      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setFeedback({ show: true, type: 'success', message: phrase });
      recordAttempt('hide-and-remember', true);
      speak(`You found the ${round.friend.name}. ${phrase}`, 'effect');

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        checkAndAwardStickers(nextStats);
        nextRound();
      }, 1400);
      return;
    }

    const phrase = getRandomPhrase(wrongPhrases);
    setFeedback({ show: true, type: 'error', message: phrase });
    recordAttempt('hide-and-remember', false);
    speak(`Remember where the ${round.friend.name} was hiding.`, 'effect');
    await vibrate();

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setFeedback({ show: false, type: '', message: '' });
    }, 900);
  }, [checkAndAwardStickers, clearTimer, getProjectedStats, nextRound, previewPhase, recordAttempt, round.friend.name, round.targetIndex, speak, vibrate]);

  return {
    round,
    previewPhase,
    score,
    feedback,
    showConfetti,
    handleSpotPress
  };
}
